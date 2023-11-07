package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.MilestoneMedia;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.MilestoneMediaRepository;
import com.embrave.appbackend.repository.MilestoneRepository;
import com.embrave.appbackend.repository.RoomRepository;
import com.embrave.appbackend.repository.UserRepository;
import com.embrave.appbackend.utils.JSONMessage;
import io.minio.MinioClient;
import io.minio.errors.*;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Array;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class MilestoneController {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private MilestoneMediaRepository milestoneMediaRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MinioService minioService;

    @PostMapping(path = "/milestone", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public @ResponseBody void saveMilestone(
            @RequestParam String[] files,
            @RequestParam String description,
            @RequestParam String roomID,
            @AuthenticationPrincipal Jwt jwt) {

        System.out.println("JSON :  " + Arrays.toString(files));

        for (String filename: files) {
            System.out.println("JSON :  " + filename);
        }

        System.out.println("JSON :  " +  roomID);
        System.out.println("JSON :  " +  description);


        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Room room = roomRepository.getById(Long.valueOf(roomID));

        //TODO Store milestone and image in different tables

        Milestone milestone = milestoneRepository.save(new Milestone(room, user, description, timestamp));

        for (String filename: files) {
            System.out.println("JSON :  " + filename);
            milestoneMediaRepository.save(new MilestoneMedia(milestone, filename));
        }

    }

    @GetMapping("/milestone/presigned/{filename}")
    public @ResponseBody String getPresignedURL(@PathVariable String filename) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {

        String url = minioService.getPresignedURL(filename);
        System.out.println("PRESIGNED URL : " +url);
        return url;
    }


    @GetMapping("/milestone/{room}")
    public @ResponseBody List<Milestone> getMilestone(@PathVariable Long room, @AuthenticationPrincipal Jwt jwt, Long id) {

        return milestoneRepository.findMilestonesByRoomId(room);
    }

    @GetMapping("/milestone/time/{room}")
    public @ResponseBody List<Timestamp> getMilestoneTime(@PathVariable Long room, @AuthenticationPrincipal Jwt jwt, Long id) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        System.out.println("LES MILESTONES TIME  : " + milestoneRepository.getMilestoneTimestampByRoomUser(room, user.getId()));

        return milestoneRepository.getMilestoneTimestampByRoomUser(room, user.getId());
    }

    @PostMapping("/milestone/ticked/{roomID}")
    @ResponseBody
    public Map<String, String> joinRoomWithCode(@PathVariable Long roomID ,@RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        boolean isMilestoneTicked = Boolean.parseBoolean(body.get("milestone_ticked"));
        String milestone_doneAt = body.get("milestone_doneAt");
        System.out.println("milestone_doneAt" + milestone_doneAt);

        Room room = roomRepository.getById(roomID);
        Timestamp timestamp = null;



        if(!isMilestoneTicked) {

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date parsedDate = dateFormat.parse(milestone_doneAt);
                timestamp = new java.sql.Timestamp(parsedDate.getTime());

                Milestone milestone = new Milestone(room, user, "", timestamp);
                milestone.setTicked(true);
                milestoneRepository.save(milestone);
                return JSONMessage.create("success","Ticked milestone created");


            } catch(Exception e) { //this generic but you can control another types of exception
                System.out.println("Error is here : " + e );
            }

       }

        return JSONMessage.create("error","oops");
    }
}

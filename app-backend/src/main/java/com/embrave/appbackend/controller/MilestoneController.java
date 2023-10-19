package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.MilestoneRepository;
import com.embrave.appbackend.repository.RoomRepository;
import com.embrave.appbackend.repository.UserRepository;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class MilestoneController {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MinioService minioService;

    @PostMapping(path="/milestone" ,consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public @ResponseBody void saveMilestone(
            @RequestParam MultipartFile[] file,
            @RequestParam String description,
            @RequestParam String room,
            @AuthenticationPrincipal Jwt jwt) throws IOException, NoSuchAlgorithmException, InvalidKeyException {

        System.out.println("TG: " + file.length);
        System.out.println("DESC: " + description);
        System.out.println("ROOM: " + room);

        for (MultipartFile wow : file) {

            System.out.println("TG: " + wow.getName());
            System.out.println("TG: " + wow.getOriginalFilename());
            System.out.println("TG: " + wow.getSize());
            System.out.println("TG: " + wow.getResource().getFilename());
            System.out.println();

            minioService.upload(wow);
        }


        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());


        //List<Object> roomID = formData.get("room");
       /* String files = body.get("files");
        String description = body.get("description");*/

        //System.out.println("ROOM : " + roomID);
        //System.out.println("FILES : " + files);
        //System.out.println("DESCRIPTION : " + description);

        //Room room = null;
        
        /*if(roomRepository.existsById(Long.valueOf(roomID))) {
            room = roomRepository.getById(Long.valueOf(roomID));
        }*/


        //Milestone milestone = new Milestone(room, user, description, timestamp);

        //return milestoneRepository.save(milestone);


    }



    @GetMapping("/milestone/{room}")
    public @ResponseBody List<Milestone> getMilestone(@PathVariable Long room, @AuthenticationPrincipal Jwt jwt, Long id) {
        return milestoneRepository.findMilestonesByRoomId(room);
    }
}

package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.MilestoneMedia;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.*;
import com.embrave.appbackend.utils.JSONMessage;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

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
    private UserRoomRepository userRoomRepository;

    @Autowired
    private MinioService minioService;

    @PostMapping(path = "/milestone", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public @ResponseBody Map<String, String> saveMilestone(
            @RequestParam String[] files,
            @RequestParam String description,
            @RequestParam String roomID,
            @AuthenticationPrincipal Jwt jwt) {

        if(Objects.equals(description, "" ) || description == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description can't be empty.");
        }

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Optional<Room> room = roomRepository.findById(Long.valueOf(roomID));

        if (room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                Milestone milestone = milestoneRepository.save(new Milestone(room.get(), user, description, timestamp));
                for (String filename: files) {
                    milestoneMediaRepository.save(new MilestoneMedia(milestone, filename));
                }
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User isn't allowed to edit this milestone");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Room doesn't exist");
        }
        return JSONMessage.create("success","Milestone had been created");
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

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = dateFormat.parse(milestone_doneAt);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());


            // Check if a milestone at the given timestamp already exists
            if(milestoneRepository.getMilestoneNumberDoneByDate(roomID, user.getId(), timestamp) == 0 ) {
                System.out.println("TICKED : Milestone created");
                Milestone milestone = new Milestone(room, user, "", timestamp);
                milestone.setTicked(true);
                milestoneRepository.save(milestone);
                return JSONMessage.create("success","Ticked milestone created");
            } else {
                // If a milestone already exists at the given timestamp
                // Check if a milestone with description
                System.out.println("TICKED : Already exists at the timestamp");

                if(milestoneRepository.getMilestoneNumberDoneByDateAndTicked(roomID, user.getId(), timestamp, false) == 0) {
                    // If no milestone with description exists, it means only a ticked milestone exists
                    System.out.println("TICKED : No standard milestone exists, deleting...");

                    System.out.println("TICKED :" + roomID);
                    System.out.println("TICKED :" + user.getId());
                    System.out.println("TICKED :" + timestamp);

                    milestoneRepository.deleteMilestoneDoneByDateAndTicked(roomID, user.getId(), timestamp);
                }
            }

        } catch(Exception e) {
            System.out.println("Error is here : " + e );
        }

        return JSONMessage.create("error","oops");
    }
}

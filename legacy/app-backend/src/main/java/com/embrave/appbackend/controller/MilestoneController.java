package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.MilestoneMedia;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.*;
import com.embrave.appbackend.utils.JSONMessage;
import com.google.common.collect.Lists;
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
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String roomID,
            @AuthenticationPrincipal Jwt jwt) {

        if(Objects.equals(description, "" ) || description == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description can't be empty.");
        }
        if(Objects.equals(title, "" ) || title == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title can't be empty.");
        }

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Optional<Room> room = roomRepository.findById(Long.valueOf(roomID));

        if (room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                Milestone milestone = milestoneRepository.save(new Milestone(room.get(), user, title, description, timestamp));
                for (String filename: files) {
                    milestoneMediaRepository.save(new MilestoneMedia(milestone, filename));
                }
                return JSONMessage.create("success","Milestone had been created");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't save milestone");
    }

    @GetMapping("/milestone/presigned/{filename}")
    public @ResponseBody String getPresignedURL(@PathVariable String filename) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {

        if(!Objects.equals(filename, "")) {
            return minioService.getPresignedURL(filename);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filename can't be empty");
    }


    @GetMapping("/milestone/{roomID}")
    public @ResponseBody List<Milestone> getMilestone(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        Optional<Room> room = roomRepository.findById(roomID);

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        if (room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                List<Milestone> list = milestoneRepository.findMilestonesByRoomId(roomID);
                list.sort((m1, m2) -> m2.getTimestamp().compareTo(m1.getTimestamp()));
                return list;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't get milestones");
    }

    @GetMapping("/milestone/time/{roomID}")
    public @ResponseBody List<Timestamp> getMilestoneTime(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Optional<Room> room = roomRepository.findById(roomID);

        if (room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                return milestoneRepository.getMilestoneTimestampByRoomUser(room.get().getId(), user.getId());
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't get timestamps");
    }

    @PostMapping("/milestone/ticked/{roomID}")
    @ResponseBody
    public Map<String, String> setTickedMilestone(@PathVariable Long roomID, @RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));
        String milestone_doneAt = body.get("milestone_doneAt");
        Optional<Room> room = roomRepository.findById(roomID);

        if (room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                try {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    Date parsedDate = dateFormat.parse(milestone_doneAt);
                    Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

                    // Check if a milestone at the given timestamp already exists
                    // If not, create an empty ticked milestone
                    if(milestoneRepository.getMilestoneNumberDoneByDate(roomID, user.getId(), timestamp) == 0 ) {
                        Milestone milestone = new Milestone(room.get(), user,"", "", timestamp);
                        milestone.setTicked(true);
                        milestoneRepository.save(milestone);
                        return JSONMessage.create("success","Ticked milestone created");
                    } else {
                        // If a milestone already exists at the given timestamp
                        // Check if a milestone with description
                        if(milestoneRepository.getMilestoneNumberDoneByDateAndTicked(roomID, user.getId(), timestamp, false) == 0) {
                            // If no milestone with description exists, it means only a ticked milestone exists. Delete it
                            milestoneRepository.deleteMilestoneDoneByDateAndTicked(roomID, user.getId(), timestamp);
                            return JSONMessage.create("success","Ticked milestone deleted");
                        }
                    }
                } catch(Exception e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't set milestone");
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't set milestone");
    }

    @GetMapping("/milestone/count")
    public @ResponseBody Long countMilestone() {
        return milestoneRepository.count();
    }

    @DeleteMapping("/milestone/{milestoneID}")
    @ResponseBody
    public Map<String, String> deleteMilestone(@PathVariable Long milestoneID, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Optional<Milestone> milestone = milestoneRepository.findById(milestoneID);

        if(milestone.isPresent()) {
            if(milestone.get().getUser().equals(user)) {

                List<MilestoneMedia> milestoneMedia = milestoneMediaRepository.findAllByMilestone_Id(milestone.get().getId());

                if(!milestoneMedia.isEmpty()) {
                    milestoneMedia.forEach((element) -> {
                        try {
                            minioService.deleteMedia(element.getLink());
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    });
                }

                milestoneRepository.deleteMilestoneById(milestone.get().getId());
                return JSONMessage.create("success","Milestone deleted");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't delete milestone");
    }
}

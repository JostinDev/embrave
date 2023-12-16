package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.*;
import com.embrave.appbackend.repository.*;
import com.embrave.appbackend.utils.JSONMessage;
import com.embrave.appbackend.utils.RandomString;
import com.embrave.appbackend.values.PointsValues;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class RoomController {

    // TODO think about admin rights and what an admin can do to an admin

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoomRepository userRoomRepository;
    @Autowired
    private MilestoneRepository milestoneRepository;
    @Autowired
    private MilestoneMediaRepository milestoneMediaRepository;
    @Autowired
    private MinioService minioService;

    private UserController userController;

    public RoomController(UserController userController) {
        this.userController = userController;
    }

    @GetMapping("/room")
    public @ResponseBody Iterable<UserRoom> getRoom(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));
        return userRoomRepository.findAllByUser(user);
    }

    @GetMapping("/room/{roomID}")
    @ResponseBody
    public Room getRoomByID(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        Optional<Room> room = roomRepository.findById(roomID);
        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        if(room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(roomID, user.getId())) {
                return room.get();
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't get room");
    }


    @PostMapping("/room")
    public Map<String, String> createRoom(@RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        LocalDate localDate = LocalDate.now();

        Long challenge_id = Long.parseLong(body.get("challenge_id"));

        Challenge challenge = challengeRepository.findById(challenge_id).get();

        String code = RandomString.randomString(6);

        String link = RandomString.randomString(30);

        Room room = new Room(challenge, code, link, localDate, new Timestamp(System.currentTimeMillis()));

        joinRoom(room, user, localDate, true);

        return JSONMessage.create("Success","Successfully created the new room!");
    }

    @PutMapping("/room/{roomID}/updateLink")
    public Map<String, String> updateRoom(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Optional<Room> room = roomRepository.findById(roomID);

        if (room.isPresent() && userRoomRepository.existsUserRoomByRoomIdAndUserId(roomID, user.getId())) {
            UserRoom userRoom = userRoomRepository.findUserRoomByRoomIdAndUserId(roomID, user.getId());
            if(userRoom.isAdmin()) {
                room.get().setLink(RandomString.randomString(30));
                roomRepository.save(room.get());
                return JSONMessage.create("Success","Successfully updated the link!");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't update the link");
    }

    @PostMapping("/room/join")
    @ResponseBody
    public Map<String, String> joinRoomWithCode(@RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));
        LocalDate localDate = LocalDate.now();

        String code = body.get("code");

        if(code == null) {
            return JSONMessage.create("error","Code is invalid");
        }

        if(roomRepository.existsRoomByCode(code)) {
            Room room = roomRepository.findRoomsByCode(code);
            joinRoom(room, user, localDate, false);
            return JSONMessage.create("error","Successfully joined the room");
        }
        return JSONMessage.create("error","Code is invalid");
    }

    @GetMapping("/room/join/{link}")
    @ResponseBody
    public void joinRoomWithLink(@PathVariable String link, @AuthenticationPrincipal Jwt jwt, HttpServletResponse response) throws IOException {

        String redirectURL = "http://localhost:8080";
        String redirectURLSuccess = "http://localhost:8080/challenge";

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));
        LocalDate localDate = LocalDate.now();

        if(link == null) {
            response.sendRedirect(redirectURL);
            return;
        }

        if(roomRepository.existsRoomByLink(link)) {
            Room room = roomRepository.findRoomsByLink(link);
            try {
                joinRoom(room, user, localDate, false);
            } catch (Exception error) {
                response.sendRedirect(redirectURL);
                return;
            }
            response.sendRedirect(redirectURLSuccess);
            return;
        }
        response.sendRedirect(redirectURL);
    }

    private void joinRoom(Room room, User user, LocalDate joined, boolean isAdmin) {
        UserRoom userRoom = new UserRoom(room, user, joined, isAdmin);
        userRoomRepository.save(userRoom);
        userController.addPoints(user, PointsValues.JOIN_CHALLENGE);
    }

    @GetMapping("/room/streak/{roomID}")
    public @ResponseBody int getRoomStreak(@AuthenticationPrincipal Jwt jwt, @PathVariable Long roomID) throws ParseException {
        // TODO control function. I suspect the "grace" time to be 8 days
        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        List<String> dates = roomRepository.getAllActiveDate(user.getId(), roomID);

        System.out.println("All dates : " + dates);
        System.out.println("All dates : " +  dates.size());

        LocalDate streakProtection = LocalDate.now().minusDays(7);
        int streak = 0;

        for (int i = 0; i < dates.size() - 1; i++) {

            LocalDate date = LocalDate.parse(dates.get(i));
            System.out.println("Date : " + date);

            if(date.isAfter(streakProtection)) {
                System.out.println("Date : " + date + " is after streak protection : " + streakProtection);
                if(date.minusDays(1).equals(LocalDate.parse(dates.get(i + 1)))) {
                    streak++;
                } else {
                    streak = 0;
                }
            } else {
                System.out.println("Date : " + date + " is before streak protection : " + streakProtection);
                if(date.minusDays(1).equals(LocalDate.parse(dates.get(i + 1)))) {
                    streak++;
                } else {
                    return streak;
                }
            }
        }

        System.out.println("STREAK : " + streak);
        return streak;
    }

    @DeleteMapping("/room/{roomID}")
    @ResponseBody
    public Map<String, String> deleteRoom(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {
        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Optional<Room> room = roomRepository.findById(roomID);

        if(room.isPresent()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.getId())) {
                // Remove the user room link
                userRoomRepository.deleteUserRoomByRoomIdAndUserId(room.get().getId(), user.getId());

                // If the room has no more users, delete the room
                if(!userRoomRepository.existsUserRoomByRoomId(room.get().getId())) {
                    List<Milestone> milestones = milestoneRepository.findMilestonesByRoomId(roomID);
                    if(!milestones.isEmpty()) {
                        milestones.forEach((milestone) -> {
                            List<MilestoneMedia> milestoneMedia = milestoneMediaRepository.findAllByMilestone_Id(milestone.getId());
                            if(!milestoneMedia.isEmpty()) {
                                milestoneMedia.forEach((element) -> {
                                    try {
                                        minioService.deleteMedia(element.getLink());
                                    } catch (Exception e) {
                                        throw new RuntimeException(e);
                                    }
                                });
                            }
                            milestoneRepository.deleteMilestoneById(milestone.getId());
                        });
                    }
                    roomRepository.delete(room.get());
                }
                return JSONMessage.create("success","Room has been left");
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't delete room");
    }


    @PutMapping("/room/{roomID}/admin/{userID}")
    @ResponseBody
    public Map<String, String> promoteToAdmin(@PathVariable Long userID, @PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {
        String auth0Id = (String) jwt.getClaims().get("sub");
        User authUser = userRepository.findByAuth0Id((auth0Id));

        Optional<Room> room = roomRepository.findById(roomID);

        Optional<User> user = userRepository.findById(userID);

        // If room and user exist
        if (room.isPresent() && user.isPresent()) {
            // If the connected user belongs to the room
            if (userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), authUser.getId())) {
                // If targeted user belongs to the room
                if (userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.get().getId())) {
                    // If the connected user is an admin
                    UserRoom userRoom = userRoomRepository.findUserRoomByRoomIdAndUserId(roomID, authUser.getId());
                    if (userRoom.isAdmin()) {
                        // Promote the targeted user as an admin
                        UserRoom targetUser = userRoomRepository.findUserRoomByRoomIdAndUserId(roomID, user.get().getId());
                        targetUser.setAdmin(true);
                        userRoomRepository.save(targetUser);
                        return JSONMessage.create("success", "User has been promoted to admin");
                    }
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't promote user to admin");
    }


    @DeleteMapping("/room/{roomID}/kick/{userID}")
    @ResponseBody
    public Map<String, String> kickUserFromRoom(@PathVariable Long userID, @PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User authUser = userRepository.findByAuth0Id((auth0Id));

        Optional<Room> room = roomRepository.findById(roomID);

        Optional<User> user = userRepository.findById(userID);

        // If room and user exist
        if (room.isPresent() && user.isPresent()) {
            // If the connected user belongs to the room
            if (userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), authUser.getId())) {
                // If targeted user belongs to the room
                if (userRoomRepository.existsUserRoomByRoomIdAndUserId(room.get().getId(), user.get().getId())) {
                    // If the connected user is an admin
                    UserRoom userRoom = userRoomRepository.findUserRoomByRoomIdAndUserId(roomID, authUser.getId());
                    if (userRoom.isAdmin()) {
                        // Remove the user from the room
                        UserRoom targetUser = userRoomRepository.findUserRoomByRoomIdAndUserId(roomID, user.get().getId());
                        userRoomRepository.delete(targetUser);
                        return JSONMessage.create("success", "User has been removed from the room");
                    }
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't remove User from the room");
    }

    @GetMapping("/room/count")
    public @ResponseBody Long countRoom() {
        return roomRepository.count();
    }

}

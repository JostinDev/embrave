package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.Challenge;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.model.UserRoom;
import com.embrave.appbackend.repository.ChallengeRepository;
import com.embrave.appbackend.repository.RoomRepository;
import com.embrave.appbackend.repository.UserRepository;
import com.embrave.appbackend.repository.UserRoomRepository;
import com.embrave.appbackend.utils.JSONMessage;
import com.embrave.appbackend.utils.RandomString;
import com.embrave.appbackend.values.PointsValues;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoomRepository userRoomRepository;

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


    @PostMapping("/room")
    public void createRoom(@RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        LocalDate localDate = LocalDate.now();

        Long challenge_id = Long.parseLong(body.get("challenge_id"));

        Challenge challenge = challengeRepository.findById(challenge_id).get();

        String code = RandomString.randomString(6);

        String link = RandomString.randomString(30);

        Room room = new Room(challenge, code, link, localDate, new Timestamp(System.currentTimeMillis()));

        joinRoom(room, user, localDate);

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
            joinRoom(room, user, localDate);
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
                joinRoom(room, user, localDate);
            } catch (Exception error) {
                response.sendRedirect(redirectURL);
                return;
            }
            response.sendRedirect(redirectURLSuccess);
            return;
        }
        response.sendRedirect(redirectURL);
    }

    private void joinRoom(Room room, User user, LocalDate joined) {
        UserRoom userRoom = new UserRoom(room, user, joined);
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

}

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
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Collections;
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

    @GetMapping("/room")
    public @ResponseBody Iterable<Room> getRoom() {
        return roomRepository.findAll();
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
    }

}
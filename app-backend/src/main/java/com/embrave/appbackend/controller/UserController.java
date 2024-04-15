package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.model.UserRoom;
import com.embrave.appbackend.repository.UserRepository;
import com.embrave.appbackend.repository.UserRoomRepository;
import com.embrave.appbackend.utils.JSONMessage;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @GetMapping("/user")
    public @ResponseBody User getUser(@AuthenticationPrincipal Jwt jwt) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        String email = (String) jwt.getClaims().get("email");
        String name = (String) jwt.getClaims().get("name");
        String picture = (String) jwt.getClaims().get("picture");

        boolean exists = userRepository.existsUserByAuth0Id(auth0Id);

        System.out.println("RESULT : " + exists);

        if(!exists) {
            LocalDate localDate = LocalDate.now();
            userRepository.save(new User(auth0Id,email,name,picture, 0L, localDate));
        }

        return userRepository.findByAuth0Id(auth0Id);
    }

    @PostMapping("/user")
    public @ResponseBody Map<String, String> saveUser(@AuthenticationPrincipal Jwt jwt, @RequestBody Map<String, String> body) {

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        String username = body.get("username");

        user.setName(username);
        userRepository.save(user);

        return JSONMessage.create("success","User saved");
    }

    @GetMapping("/user/room/{roomID}")
    @ResponseBody
    public List<UserRoom> getUserByRoom(@PathVariable Long roomID, @AuthenticationPrincipal Jwt jwt) {

        List<UserRoom> userRooms = userRoomRepository.findUserRoomsByRoomId(roomID);

        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        if(!userRooms.isEmpty()) {
            if(userRoomRepository.existsUserRoomByRoomIdAndUserId(roomID, user.getId())) {
                return userRooms;
            }
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't get users");
    }


    @GetMapping("/user/count")
    public @ResponseBody Long countUser() {
        return userRepository.count();
    }

    public void addPoints(@NotNull User user, Long points) {

        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
    }
}

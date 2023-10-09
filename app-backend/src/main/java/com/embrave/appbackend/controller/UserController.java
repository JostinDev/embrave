package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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
}

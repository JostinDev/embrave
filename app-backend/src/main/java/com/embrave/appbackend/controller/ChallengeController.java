package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.Challenge;
import com.embrave.appbackend.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class ChallengeController {

    @Autowired
    private ChallengeRepository challengeRepository;

    @GetMapping("/challenge")
    public @ResponseBody Iterable<Challenge> getChallenge() {
        return challengeRepository.findAll();
    }
}

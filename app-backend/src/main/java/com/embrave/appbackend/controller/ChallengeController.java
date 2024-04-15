package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.Challenge;
import com.embrave.appbackend.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.

public class ChallengeController {

    @Autowired
    private ChallengeRepository challengeRepository;

    @GetMapping("/challenge")
    public @ResponseBody Iterable<Challenge> getChallenge() {
        return challengeRepository.findAll();
    }

    @GetMapping("/challenge/{id}")
    public @ResponseBody Optional<Challenge> getChallenge(@PathVariable("id") Long id) {
        return challengeRepository.findById(id);
    }

    @GetMapping("/challenge/count")
    public @ResponseBody Long countChallenge() {
        return challengeRepository.count();
    }
}

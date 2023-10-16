package com.embrave.appbackend.controller;

import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.repository.MilestoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class MilestoneController {

    @Autowired
    private MilestoneRepository milestoneRepository;

    /*@PostMapping("/milestone/")
    public @ResponseBody Milestone saveMilestone(@RequestBody Map<String, String> body, @AuthenticationPrincipal Jwt jwt) {
        return milestoneRepository.findAll();
    }*/



    @GetMapping("/milestone/{room}")
    public @ResponseBody List<Milestone> getMilestone(@PathVariable Long room, @AuthenticationPrincipal Jwt jwt, Long id) {
        return milestoneRepository.findMilestonesByRoomId(room);
    }
}

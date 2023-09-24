package com.embrave.appbackend.controller;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


import java.security.Principal;


@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class APIController {

    @GetMapping(value = "challenge")
    public String publicEndpoint() {
        return "All good. You DO NOT need to be authenticated to call /api/public.";
    }

    @GetMapping(value = "private")
    public String privateEndpoint() {
        return "All good. You can see this because you are Authenticated.";
    }

    @GetMapping("/user/info")
    public String getUserInfo(@AuthenticationPrincipal Jwt jwt) {

        System.out.println("JWT : " + jwt);
        System.out.println("JWT : " + jwt.getClaims());
        System.out.println("JWT : " + jwt.getHeaders());
        System.out.println("JWT : " + jwt.getAudience());
        String email = (String) jwt.getClaims().get("email");
        System.out.println("EMAIL : " + email);

        return "";
    }
}
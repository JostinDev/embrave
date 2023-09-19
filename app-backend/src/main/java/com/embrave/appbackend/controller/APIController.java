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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
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
    public String getUserInfo(Authentication authentication, Principal principal, @AuthenticationPrincipal Jwt jwt) {


        System.out.println("JWT : " + jwt);
        System.out.println("JWT : " + jwt.getClaims());
        System.out.println("JWT : " + jwt.getHeaders());
        System.out.println("JWT : " + jwt.getAudience());

        Authentication totest = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("TEST : " + totest);
        System.out.println("TEST : " + totest.getCredentials());
        System.out.println("TEST : " + totest.getPrincipal());
        System.out.println("TEST : " + totest.getDetails());
        System.out.println("TEST : " + totest.getAuthorities());
        System.out.println("TEST : " + totest.isAuthenticated());

        Object test = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (test instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }
        System.out.println("USERNAME : " + username);

        JwtAuthenticationToken authenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwtTest = (Jwt) authenticationToken.getCredentials();
        String email = (String) jwt.getClaims().get("email");
        System.out.println("JWT : " + jwtTest);
        System.out.println("JWT : " + jwtTest.getClaims());
        System.out.println("JWT : " + jwtTest.getHeaders());
        System.out.println("JWT : " + jwtTest.getAudience());
        System.out.println("EMAIL : " + email);

        System.out.println(authentication);
        System.out.println("-----------------");
        System.out.println(principal);

        System.out.println(authentication.getName());
        System.out.println("-----------------");
        System.out.println(principal.getName());


        return "";
    }

    @GetMapping("/user/get")
    public String index(@RequestHeader("Authorization") String bearerToken) {

        String uri = "https://embrave.eu.auth0.com/api/v2/users/%7Bgoogle-oauth2%7C114642014965782681499%7D";

        System.out.println("BEARER : " + bearerToken);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", bearerToken );

        HttpEntity request = new HttpEntity(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);
        System.out.println("RESPONSE : " + response);

        return "";
    }

}
package com.embrave.appbackend.controller;

import com.embrave.appbackend.Service.MinioService;
import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.MilestoneRepository;
import com.embrave.appbackend.repository.RoomRepository;
import com.embrave.appbackend.repository.UserRepository;
import io.minio.MinioClient;
import io.minio.errors.*;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Array;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
// For simplicity of this sample, allow all origins. Real applications should configure CORS for their use case.
@CrossOrigin(origins = "*")
public class MilestoneController {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MinioService minioService;

    @PostMapping(path = "/milestone", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public @ResponseBody void saveMilestone(
            @RequestParam String[] files,
            @RequestParam String description,
            @RequestParam String room,
            @AuthenticationPrincipal Jwt jwt) {

        System.out.println("JSON :  " + Arrays.toString(files));

        for (String filename: files) {
            System.out.println("JSON :  " + filename);
        }

        System.out.println("JSON :  " +  room);
        System.out.println("JSON :  " +  description);


        String auth0Id = (String) jwt.getClaims().get("sub");
        User user = userRepository.findByAuth0Id((auth0Id));

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        //TODO Store milestone and image in different tables

    }

    @GetMapping("/milestone/presigned/{filename}")
    public @ResponseBody String getPresignedURL(@PathVariable String filename) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {

        String url = minioService.getPresignedURL(filename);
        System.out.println("PRESIGNED URL : " +url);
        return url;
    }


    @GetMapping("/milestone/{room}")
    public @ResponseBody List<Milestone> getMilestone(@PathVariable Long room, @AuthenticationPrincipal Jwt jwt, Long id) {
        return milestoneRepository.findMilestonesByRoomId(room);
    }
}

package com.embrave.appbackend.Service;

import com.embrave.appbackend.repository.RoomRepository;
import io.minio.*;
import io.minio.errors.MinioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
public class MinioService {

    private final MinioClient minioClient;

    private final String BUCKET_NAME = "embrave";

    @Autowired
    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public void upload(MultipartFile file) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(BUCKET_NAME)
                            .object(file.getOriginalFilename())
                            .stream(file.getInputStream(),file.getSize(),-1)
                            .build());
            System.out.println("File successfully created");
        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
            System.out.println("HTTP trace: " + e.httpTrace());
        }
    }
}

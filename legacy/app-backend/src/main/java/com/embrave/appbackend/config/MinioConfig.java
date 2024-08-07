package com.embrave.appbackend.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class MinioConfig {

    @Value("${minio.host}")
    private String host;

    @Value("${minio.port}")
    private int port;

    @Value("${minio.user}")
    private String user;

    @Value("${minio.password}")
    private String password;

    @Bean
    public MinioClient generateMinioClient() {

        try {
            MinioClient minioClient =
                    MinioClient.builder()
                            //TODO Needs to be changed with host ip
                            //.endpoint("192.168.1.55", 9000, false)
                            .endpoint(host, port, false)
                            .credentials(user, password)
                            .build();

            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket("embrave").build());
            if (!found) {
                // Make a new bucket called 'embrave'.
                minioClient.makeBucket(MakeBucketArgs.builder().bucket("embrave").build());
            } else {
                System.out.println("Bucket 'embrave' already exists.");
            }

            return minioClient;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}

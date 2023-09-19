package com.embrave.appgateway;

import ch.qos.logback.core.model.Model;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class AppGatewayApplication {


	@GetMapping("/")
	public String index(
						@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
						@AuthenticationPrincipal OAuth2User oauth2User) {
		System.out.println("oauth2User : " + oauth2User);
		System.out.println("userName : " + oauth2User.getName());
		System.out.println("clientName : " + authorizedClient.getClientRegistration().getClientName());
		System.out.println("userAttributes : " + oauth2User.getAttributes());
		return "";
	}

	public static void main(String[] args) {
		SpringApplication.run(AppGatewayApplication.class, args);
	}

}

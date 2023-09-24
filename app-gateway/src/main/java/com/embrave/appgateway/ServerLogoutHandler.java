package com.embrave.appgateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import reactor.core.publisher.Mono;


/**
 * Needed to perform SSO logout with Auth0. By default, Spring will clear the SecurityContext and the session.
 * This controller will also log users out of Auth0 by calling the Auth0 logout endpoint.
 */
@Controller
public class ServerLogoutHandler extends SecurityContextServerLogoutHandler  {

    @Value("${spring.security.oauth2.client.provider.auth0.issuer-uri}")
    private String issuer;
    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;


    private final ReactiveClientRegistrationRepository reactiveClientRegistrationRepository;

    @Autowired
    public ServerLogoutHandler(ReactiveClientRegistrationRepository clientRegistrationRepository) {
        this.reactiveClientRegistrationRepository = clientRegistrationRepository;
    }

    @Override
    public Mono<Void> logout(WebFilterExchange exchange, Authentication authentication) {

        super.logout(exchange, authentication);

        String uri = "https://embrave.eu.auth0.com/v2/logout?clientId="+clientId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("content-type", "application/x-www-form-urlencoded" );

        HttpEntity request = new HttpEntity(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);
        System.out.println("RESPONSE : " + response);

        ServerSecurityContextRepository securityContextRepository = new WebSessionServerSecurityContextRepository();
        return securityContextRepository.save(exchange.getExchange(), null);
    }
}
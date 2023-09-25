package com.embrave.appgateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.context.request.RequestContextHolder;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;


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

        String uri = "https://embrave.eu.auth0.com/oidc/logout";

        String token = ((OidcUser) authentication.getPrincipal()).getIdToken().getTokenValue();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("content-type", "application/x-www-form-urlencoded" );

        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("id_token_hint", token);
        map.add("post_logout_redirect_uri", "http://localhost:8080");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        restTemplate.exchange(uri, HttpMethod.POST, request, String.class);

        ServerSecurityContextRepository securityContextRepository = new WebSessionServerSecurityContextRepository();
        return securityContextRepository.save(exchange.getExchange(), null);
    }
}
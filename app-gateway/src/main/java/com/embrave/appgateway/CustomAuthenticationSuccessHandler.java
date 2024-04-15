package com.embrave.appgateway;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import reactor.core.publisher.Mono;

import java.net.URI;


public class CustomAuthenticationSuccessHandler implements ServerAuthenticationSuccessHandler {

    private final String redirectUrl = "https://embrave.app/";

    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
        return Mono.fromRunnable(() -> {
            webFilterExchange.getExchange().getResponse().setStatusCode(HttpStatus.FOUND);
            webFilterExchange.getExchange().getResponse().getHeaders().setLocation(URI.create(redirectUrl));
        });
    }
}

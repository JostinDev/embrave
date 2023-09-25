package com.embrave.appgateway;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.net.URI;


@Controller
public class LogoutSuccessHandler implements ServerLogoutSuccessHandler {
    @Override
    public Mono<Void> onLogoutSuccess(WebFilterExchange exchange, Authentication authentication) {

        ServerSecurityContextRepository securityContextRepository = new WebSessionServerSecurityContextRepository();

        ServerHttpResponse response = exchange.getExchange().getResponse();

        response.setStatusCode(HttpStatus.FOUND);
        response.getHeaders().setLocation(URI.create("/"));

        return securityContextRepository.save(exchange.getExchange(), null);
    }
}

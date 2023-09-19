package com.embrave.appgateway.filter;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class IDTokenRelayFuckingFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return exchange.getPrincipal()
                .filter(token -> token instanceof OAuth2AuthenticationToken)
                //Only send the token to backend
                .cast(OAuth2AuthenticationToken.class)
                .map(authentication -> authentication.getPrincipal())
                .filter(principal -> principal instanceof OidcUser)
                .cast(OidcUser.class)
                .map(OidcUser::getIdToken)
                .map(token -> withBearerAuth(exchange, token.getTokenValue()))
                .defaultIfEmpty(exchange)
                .flatMap(chain::filter);
    }

    private ServerWebExchange withBearerAuth(ServerWebExchange exchange, String accessToken) {
        return exchange.mutate()
                .request(r -> r.headers(
                        headers -> headers.setBearerAuth(accessToken)))
                .build();
    }
}


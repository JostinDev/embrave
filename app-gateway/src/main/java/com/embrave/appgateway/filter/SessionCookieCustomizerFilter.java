package com.embrave.appgateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SessionCookieCustomizerFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpResponse originalResponse = exchange.getResponse();
        ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {
            @Override
            public Mono<Void> writeWith(org.reactivestreams.Publisher<? extends org.springframework.core.io.buffer.DataBuffer> body) {
                HttpHeaders headers = getDelegate().getHeaders();
                if (headers.containsKey(HttpHeaders.SET_COOKIE)) {
                    // Loop through the Set-Cookie headers to find the SESSION cookie
                    List<String> newCookies = headers.get(HttpHeaders.SET_COOKIE).stream()
                            .map(cookie -> {
                                if (cookie.startsWith("SESSION=")) {
                                    return cookie + "; Domain=embrave.app"; // Add your custom domain
                                } else {
                                    return cookie;
                                }
                            })
                            .collect(Collectors.toList());
                    headers.put(HttpHeaders.SET_COOKIE, newCookies); // Override the Set-Cookie header
                }
                return super.writeWith(body);
            }
        };
        return chain.filter(exchange.mutate().response(decoratedResponse).build());
    }

    @Override
    public int getOrder() {
        // Specify the order for the filter if you have multiple filters
        return -1;
    }
}
package com.embrave.appbackend.utils;

import java.util.Collections;
import java.util.Map;

public class JSONMessage {

    public static Map<String,String> create(String type, String message) {
        return Collections.singletonMap(type, message);
    }

}

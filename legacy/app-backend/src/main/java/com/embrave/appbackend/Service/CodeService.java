package com.embrave.appbackend.Service;

import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class CodeService {

    private static final int THIRTY_MINUTES = 30 * 60 * 1000;
    private static final int TEN_SECONDS = 10000;

    private final RoomRepository roomRepository;

    @Autowired
    public CodeService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public void removeInvalidCode() {

        long thirtyAgo = System.currentTimeMillis() - THIRTY_MINUTES;
        long tenSecAgo = System.currentTimeMillis() - TEN_SECONDS;


        Timestamp timestamp = new Timestamp(thirtyAgo);
        Timestamp timestampShort = new Timestamp(tenSecAgo);

        List<Room> rooms = roomRepository.findRoomsByCodeIsNotNull();

        if (rooms.isEmpty()) {
            return;
        }

        rooms.forEach((room)-> {
            if(room.getCode_created_timestamp().before(timestamp)){
                room.setCode(null);
            }
        });

        roomRepository.saveAll(rooms);
    }
}

package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoomRepository extends CrudRepository<Room, Long> {

    List<Room> findRoomsByCodeIsNotNull();


}

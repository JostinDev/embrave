package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface RoomRepository extends CrudRepository<Room, Long> {

    List<Room> findRoomsByCodeIsNotNull();

    Room findRoomsByCode(String code);

    Boolean existsRoomByCode(String code);

    Room findRoomsByLink(String link);

    Boolean existsRoomByLink(String link);

    @Query(value = "SELECT MIN(DATE_FORMAT(timestamp, '%Y-%m-%d')) AS time FROM milestone WHERE user_id = :user_id AND room_id = :room_id GROUP BY room_id, user_id, DATE(timestamp) ORDER BY time DESC;", nativeQuery = true)
    List<String> getAllActiveDate(Long user_id, Long room_id);

}

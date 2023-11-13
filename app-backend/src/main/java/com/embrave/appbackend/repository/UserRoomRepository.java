package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.model.UserRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRoomRepository extends CrudRepository<UserRoom, Long> {

    List<UserRoom> findAllByUser(User user);

    Boolean existsUserRoomByRoomIdAndUserId(Long room, Long user);

}

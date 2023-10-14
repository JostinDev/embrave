package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.UserRoom;
import org.springframework.data.repository.CrudRepository;

public interface UserRoomRepository extends CrudRepository<UserRoom, Long> {

}

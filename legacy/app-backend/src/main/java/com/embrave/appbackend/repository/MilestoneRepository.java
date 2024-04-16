package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

public interface MilestoneRepository extends CrudRepository<Milestone, Long> {

    List<Milestone> findMilestonesByRoomId(Long room);
    Milestone getMilestoneById(Long id);

    @Query(value = "SELECT MIN(timestamp) AS time FROM milestone WHERE user_id = :user_id AND room_id = :room_id GROUP BY room_id, user_id, DATE(timestamp) ORDER BY time DESC", nativeQuery = true)
    List<Timestamp> getMilestoneTimestampByRoomUser(@Param("room_id") Long room_id, @Param("user_id") Long user_id);

    @Query(value = "SELECT COUNT(*) FROM milestone WHERE user_id = :user_id AND room_id = :room_id AND DATE(timestamp) = DATE(:timestamp)", nativeQuery = true)
    int getMilestoneNumberDoneByDate(@Param("room_id") Long room_id, @Param("user_id") Long user_id, @Param("timestamp") Timestamp timestamp);

    @Query(value = "SELECT COUNT(*) FROM milestone WHERE user_id = :user_id AND room_id = :room_id AND DATE(timestamp) = DATE(:timestamp) AND ticked = :ticked", nativeQuery = true)
    int getMilestoneNumberDoneByDateAndTicked(@Param("room_id") Long room_id, @Param("user_id") Long user_id, @Param("timestamp") Timestamp timestamp,@Param("ticked") Boolean ticked );

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM milestone WHERE user_id = :user_id AND room_id = :room_id AND DATE(timestamp) = DATE(:timestamp) AND ticked = true", nativeQuery = true)
    void deleteMilestoneDoneByDateAndTicked(@Param("room_id") Long room_id, @Param("user_id") Long user_id, @Param("timestamp") Timestamp timestamp);

    @Transactional
    void deleteMilestoneById(Long id);
}

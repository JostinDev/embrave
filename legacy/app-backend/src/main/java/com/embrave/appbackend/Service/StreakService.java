package com.embrave.appbackend.Service;

import com.embrave.appbackend.model.Room;
import com.embrave.appbackend.model.User;
import com.embrave.appbackend.repository.MilestoneRepository;
import com.embrave.appbackend.repository.RoomRepository;
import com.embrave.appbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StreakService {

    private final MilestoneRepository milestoneRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public StreakService(MilestoneRepository milestoneRepository, UserRepository userRepository, RoomRepository roomRepository) {
        this.milestoneRepository = milestoneRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }


    public Long calculateStreak(Room room, User user) {

        return 10L;
    }

}

package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Milestone;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MilestoneRepository extends CrudRepository<Milestone, Long> {

    List<Milestone> findMilestonesByRoomId(Long room);
    Milestone getMilestoneById(Long id);
}

package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.Milestone;
import com.embrave.appbackend.model.MilestoneMedia;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MilestoneMediaRepository extends CrudRepository<MilestoneMedia, Long> {


}

package com.embrave.appbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "milestone")
@Getter @Setter @NoArgsConstructor
public class Milestone {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String description;
    private Timestamp timestamp;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="milestone_id")
    @JsonManagedReference
    private Set<MilestoneMedia> milestoneMedia;

    public Milestone(Room room, User user, String description, Timestamp timestamp) {
        this.room = room;
        this.user = user;
        this.description = description;
        this.timestamp = timestamp;
    }

}

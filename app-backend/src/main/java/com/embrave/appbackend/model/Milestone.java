package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "milestone")
@Getter @Setter @NoArgsConstructor
public class Milestone {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "room_id")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @Column(name = "user_id")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String description;
    private Timestamp timestamp;

    public Milestone(Room room, User user, String description, Timestamp timestamp) {
        this.room = room;
        this.user = user;
        this.description = description;
        this.timestamp = timestamp;
    }

}

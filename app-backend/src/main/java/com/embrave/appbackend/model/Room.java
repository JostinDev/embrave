package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "room")
@Getter @Setter @NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "challenge_id", referencedColumnName = "id")
    private Challenge challenge;
    private String code;
    private String link;
    private LocalDate created;
    private Timestamp code_created_timestamp;

    public Room(Challenge challenge, String code, String link, LocalDate created, Timestamp code_created_timestamp) {
        this.challenge = challenge;
        this.code = code;
        this.link = link;
        this.created = created;
        this.code_created_timestamp = code_created_timestamp;
    }
}

package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "room")
@Getter @Setter @NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "challenge_id", referencedColumnName = "id")
    private Challenge challenge;
    private String code;
    private String link;
    private LocalDate created;

    public Room(Challenge challenge, String code, String link, LocalDate created) {
        this.challenge = challenge;
        this.code = code;
        this.link = link;
        this.created = created;
    }
}

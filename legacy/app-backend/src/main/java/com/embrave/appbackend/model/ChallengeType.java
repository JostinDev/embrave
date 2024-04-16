package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "challenge_type")
@Getter @Setter @NoArgsConstructor
public class ChallengeType {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String type;


    public ChallengeType(String type) {
        this.type = type;
    }

}

package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "challenge_category")
@Getter @Setter @NoArgsConstructor
public class ChallengeCategory {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String category;


    public ChallengeCategory(String category) {
        this.category = category;
    }

}

package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "challenge")
@Getter @Setter @NoArgsConstructor
public class Challenge {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private String banner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type", referencedColumnName = "id")
    private ChallengeType type;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category", referencedColumnName = "id")
    private ChallengeCategory category;

    public Challenge(String title, String description, String banner, ChallengeType type, ChallengeCategory category) {
        this.title = title;
        this.description = description;
        this.banner = banner;
        this.type = type;
        this.category = category;
    }

}

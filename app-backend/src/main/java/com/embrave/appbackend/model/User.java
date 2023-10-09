package com.embrave.appbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "user")
@Getter @Setter @NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String email;
    private String name;
    private String avatar;
    private String auth0Id;
    private Long points;
    private LocalDate joined;

    public User (String auth0Id, String email, String name, String avatar, Long points, LocalDate joined) {
        this.auth0Id = auth0Id;
        this.email = email;
        this.name = name;
        this.avatar = avatar;
        this.points = points;
        this.joined = joined;
    }

}

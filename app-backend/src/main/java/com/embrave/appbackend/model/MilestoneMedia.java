package com.embrave.appbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "milestone_media")
@Getter @Setter @NoArgsConstructor
public class MilestoneMedia {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "milestone_id", referencedColumnName = "id")
    @JsonBackReference
    private Milestone milestone;

    private String link;

    public MilestoneMedia(Milestone milestone, String link) {
        this.milestone = milestone;
        this.link = link;
    }

}

package com.embrave.appbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "user_room")
@Getter @Setter @NoArgsConstructor
public class UserRoom {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private LocalDate joined;

    private boolean isAdmin;

    public UserRoom(Room room, User user, LocalDate joined, boolean isAdmin) {
      this.room = room;
      this.user = user;
      this.joined = joined;
      this.isAdmin = isAdmin;
    }
}

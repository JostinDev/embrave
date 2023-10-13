create table if not exists challenge_category
(
    id       int auto_increment
    primary key,
    category varchar(45) not null
    );

create table if not exists challenge_type
(
    id   int auto_increment
    primary key,
    type varchar(45) not null
    );

create table if not exists challenge
(
    id          int auto_increment
    primary key,
    title       varchar(45) not null,
    description text        not null,
    banner      varchar(45) not null,
    type        int         not null,
    category    int         not null,
    constraint challenge_challenge_category_id_fk
    foreign key (category) references embrave.challenge_category (id),
    constraint type
    foreign key (type) references challenge_type (id)
    );

create index type_idx
    on challenge (type);

create table if not exists milestone
(
    id          int          not null
    primary key,
    room_id     int          not null,
    user_id     int          not null,
    timestamp   timestamp    null,
    description varchar(500) null,
    constraint milestone_room
    foreign key (room_id) references embrave.room (id)
    on update cascade on delete cascade,
    constraint milestone_user_id_fk
    foreign key (user_id) references embrave.user (id)
    on update cascade on delete cascade
    );

create table if not exists milestone_media
(
    id           int auto_increment
    primary key,
    milestone_id int          not null,
    link         varchar(255) null,
    constraint milestone_media_milestone_id_fk
    foreign key (milestone_id) references embrave.milestone (id)
    );

create table if not exists room
(
    id           int auto_increment
    primary key,
    challenge_id int          not null,
    code         int          null,
    link         varchar(255) not null,
    constraint room_challenge
    foreign key (challenge_id) references embrave.challenge (id)
    );

create table if not exists user
(
    email   varchar(255)     not null,
    name    varchar(255)     not null,
    avatar  varchar(255)     not null,
    point   bigint default 0 not null,
    auth0id varchar(255)     null,
    id      int auto_increment
    primary key,
    joined  date             null,
    points  bigint           null,
    constraint user_auth0_user
    unique (auth0id)
    );

create table if not exists user_room
(
    id      int auto_increment
    primary key,
    room_id int       not null,
    user_id int       not null,
    joined  timestamp null,
    constraint user_room_unique_link
    unique (user_id, room_id),
    constraint user_room_room
    foreign key (room_id) references embrave.room (id)
    on update cascade on delete cascade,
    constraint user_room_user_id_fk
    foreign key (user_id) references embrave.user (id)
    on update cascade on delete cascade
    );

create index room_idx
    on user_room (room_id);


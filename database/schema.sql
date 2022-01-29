-- Create database:
CREATE DATABASE ilmizla_bot;

-- ENUMS:
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create Tables:

-- users
-- admins
-- videos
-- playlists
-- resources
-- feedbacks
-- presentations

CREATE TABLE users (
    chat_id int,
    first_name varchar(200),
    last_name varchar(200),
    username varchar(200),
    page varchar(50),
    role user_role,
    joinedat timestamptz default current_timestamp
);

CREATE TABLE playlists (
    id serial primary key,
    name varchar(50),
    author varchar(50),
    youtube varchar(250),
    createdat timestamptz default current_timestamp
);

CREATE TABLE videos (
    id serial primary key,
    name varchar(200),
    file_id varchar(200),
    playlist_id int references playlists(id),
    duration int,
    createdat timestamptz default current_timestamp,
    status int default 0
);

CREATE TABLE resources (
    id serial primary key,
    playlist_id int references playlists(id),
    file_id varchar(200),
    createdat timestamptz default current_timestamp,
    status int default 0
);

CREATE TABLE feedbacks (
    id serial primary key,
    chat_id int,
    username varchar(200),
    message text,
    date timestamptz default current_timestamp,
    status int default 0
);





-- Create database:
CREATE DATABASE ilmizla_bot;

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
    joinedat timestamptz default current_timestamp
);
CREATE TABLE admins (
    chat_id int
);
CREATE TABLE playlists (
    id serial primary key,
    name varchar(100),
    createdat timestamptz default current_timestamp
);

CREATE TABLE videos (
    id serial primary key,
    name varchar(200),
    file_id varchar(200),
    playlist_id int references playlists(id),
    duration int,
    description text,
    createdat timestamptz default current_timestamp
);

CREATE TABLE resources (
    id serial primary key,
    playlist_id int references playlists(id),
    file_id varchar(200),
    createdat timestamptz default current_timestamp
);

CREATE TABLE presentations (
    id serial primary key,
    playlist_id int references playlists(id),
    file_id varchar(200),
    createdat timestamptz default current_timestamp
);

CREATE TABLE feedbacks (
    chat_id int,
    username varchar(200),
    feedbacks text
);





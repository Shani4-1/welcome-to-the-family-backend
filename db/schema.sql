DROP DATABASE IF EXISTS memories_dev;
CREATE DATABASE memories_dev;

\c memories_dev

CREATE TABLE memories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    year INTEGER NOT NULL,
    is_favorite BOOLEAN NOT NULL
 );

CREATE TABLE comments (
    id SERIAL PRIMARY KEY ,
    commenter VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_favorite BOOLEAN NOT NULL,
    memory_id INTEGER REFERENCES memories (id)
);

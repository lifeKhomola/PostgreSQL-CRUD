 --create a database--
CREATE DATABASE todo_database

--create a Table--

CREATE TABLE todo(

    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
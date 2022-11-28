CREATE TABLE chamber(
    id SERIAL PRIMARY KEY,
    block INTEGER,
    number INTEGER
);

CREATE TABLE prisoner(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    crime VARCHAR(255),
    stretch INTEGER,
    chamber_id INTEGER,
    FOREIGN KEY (chamber_id) REFERENCES chamber(id)
);
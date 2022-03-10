--[{"age":7,"kind":"rainbow","name":"fido"},{"age":5,"kind":"snake","name":"Buttons"}]
DROP TABLE IF EXISTS pets; 

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    age INTEGER NOT NULL,
    kind TEXT NOT NULL
);

INSERT INTO pets(age, name, kind) VALUES (7, 'fido', 'dog');
INSERT INTO pets(age, name, kind) VALUES (8, 'sdf', 'sdfv');
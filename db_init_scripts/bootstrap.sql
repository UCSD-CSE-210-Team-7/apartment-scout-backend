CREATE TABLE IF NOT EXISTS Users (
    email TEXT UNIQUE NOT NULL PRIMARY KEY
    , name TEXT NOT NULL
    , created_on TIMESTAMP NOT NULL DEFAULT NOW()
    , last_login TIMESTAMP DEFAULT NOW()
    , is_scout BOOLEAN DEFAULT FALSE
    , calendly_link TEXT
);

CREATE TABLE IF NOT EXISTS UserRegion (
    user_region_id SERIAL PRIMARY KEY 
    , email TEXT NOT NULL 
    , zipcode INT NOT NULL
    , FOREIGN KEY ( email ) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Tours (
    tour_id SERIAL PRIMARY KEY
    , tour_address TEXT NOT NULL
    , requested_by TEXT NOT NULL
    , scouted_by TEXT NOT NULL
    , date_requested TIMESTAMP DEFAULT NOW()
    , date_completed TIMESTAMP
    , status TEXT DEFAULT 'PLANNED'
    , tour_summary TEXT
    , tour_review_text TEXT
    , tour_review_stars INT
    , FOREIGN KEY ( requested_by ) REFERENCES Users(email)
    , FOREIGN KEY ( scouted_by ) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Conversations (
    conversation_id SERIAL PRIMARY KEY
    , person_a TEXT NOT NULL
    , person_b TEXT NOT NULL
    , FOREIGN KEY ( person_a ) REFERENCES Users(email)
    , FOREIGN KEY ( person_b ) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS Messages (
    msg_id SERIAL PRIMARY KEY
    , msg_text TEXT NOT NULL
    , msg_time TIMESTAMP NOT NULL DEFAULT NOW()
    , sender TEXT NOT NULL
    , conversation_id SERIAL NOT NULL
    , FOREIGN KEY ( sender ) REFERENCES Users(email)
    , FOREIGN KEY ( conversation_id ) REFERENCES Conversations( conversation_id )
);

COPY Users(email, name, created_on, last_login, is_scout, calendly_link)
    FROM '/docker-entrypoint-initdb.d/users.csv'
    DELIMITER ','
    CSV HEADER;

COPY UserRegion(email, zipcode)
    FROM '/docker-entrypoint-initdb.d/user_region.csv'
    DELIMITER ','
    CSV HEADER;

COPY Tours(tour_address, requested_by, scouted_by, date_requested, date_completed, status, tour_summary, tour_review_text, tour_review_stars)
    FROM '/docker-entrypoint-initdb.d/tours.csv'
    DELIMITER ','
    CSV HEADER;

COPY Conversations(conversation_id, person_a, person_b)
    FROM '/docker-entrypoint-initdb.d/conversations.csv'
    DELIMITER ','
    CSV HEADER;

COPY Messages( conversation_id, msg_text, sender)
    FROM '/docker-entrypoint-initdb.d/messages.csv'
    DELIMITER ','
    CSV HEADER;

SELECT setval('"conversations_conversation_id_seq"', (SELECT MAX(conversation_id) FROM Conversations)+1);

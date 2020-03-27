
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    title character varying(80) NOT NULL,
    user_id integer REFERENCES user,
    start_date date,
    end_date date,
    difficulty integer,
    experience integer,
    area text,
    entry_point integer
);

CREATE TABLE trip_members (
    id SERIAL PRIMARY KEY,
    trip_id integer REFERENCES trips,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    age integer NOT NULL,
    email character varying NOT NULL,
    role character varying
);

CREATE TABLE packing_list_items (
    id SERIAL PRIMARY KEY,
    name character varying,
    quantity integer,
    trip_id integer REFERENCES trips,
    have boolean DEFAULT false,
    "displayOrder" integer
);

CREATE TABLE group_packing_list_items (
    id SERIAL PRIMARY KEY,
    name character varying,
    quantity integer,
    trip_id integer REFERENCES trips,
    have boolean DEFAULT false,
    "displayOrder" integer,
    rental boolean DEFAULT false
);

CREATE TABLE rental_items (
    id SERIAL PRIMARY KEY,
    name character varying,
    quantity integer,
    trip_id integer REFERENCES trips,
    "displayOrder" integer
);

CREATE TABLE entry_points (
    number integer,
    name character varying,
    link character varying,
    address character varying,
    difficulty integer
);

-- these entry points have a difficulty level
INSERT INTO entry_points (number, name, link, difficulty)
VALUES 
( 4, 'Crab Lake and Cummings from Burntside Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=4&ft=e&zoom=14&size=500&ft=e&locname=Crab%20Lake%20and%20Cummings%20from%20Burntside%20Lake', 1),
(6, 'Slim Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=6&ft=e&zoom=14&size=500&ft=e&locname=Slim%20Lake', 1),
(7, 'Big Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=7&ft=e&zoom=14&size=500&ft=e&locname=Big%20Lake', 1),
(8, 'Moose River (south)', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=8&ft=e&zoom=14&size=500&ft=e&locname=Moose%20River%20(south)', 2),
(9, 'Little Indian Sioux River (south)','https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=9&ft=e&zoom=14&size=500&ft=e&locname=Little%20Indian%20Sioux%20River%20(south)', 2),
(14, 'Little Indian Sioux River (north)', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=14&ft=e&zoom=14&size=500&ft=e&locname=Little%20Indian%20Sioux%20River%20(north)', 2),
(16, 'Moose/Portage River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=16&ft=e&zoom=14&size=500&ft=e&locname=Moose/Portage%20River%20(north)', 3),
(19, 'Stuart River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=19&ft=e&zoom=14&size=500&ft=e&locname=Stuart%20River', 3),
(20, 'Angleworm Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=20&ft=e&zoom=14&size=500&ft=e&locname=Angleworm%20Lake', 3);

--these entry points don't have a difficulty level. the difficulty column is left blank
INSERT INTO entry_points (number, name, link)
VALUES 
(22, 'Mudro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=22&ft=e&zoom=14&size=500&ft=e&locname=Mudro%20Lake%20(restricted--no%20camping%20on%20Horse%20Lake)'),
(23, 'Mudro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=23&ft=e&zoom=14&size=500&ft=e&locname=Mudro%20Lake'),
(26, 'Wood Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=26&ft=e&zoom=14&size=500&ft=e&locname=Wood%20Lake'),
(28, 'Snowbank Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=28&ft=e&zoom=14&size=500&ft=e&locname=Snowbank%20Lake%20Only'),
(29, 'North Kawishiwi River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=29&ft=e&zoom=14&size=500&ft=e&locname=North%20Kawishiwi%20River'),
(30, 'Lake One', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=30&ft=e&zoom=14&size=500&ft=e&locname=Lake%20One'),
(32, 'South Kawishiwi River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=32&ft=e&zoom=14&size=500&ft=e&locname=South%20Kawishiwi%20River'),
(33, 'Little Gabbro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=33&ft=e&zoom=14&size=500&ft=e&locname=Little%20Gabbro%20Lake'),
(34, 'Island River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=34&ft=e&zoom=14&size=500&ft=e&locname=Island%20River'),
(35, 'Isabella Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=35&ft=e&zoom=14&size=500&ft=e&locname=Isabella%20Lake'),
(36, 'Hog Creek', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=36&ft=e&zoom=14&size=500&ft=e&locname=Hog%20Creek'),
(37, 'Kawishiwi Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=37&ft=e&zoom=14&size=500&ft=e&locname=Kawishiwi%20Lake'),
(38, 'Sawbill Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=38&ft=e&zoom=14&size=500&ft=e&locname=Sawbill%20Lake'),
(39, 'Baker Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=39&ft=e&zoom=14&size=500&ft=e&locname=Baker%20Lake'),
(40, 'Homer Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=40&ft=e&zoom=14&size=500&ft=e&locname=Homer%20Lake'),
(41, 'Brule Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=41&ft=e&zoom=14&size=500&ft=e&locname=Brule%20Lake'),
(43, 'Bower Trout Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=43&ft=e&zoom=14&size=500&ft=e&locname=Bower%20Trout%20Lake'),
(44, 'Ram Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=44&ft=e&zoom=14&size=500&ft=e&locname=Ram%20Lake'),
(45, 'Morgan Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=45&ft=e&zoom=14&size=500&ft=e&locname=Morgan%20Lake'),
(47, 'Lizz and Swamp Lakes', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=47&ft=e&zoom=14&size=500&ft=e&locname=Lizz%20and%20Swamp%20Lakes'),
(48, 'Meeds Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=48&ft=e&zoom=14&size=500&ft=e&locname=Meeds%20Lake'),
(49, 'Skipper and Portage Lakes', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=49&ft=e&zoom=14&size=500&ft=e&locname=Skipper%20and%20Portage%20Lakes'),
(50, 'Cross Bay Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=50&ft=e&zoom=14&size=500&ft=e&locname=Cross%20Bay%20Lake'),
(51, 'Missing Link Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=51&ft=e&zoom=14&size=500&ft=e&locname=Missing%20Link%20Lake'),
(52, 'Brant Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=52&ft=e&zoom=14&size=500&ft=e&locname=Brant%20Lake'),
(54, 'Seagull Lake Only', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=54A&ft=e&zoom=14&size=500&ft=e&locname=Seagull%20Lake%20Only'),
(55, 'Saganaga Lake Only', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=55A&ft=e&zoom=14&size=500&ft=e&locname=Saganaga%20Lake%20Only'),
(57, 'Magnetic Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=57&ft=e&zoom=14&size=500&ft=e&locname=Magnetic%20Lake'),
(58, 'South Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=58&ft=e&zoom=14&size=500&ft=e&locname=South%20Lake'),
(60, 'Duncan Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=60&ft=e&zoom=14&size=500&ft=e&locname=Duncan%20Lake'),
(61, 'Daniels Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=61&ft=e&zoom=14&size=500&ft=e&locname=Daniels%20Lake'),
(66, 'Crocodile River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=66&ft=e&zoom=14&size=500&ft=e&locname=Crocodile%20River'),
(67, 'Bog Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=67&ft=e&zoom=14&size=500&ft=e&locname=Bog%20Lake'),
(68, 'Pine Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=68&ft=e&zoom=14&size=500&ft=e&locname=Pine%20Lake')

;

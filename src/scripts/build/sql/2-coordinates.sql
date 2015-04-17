-- Assign Coordinates to places in bgbPlaces

-- Load amh_location.csv

DROP TABLE IF EXISTS "amhPlaces";
CREATE TABLE "amhPlaces" (
	title varchar(255),
	record_type varchar(255),
	latitude varchar(255),
	longitude varchar(255)
);

COPY "amhPlaces" FROM '/Users/Erik/Desktop/HDAT/src/data/amh_location_mod.csv' DELIMITER ',' CSV;

-- PLACES
-- Setup

DROP TABLE IF EXISTS "bgbPlaceGeo";
CREATE TABLE "bgbPlaceGeo" AS
  TABLE "bgbPlace";

ALTER TABLE "bgbPlaceGeo" 
	ADD COLUMN "geom" geometry(geometry, 4326),
	ADD COLUMN "node" int;

-- Match places to AMHplaces

UPDATE "bgbPlaceGeo"
SET 
	geom = 	St_SetSRID(	
				ST_MakePoint(
					CAST("longitude" as FLOAT), 
					CAST("latitude" as FLOAT)
				),
				4326
			)
FROM "amhPlaces"
WHERE naam = title;

-- Connect the place to the nearest node in the route system. 

UPDATE "bgbPlaceGeo" SET node = findNearestNode("geom");


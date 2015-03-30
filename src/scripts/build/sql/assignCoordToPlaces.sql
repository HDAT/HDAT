-- Assign Coordinates to places in bgbPlaces

-- Load id geodata.csv

DROP TABLE IF EXISTS "placesAtlas";
CREATE TABLE "placesAtlas" (
  place varchar(255),
  coordinate varchar(255)
);

COPY "placesAtlas" FROM '/Users/Robert-Jan/Desktop/HDAT/src/data/geodataAtlas.html' DELIMITER ',' CSV;

-- Create table bgbPlaceGEO

DROP TABLE IF EXISTS "bgbPlaceGeo";
CREATE TABLE "bgbPlaceGeo" AS
  TABLE "bgbPlace";
ALTER TABLE "bgbPlaceGeo" ADD COLUMN "lat" float;
ALTER TABLE "bgbPlaceGeo" ADD COLUMN "lng" float;

-- Patternmatch places

UPDATE "bgbPlaceGeo"
SET 
	lat = CAST(split_part("coordinate", ',', 1) as FLOAT),
	lng = CAST(split_part("coordinate", ',', 2) as FLOAT)
FROM "placesAtlas"
WHERE naam = place;
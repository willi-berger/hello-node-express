CREATE TABLE IF NOT EXISTS persons (
  id int NOT NULL  AUTO_INCREMENT ,
  first_name char(15) DEFAULT NULL,
  last_name char(15) DEFAULT NULL,
  age int(11) DEFAULT NULL,
  birthday datetime DEFAULT NULL,
  created timestamp DEFAULT NOw(),
  primary key(id)
);

-- SELECT @@global.time_zone, @@session.time_zone;

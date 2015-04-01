CREATE DATABASE chat;

USE chat;

CREATE TABLE users 
( 
		user_id int(6) not null auto_increment
	,	user_name varchar(20)  
	, 	PRIMARY KEY (user_id)
);

CREATE TABLE messages 
(
		message_id int(6) not null auto_increment
	,	message_text varchar(100)
	,	user_id int
	,	rooms_id int
	,	PRIMARY KEY (message_id)
	,	FOREIGN KEY (user_id) REFERENCES users(user_id)
	,	FOREIGN KEY (rooms_id) REFERENCES rooms(room_id)	
  
);

CREATE TABLE rooms (
  	room_id int(6) not null auto_increment
	,	room_name varchar(20)  
	, 	PRIMARY KEY (room_id)
  
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


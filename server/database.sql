CREATE TABLE "koalas" (
	"id" serial primary key,
	"name" varchar(40),
	"age" integer,
	"gender" varchar(20) not null,
	"transfer" boolean not null default false,
	"note" varchar(100)
	);
	
	
INSERT INTO "koalas" ("name", "age", "gender", "transfer", "note")
VALUES ('Jean',5,'f',true,'allergic to lots of lava'),('Ororo',7,'f',false,'Loves listening to paula (abdul)'),('Logan',15,'m',false,'loves the sauna'),('Charlie',9,'m',true,'Favorite band is Nirvana'),('Betsy',4,'f',true,'Has a pet iguana'),('Scotty',4,'m',true,'born in guatemala');
 
		
Create database VoyageDiary;

use VoyageDiary;

Create table [User] (
User_ID int  PRIMARY KEY,
Usernmae varchar(25),
Vorname varchar(25),
Nachname varchar(25),
Email varchar(25),
Passwort varchar(65),
);

Create Table Beitrag (
Beitrag_ID int Primary key,
Test varchar(999),
Bildverweiss varchar(999),


);


Create table kommentar(
kommentar_ID int Primary key,
kommentar_text varchar(999),

);

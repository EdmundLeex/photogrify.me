# Schema Information
## MVP
### users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

### albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      |
author_id   | integer   | not null, foreign key (references users), indexed

### pictures
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
picture     | binary    | not null 
author_id   | integer   | not null, foreign key (references users), indexed
album_id    | integer   | not null, foreign key (references notebooks), indexed

## Bonus Phrase 1: Google Map
### pictures
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
picture     | binary    | not null 
author_id   | integer   | not null, foreign key (references users), indexed
album_id    | integer   | not null, foreign key (references notebooks), indexed
geolocation | string    |

## Bonus Phrase 3: Sharing
### Sharings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
picture_id  | integer   | not null
user_id     | interger  | not null

## Bonus Phrase 4: Tagging
### tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
color       | string    | not null

### taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
picture_id  | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

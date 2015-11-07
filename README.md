# Photogrify.me
www.photogrify.me

Photogrify.me is a webapp for managing private photos. Built with React.js
& Ruby on Rails, it aims to provide user a seamless experience of photo
organization and worry free storeage on the cloud.

## Features
A single page app that provides a few features to offer user an intuitive
and smooth experience. Photogrify.me is at its MVP stage, and being continuously
developed.

### Automatic Data Persistance
When creating a new album or editing an existing album, data will be persisted
when the algorithm determines user might finish a section. This includes:
- Edited or added a title
- Uploaded pictures
- Stop editing description for 10 seconds

### Drag and Drop for Photo Organization
User can use drag and drop to move photo from one album to another. Changing
the album cover by drag and drop is also available.
This drag and drop feature persists the change to database real time.

### Your Photos on Google Map
All users photos will be persisted with the location information from exif
data. So user can view their photos as marks on the world map.

### Search by Album
A convenient search bar is available throughout all different views on the
collapsible album index column. User can search for albums by the title with
this responsive search.

## Tech Under the Hood
Photogrify.me is a full stack webapp currently at MVP stage and being develop
as an on-going project.

### Stack
- Ruby on Rails
- React.js
- Postgresql
- Unicorn

### APIs
- Google Maps API
- Cloudinary API

## Technical Features
### Responsiveness
Responses were a pretty neat feature to implement. When a user creates an album,
deletes an album, unexpected server errors, etc. They are now alerted
through the FeedbackStore. Here are the current success/error handling created:

- Creating an album
- Updating an album
- Deleting an album
- Uploading photos
- Deleting a photo
- Auto saving

### Photo Upload
Photo upload is implemented by integration of Cloudinary API. Utilizing the size
manipulation API, loading a full page of thumnails is maded much faster.

### Data Integrity
By using flux architecture, all the information being displayed on the page are
a real refelction of data from database.

Photos are always tight to an album. This is enforced by a design pattern. Database
and Cloudinary storeage are synchronized. Photo deletion will remove data both from
database and cloudinary, which prevents accumulation of unwanted data.

### Modularized Components
Most of the React components are abstrated and grouped by their logical similarity.
This makes adding features much easier, and at the same time, make sure the code
base is maintainable as it grows.

## Todos
- Photos sharing with permission level (view, edit)
- Color of the week (data visualization by extrating colors data from photo)
- Search algorithm optimization
- Photo editing feqture
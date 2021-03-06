# Photogrify.me
www.photogrify.me

Photogrify.me is a web app for managing private photos. Built with React.js
& Ruby on Rails, it aims to provide user a seamless experience of photo
organization and worry free storage on the cloud.

## Features
A single page app that provides a few features to offer user an intuitive
and smooth experience. Photogrify.me is at its MVP stage, and being continuously
developed.

### All the photos, the path of your journey, vividly shown on the map.
![map_ss]

### And you can view all your photos on your picture wall.
![wall_ss]

### Managing photos made easy.
You can move it across albums, or make it a new cover by simple drag and drop
![manage_ss]

### Smart auto save will save your change when needed.
Changes are auto persisted when these conditions are met:
- User finished editing title
- User uploaded photo(s)
- User started editing description and stopped for 10 seconds

![edit_ss]

### View the beautiful photos in slide show mode.
![slide_ss]

[map_ss]: ./docs/screenshots/ss1.png
[wall_ss]: ./docs/screenshots/ss2.png
[manage_ss]: ./docs/screenshots/ss3.png
[edit_ss]: ./docs/screenshots/ss4.png
[slide_ss]: ./docs/screenshots/ss5.png

## Tech Under the Hood
### Stack
- Ruby on Rails
- React.js
- Postgresql
- Unicorn

### APIs
- Google Maps API
- Cloudinary API

## Technical Features
#### Batch Update Wrapped in Transaction
When user upload photos in batch, update is wrapped in a single transaction to prevent
N + 1 query.
```
def save_pictures_to_album(album, picture_urls)
  ActiveRecord::Base.transaction do
    picture_urls.each do |url|
      album.pictures.create(picture_url: url['secure_url'], public_id: url['public_id'])
    end

    unless album.cover_picture_url
      album.update(cover_picture_url: picture_urls.first['secure_url'])
    end
  end
end
```

#### Map View Query Based on Bounds
Thanks to ActiveRecord's lazy evaluation and Relation class, fetching photos by bounds
is made easy with a series of chained where clauses makes a one-round-trip query.
```
@pictures = current_user.pictures
					.where("latitude  < ?", bounds[:northEast][:lat])
					.where("latitude  > ?", bounds[:southWest][:lat])
					.where("longitude > ?", bounds[:southWest][:lng])
					.where("longitude < ?", bounds[:northEast][:lng])
```

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
manipulation API, loading a full page of thumbnails is made much faster.

### Data Integrity
By using flux architecture, all the information being displayed on the page are
a real reflection of data from database.

Photos are always tight to an album. This is enforced by a design pattern. Database
and Cloudinary storage are synchronized. Photo deletion will remove data both from
database and Cloudinary, which prevents accumulation of unwanted data.

### Modularized Components
Most of the React components are abstracted and grouped by their logical similarity.
This makes adding features much easier, and at the same time, make sure the code
base is maintainable as it grows.

## Todos
- Photos sharing with permission level (view, edit)
- Color of the week (data visualization by extracting colors data from photo)
- Search algorithm optimization
- Photo editing feature
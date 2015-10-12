# PICTR
Inspired by EverNote, PICTR is a personal pictures album collection app, where users can collect and organize pictures.
http://pictr-io.herokuapp.com/

## MVP
PICTR is built using RoR and React.js.
It allows users to:

- [ ] Create account
- [ ] Log in / log out
- [ ] Create albums
- [ ] Upload, view, and delete pictures
- [ ] Write, read, and edit description about Albums
- [ ] Apply complex styling to description
- [ ] Pictures viewed in slide show mode

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/db_schema.md

## Implementation

### MVP

#### Phase 1: MVP Backend Models, User Auth, JSON API (1 days)
In phase 1, backend models, user auth and JSON API needs to be done.
There will also be a unstyled landing page with React rendered user 
auth form. Successful sign up or sign in will redirect user to a new
blank page, which will be the main app page.

* [Details][phase_1]
[phase_1]: ./docs/impl_details/phase_1.md

#### Phase 2: MVP Frontend Flux, Albums CRUD (2 days)
In phase 2, an unstyled albums index page must be finished with basic 
layout structure. User should be able to navigate through a list of
albums, add title, description, and perform basic CRUD actions.
After signup, new user will be provided a default album.

* [Details][phase_2]
[phase_2]: ./docs/impl_details/phase_2.md

#### Phase 3: Add Search Feature, slideshow, quilljs and Stage 1 CSS (1.5 day)
Phase 3 focuses on adding search feature, slideshow, complex text edit
and touch up basic stying for MVP.
* After picture is enlarged, user can go to next or prev picture

### Phase 4: Drag and Drop
* In this phrase, implement drag and drop. Users are allowed to drag and
drop image files when create/edit album.
* After that, implement drap and drop pictures from album to album

* [Details][phase_3]
[phase_3]: ./docs/impl_details/phase_3.md

### Phase 5: CSS Touch Up and Add Author Profile Page
Stage 2 CSS touch up and bootstrapping. Finish deliverable interface.
Then add a simple profile page that includes link to my github, linkedin

### Bonus:

#### Phase 1: Google Map Show Pictures' Locations
In this phrase, I will integrate google map, and show pictures location.
And create a new view to show google map and all the pictures.

* Add geolocation column in db to pictures tables
* Use exifr. If meta-data not available, get current geolocation from
browser, otherwise, picture won't show up on map.
* Full page map, left side show picture thumbnails in a column.
* Click picture will show large picture

### Phase 2: Drag and Drop
* In this phrase, implement drag and drop. Users are allowed to drag and
drop image files when create/edit album.
* After that, implement drap and drop pictures from album to album
  * https://github.com/appacademy/capstone-project-curriculum#jquery-ui
* File upload:
  * https://github.com/paramaggarwal/react-dropzone (React-dropzone)
  * http://blueimp.github.io/jQuery-File-Upload/
  * http://www.plupload.com
  * http://www.thecssninja.com/javascript/drag-and-drop-upload
  * http://www.dropzonejs.com

### Phase 3: Full Screen Slideshow
* Add fullscreen slideshow function

### Phase 3: Share
Add share feature where users can share pictures/albums with other users.
* Sharing entire album will share all pictures in the album

### Phase 4: Draw on Pictures
Add simple tools for user to draw and put text on pictures

### Phase 5: Tagging
User can tag pictures with tag name and color
* Tagging entire album will share all pictures in the album
* Google map view will have ability to filter pictures by tags

### Phase 6: Sharing Permissions
User can limit permissions when share (read, update)
User can tag pictures.
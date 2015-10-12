# PICTR
Inspired by EverNote, PICTR is a personal pictures album collection app, where users can collect and organize pictures.

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
At this stage, new user will be provided a default album.

* [Details][phase_2]
[phase_2]: ./docs/impl_details/phase_2.md

#### Phase 3: Add Search Feature, slideshow, quilljs and Stage 1 CSS (1.5 day)
Phase 3 focuses on adding search feature, slideshow, complex text edit
and touch up basic stying for MVP.

* [Details][phase_3]
[phase_3]: ./docs/impl_details/phase_3.md

### Bonus:

#### 


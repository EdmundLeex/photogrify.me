# PICTR
Inspired by EverNote, PICTR is a personal pictures album collection app, where users can collect and organize pictures.

## MVP
PICTR is built using RoR and React.js.
It allows users to:

- [ ] Create account
- [ ] Log in / log out
- [ ] Create albums
- [ ] Create, view, and delete pictures
- [ ] Write, read, and edit notes about pictures
- [ ] Apply complex styling to notes

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/db_schema.md

## Implementation

### Phase 1: MVP Backend Models, User Auth, JSON API (1 days)
In phase 1, backend models, user auth and JSON API needs to be done.
There will also be a unstyled landing page with React rendered user 
auth form. Successful sign up or sign in will redirect user to a new
blank page, which will be the main app page.

* [Details][phase_1]
[phase_1]: ./docs/impl_details/phase_1.md

### Phase 2: MVP Frontend Flux 1, Albums CRUD (2 days)
In phase 2, an unstyled albums index page must be finished with basic 
layout structure. User should be able to navigate through a list of
albums, add title, description, and perform basic CRUD actions.
At this stage, new user will be provided a default album.

* [Details][phase_2]
[phase_2]: ./docs/impl_details/phase_2.md

### Phase 3: MVP Frontend Flux 2, Albums CRUD, and Styling (1.5 day)
Phase 3 focuses on finishing basic MVP, and making alubms index page
available with Flux. After that, first stage CSS styling will be applied.
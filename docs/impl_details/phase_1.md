# Phase 1 MVP Backend Models, User Auth, JSON API (1 days)

## Rails

### Models
* User
* Album
* Picture

### Controllers
* StaticPagesController (home)
* UsersController (create)
* SessionsController (create, destroy)
* API::AlbumsController(create, destroy, index, show, update)
* API::PicturesController(create, destroy, index, show, update)

### Views
* static_pages/home.html.erb
* albums/index.json.jbuilder
* albums/show.json.jbuilder
* pictures/index.json.jbuilder
* pictures/show.json.jbuilder

## Flux
### Views (React Components)
* Sign up form
* Log in form

### Actions
* signUp
* login

### Stores
* UserAuthStore

### ApiUtil
* signUp
* login
* logout

## Gems/Libraries
* BCrypt
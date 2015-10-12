# Phase 3: Add Search Feature, slideshow, quilljs and Stage 1 CSS (1.5 day)

## Rails
Possible adjustment on rich text handling and extracting image
http://stackoverflow.com/questions/20925143/how-to-save-image-from-rich-text-editor

## Flux
### Views (React Components)

* AlbumsIndex
  * AlbumsIndexTitle
    * SearchBar (adding)

* AlbumShow
  * PictureFrame (show after click)
    * Left, right button to navigate among pictures

### Actions
* NextPicture
* PrevPicture
* SearchAlbum

### Stores
* AlbumStore

### ApiUtil
* createAlbum
* deleteAlbum
* updateAlbum
* FetchAllAlbums
* FetchOneAlbum

## Gems/Libraries
* quilljs
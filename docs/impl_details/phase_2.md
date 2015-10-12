# Phase 2: MVP Frontend Flux 1, Pictures CRUD (1.5 days)

## Flux
### Views (React Components)
* SideBar
  * CreateAlbumButton
  * AllPicturesButton
  * AllAlbumsButton

* AlbumsIndex
  * AlbumsIndexTitle
  * AlbumIndexItem
    * Title
    * DeleteButton

* AlbumShow
  * AlbumTitleBar
    * AlbumTitle
    * PicturesCount
    * EditButton
    * DeleteButton
  * PicturesThumbnails
    * PictureThumbnailItem
      * DeleteButton
  * PictureFrame (show after click)

### Actions
* CreateAlbum
* DeleteAlbum
* UpdateAlbum
* FetchAllAlbums
* FetchPictures
* ShowAlbum
* ShowPicture

### Stores
* AlbumStore

### ApiUtil
* createAlbum
* deleteAlbum
* updateAlbum
* FetchAllAlbums
* FetchOneAlbum

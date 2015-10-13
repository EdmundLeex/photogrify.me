window.ApiActions = {
	receiveAllPictures: function (pictures) {
		// body...
	},

	receiveAllAlbums: function (albums) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUMS_RECEIVED,
			albums: albums
		});
	},

	receivePicturesFromOneAlbum: function (id) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUM_PICTURES_RECEIVED,
			albumId: id
		});
	}
};
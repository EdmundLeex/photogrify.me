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

	receivePicturesFromOneAlbum: function (payload) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUM_PICTURES_RECEIVED,
			album: payload
		});
	}
};
window.ApiActions = {
	receiveAllPictures: function (pictures) {
		// body...
	},

	receiveAllAlbums: function (albums) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUMS_RECEIVED,
			albums: albums
		});
	},

	receivePicturesFromOneAlbum: function (payload) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_PICTURES_RECEIVED,
			album: payload
		});
	},

	updatedAlbum: function (albums) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_UPDATED,
			albums: albums
		});
	},

	savedDescription: function (description) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_DESCRIPTION_SAVED,
			description: description
		});
	}
};
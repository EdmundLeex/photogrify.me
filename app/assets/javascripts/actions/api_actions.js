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

	changedTitle: function (title) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_TITLE_CHANGED,
			title: title
		});
	}
};
window.ApiActions = {
	receiveAllPictures: function (pictures) {
		// body...
	},

	receiveAllAlbums: function (albums) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUMS_RECEIVED,
			albums: albums
		});
	}
};
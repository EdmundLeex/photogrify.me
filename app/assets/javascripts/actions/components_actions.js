window.ComponentActions = {
	switchAlbum: function (albumId) {
		// call api action ajax
		// change index state
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUM_SWITCHED,
			albumId: albumId
		});
	}
};
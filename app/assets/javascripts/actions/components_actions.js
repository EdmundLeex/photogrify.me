window.ComponentActions = {
	switchAlbum: function (albumId) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUM_SWITCHED,
			albumId: albumId
		});
	}
};
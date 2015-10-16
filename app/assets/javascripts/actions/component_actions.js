window.ComponentActions = {
	// switchAlbum: function (albumId) {
	// 	AppDispatcher.dispatch({
	// 		actionType: APP_CONSTANTS.ALBUM_SWITCHED,
	// 		albumId: albumId
	// 	});
	// },

	toggleEditing: function (editing) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_EDITING,
			editing: editing
		});
	},

	toggleCreating: function (creating) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_CREATING,
			creating: creating
		});
	},

	// toggleMode: function (mode) {
	// 	AppDispatcher.dispatch({
	// 		actionType: APP_CONSTANTS.TOGGLE_MODE,
	// 		mode: mode
	// 	});
	// },

	saveNewAlbum: function (album) {
		ApiUtil.updateAlbum(album.id, album.title, album.description);
		AlbumStore.clearNewAlbum();
	}

	// retrieveAlbumState: function (albumId) {
	// 	ApiUtil.fetchAllAlbums();
	// 	AppDispatcher.dispatch({
	// 		actionType: APP_CONSTANTS.RETRIEVE_ALBUM_STATE,
	// 		currentAlbumId: albumId
	// 	});
	// }
};
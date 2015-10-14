window.ComponentActions = {
	switchAlbum: function (albumId) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.ALBUM_SWITCHED,
			albumId: albumId
		});
	},

	toggleEditing: function (editing) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_EDITING,
			editing: editing
		})
	},

	toggleMode: function (mode) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_MODE,
			mode: mode
		})
	}
};
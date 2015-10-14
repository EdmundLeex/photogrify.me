window.ComponentActions = {
	switchAlbum: function (albumId) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.ALBUM_SWITCHED,
			albumId: albumId
		});
	},

	toggleEditing: function (editing) {
		AppDispatcher.dispatch({
			actionType: CONSTANTS.TOGGLE_EDITING,
			editing: editing
		})
	}
};
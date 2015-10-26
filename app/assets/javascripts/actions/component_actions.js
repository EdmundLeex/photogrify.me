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

	togglerOverlay: function (isShown) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_OVERLAY,
			isShown: isShown
		});
	},

	saveNewAlbum: function (album) {
		ApiUtil.updateAlbum(album.id, album.title, album.description);
		AlbumStore.clearNewAlbum();
	},

	searchAlbum: function (queryStr) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.SEARCH_ALBUM,
			queryStr: queryStr
		});
	},

	// toggleSearchBar: function (showSearchBox) {
	// 	AppDispatcher.dispatch({
	// 		actionType: APP_CONSTANTS.TOGGLE_SEARCH,
	// 		showSearchBox: showSearchBox
	// 	});
	// },

	toggleImg: function (picture) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.PICTURE_ENLARGED,
			picture: picture
		});
	},

	slideOut: function (show) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.SLIDE_PANEL,
			show: show
		});
	},

	isDroppingToAlbum: function (isDragging) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.IS_DRAGGING,
			isDragging: isDragging
		});
	},

	newMsg: function (msg) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.NEW_MESSAGE,
			msg: msg
		});
	},

	showConfirmation: function (show, callback, model, msg, path) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.SHOW_CONFIRMATION,
			show: show,
			callback: callback,
			model: model,
			msg: msg,
			path: path
		});
	},

	loggingOut: function (bool) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.LOGGING_OUT,
			bool: bool
		});
	},

	deletingAlbum: function (bool) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.DELETING_ALBUM,
			bool: bool
		});
	},

	highlightPicture: function (picture) {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.HIGHLIGHT_PICTURE,
			picture: picture
		});
	},

	togglePicList: function () {
		AppDispatcher.dispatch({
			actionType: APP_CONSTANTS.TOGGLE_PIC_LIST
		});
	}

	// retrieveAlbumState: function (albumId) {
	// 	ApiUtil.fetchAllAlbums();
	// 	AppDispatcher.dispatch({
	// 		actionType: APP_CONSTANTS.RETRIEVE_ALBUM_STATE,
	// 		currentAlbumId: albumId
	// 	});
	// }
};
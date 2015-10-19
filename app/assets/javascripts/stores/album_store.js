(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var ALBUM_SWITCHED_EVENT = "ALBUM_SWITCHED_EVENT";
	// var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var ALBUM_UPDATED_EVENT = "ALBUM_UPDATED_EVENT";
	var ALBUM_CREATED_EVENT = "ALBUM_CREATED_EVENT";
	// var CURRENT_ALBUM_ID_RETRIEVED_EVENT = "CURRENT_ALBUM_ID_RETRIEVED_EVENT";
	// var TOGGLE_CREATING_EVENT = "TOGGLE_CREATING_EVENT";
	var SEARCH_ALBUM_EVENT = "SEARCH_ALBUM_EVENT";

	var _albums = [];
	// var _currentAlbum = null;
	// var _currentAlbumId = null,
	// 		_newAlbumId = null;
	// var _currentTitle = null;
	// var _editingTitle = false;
	// var _creating = 'new';
	var _matches = [];
	var _queryStr = "";

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	// var switchAlbum = function (id) {
	// 	_currentAlbumId = id;
	// 	// _currentTitle = _currentAlbum.title;
	// };

	// var toggleEditing = function (editing) {
	// 	_editingTitle = editing;
	// };

	// var toggleCreating = function (creating) {
	// 	_creating = creating;
	// };

	var resetTitle = function (title) {
		_currentTitle = title;
	};

	// var toggleMode = function (mode) {
	// 	_mode = mode;
	// };

	var createAlbum = function (album) {
		_albums.unshift(album);
		// _currentAlbumId = album.id;
	};

	var searchAlbum = function (queryStr) {
		queryStr = queryStr.toLowerCase();
		_matches = [];
		_albums.forEach(function (alb) {
			if (alb.title.toLowerCase().match(queryStr)) {
				_matches.push(alb);
			}
		})
	};

	root.AlbumStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _albums.slice();
		},

		count: function () {
			return _albums.length;
		},

		find: function (albumId) {
			return _albums.filter(function (alb) {
				return alb.id === parseInt(albumId);
			})[0];
		},

		latestAlbum: function () {
			return _albums[0];
		},

		matchedAlbums: function () {
			return _matches.slice();
		},

		queryStr: function () {
			return _queryStr;
		},

		// isEditing: function () {
		// 	return _editingTitle;
		// },

		// currentAlbumId: function () {
		// 	return _currentAlbumId;
		// },

		// currentAlbum: function () {
		// 	return _albums.filter(function (alb) {
		// 		return alb.id === _currentAlbumId;
		// 	})[0];
		// },

		// currentTitle: function () {
		// 	return this.currentAlbum().title;
		// },

		// newAlbumId: function () {
		// 	return _newAlbumId;
		// },

		// newAlbum: function () {
		// 	return _albums.filter(function (alb) {
		// 		return alb.id === _newAlbumId;
		// 	})[0];
		// },

		// newAlbumTitle: function () {
		// 	return this.newAlbum().title;
		// },

		// clearNewAlbum: function () {
		// 	_newAlbumId = null;
		// },

		// currentMode: function () {
		// 	return _mode;
		// },

		addAlbumsIndexChangeListener: function (callback) {
			this.on(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		removeAlbumsIndexChangeListener: function (callback) {
			this.removeListener(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		addAlbumSwitchedListener: function (callback) {
			this.on(ALBUM_SWITCHED_EVENT, callback);
		},

		removeAlbumSwitchedListener: function (callback) {
			this.removeListener(ALBUM_SWITCHED_EVENT, callback);
		},

		// addToggleEditingListener: function (callback) {
		// 	this.on(TOGGLE_EDITING_EVENT, callback);
		// },

		// removeToggleEditingListener: function (callback) {
		// 	this.removeListener(TOGGLE_EDITING_EVENT, callback);
		// },

		addAlbumUpdateListener: function (callback) {
			this.on(ALBUM_UPDATED_EVENT, callback);
		},

		removeAlbumUpdateListener: function (callback) {
			this.removeListener(ALBUM_UPDATED_EVENT, callback);
		},

		addAlbumCreateListener: function (callback) {
			this.on(ALBUM_CREATED_EVENT, callback);
		},

		removeAlbumCreateListener: function (callback) {
			this.removeListener(ALBUM_CREATED_EVENT, callback);
		},

		// addToggleCreatingListener: function (callback) {
		// 	this.on(TOGGLE_CREATING_EVENT, callback);
		// },

		// removeToggleCreatingListener: function (callback) {
		// 	this.removeListener(TOGGLE_CREATING_EVENT, callback);
		// },

		addSearchAlbumListener: function (callback) {
			this.on(SEARCH_ALBUM_EVENT, callback);
		},

		removeSearchAlbumListener: function (callback) {
			this.removeListener(SEARCH_ALBUM_EVENT, callback);
		},

		// addCurrentAlbumIdRetrieveListener: function (callback) {
		// 	this.on(CURRENT_ALBUM_ID_RETRIEVED_EVENT, callback);
		// },

		// removeCurrentAlbumIdRetrieveListener: function (callback) {
		// 	this.removeListener(CURRENT_ALBUM_ID_RETRIEVED_EVENT, callback);
		// },

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				// case APP_CONSTANTS.ALBUM_SWITCHED:
				// 	switchAlbum(payload.albumId);
				// 	AlbumStore.emit(ALBUM_SWITCHED_EVENT);
				// 	break;
				// case APP_CONSTANTS.TOGGLE_EDITING:
				// 	toggleEditing(payload.editing);
				// 	AlbumStore.emit(TOGGLE_EDITING_EVENT);
				// 	break;
				case APP_CONSTANTS.ALBUM_UPDATED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUM_UPDATED_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_CREATED:
					createAlbum(payload.album);
					AlbumStore.emit(ALBUM_CREATED_EVENT);
					break;
				// case APP_CONSTANTS.TOGGLE_CREATING:
				// 	toggleCreating(payload.creating);
				// 	AlbumStore.emit(TOGGLE_CREATING_EVENT);
				// 	break;
				case APP_CONSTANTS.SEARCH_ALBUM:
					searchAlbum(payload.queryStr);
					_queryStr = payload.queryStr;
					AlbumStore.emit(SEARCH_ALBUM_EVENT);
					break;
				// case APP_CONSTANTS.RETRIEVE_ALBUM_STATE:
				// 	_currentAlbumId = parseInt(payload.currentAlbumId);
				// 	AlbumStore.emit(CURRENT_ALBUM_ID_RETRIEVED_EVENT);
				// 	break;
				default:
					break;
			}
		})
	});
})(this);
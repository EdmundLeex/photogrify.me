(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var ALBUM_SWITCHED_EVENT = "ALBUM_SWITCHED_EVENT";
	var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var ALBUM_UPDATED_EVENT = "ALBUM_UPDATED_EVENT";
	var TOGGLE_MODE_EVENT = "TOGGLE_MODE_EVENT";
	var ALBUM_CREATED_EVENT = "ALBUM_CREATED_EVENT";
	var CURRENT_ALBUM_ID_RETRIEVED_EVENT = "CURRENT_ALBUM_ID_RETRIEVED_EVENT";

	var _albums = [];
	// var _currentAlbum = null;
	var _currentAlbumId = null;
	// var _currentTitle = null;
	var _editingTitle = false;
	var _mode = 'view';

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	var switchAlbum = function (id) {
		_currentAlbumId = id;
		localStorage.setItem('currentAlbumId', id);
		// _currentTitle = _currentAlbum.title;
	};

	var toggleEditing = function (editing) {
		_editingTitle = editing;
	};

	var resetTitle = function (title) {
		_currentTitle = title;
	};

	var toggleMode = function (mode) {
		_mode = mode;
	};

	var createAlbum = function (album) {
		_albums.push(album);
		_currentAlbumId = album.id;
		localStorage.setItem('createdAlbumId', album.id);
	};

	root.AlbumStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _albums.slice();
		},

		count: function () {
			return _albums.length;
		},

		currentAlbumId: function () {
			return _currentAlbumId;
		},

		currentAlbum: function () {
			return _albums.filter(function (alb) {
				return alb.id === _currentAlbumId;
			})[0];
		},

		currentTitle: function () {
			return this.currentAlbum().title;
		},

		isEditing: function () {
			return _editingTitle;
		},

		currentMode: function () {
			return _mode;
		},

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

		addToggleEditingListener: function (callback) {
			this.on(TOGGLE_EDITING_EVENT, callback);
		},

		removeToggleEditingListener: function (callback) {
			this.removeListener(TOGGLE_EDITING_EVENT, callback);
		},

		addAlbumUpdateListener: function (callback) {
			this.on(ALBUM_UPDATED_EVENT, callback);
		},

		removeAlbumUpdateListener: function (callback) {
			this.removeListener(ALBUM_UPDATED_EVENT, callback);
		},

		addToggleModeListener: function (callback) {
			this.on(TOGGLE_MODE_EVENT, callback);
		},

		removeToggleModeListener: function (callback) {
			this.removeListener(TOGGLE_MODE_EVENT, callback);
		},

		addAlbumCreateListener: function (callback) {
			this.on(ALBUM_CREATED_EVENT, callback);
		},

		removeAlbumCreateListener: function (callback) {
			this.removeListener(ALBUM_CREATED_EVENT, callback);
		},

		addCurrentAlbumIdRetrieveListener: function (callback) {
			debugger
			this.on(CURRENT_ALBUM_ID_RETRIEVED_EVENT, callback);
		},

		removeCurrentAlbumIdRetrieveListener: function (callback) {
			this.removeListener(CURRENT_ALBUM_ID_RETRIEVED_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_SWITCHED:
					switchAlbum(payload.albumId);
					AlbumStore.emit(ALBUM_SWITCHED_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_EDITING:
					toggleEditing(payload.editing);
					AlbumStore.emit(TOGGLE_EDITING_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_UPDATED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUM_UPDATED_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_MODE:
					toggleMode(payload.mode);
					AlbumStore.emit(TOGGLE_MODE_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_CREATED:
					createAlbum(payload.album);
					AlbumStore.emit(ALBUM_CREATED_EVENT);
					break;
				case APP_CONSTANTS.RETRIEVE_ALBUM_STATE:
					_currentAlbumId = parseInt(payload.currentAlbumId);
					debugger
					AlbumStore.emit(CURRENT_ALBUM_ID_RETRIEVED_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
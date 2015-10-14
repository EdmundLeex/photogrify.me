(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var ALBUM_SWITCHED_EVENT = "ALBUM_SWITCHED_EVENT";
	var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var _albums = [];
	var _currentAlbumId = null;
	var _currentTitle = null;
	var _editing = false;

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	var switchAlbum = function (id) {
		_currentAlbum = _albums.filter(function (alb) {
			return alb.id === id;
		})[0];

		// _currentAlbumId = id;
		_currentTitle = _currentAlbum.title;
		// REMOVE
		// console.log("Switch to: " + _currentAlbumId);
	};

	var toggleEditing = function (editing) {
		_editing = editing;
	}

	// var changeAlbumTitle = function (title) {
	// 	_currentTitle = title;
	// };

	root.AlbumStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _albums.slice();
		},

		count: function () {
			return _albums.length;
		},

		currentAlbumId: function () {
			return _currentAlbum.id;
		},

		currentAlbum: function () {
			return _currentAlbum;
		},

		currentTitle: function () {
			return _currentTitle
		},

		isEditing: function () {
			return _editing;
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

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				case CONSTANTS.ALBUM_SWITCHED:
					switchAlbum(payload.albumId);
					AlbumStore.emit(ALBUM_SWITCHED_EVENT);
					break;
				case CONSTANTS.TOGGLE_EDITING:
					toggleEditing(payload.editing);
					AlbumStore.emit(TOGGLE_EDITING_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var ALBUM_SWITCED_EVENT = "ALBUM_SWITCED_EVENT";
	var _albums = [];
	var _currentAlbumId = null;

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	var switchAlbum = function (id) {
		_currentAlbumId = id;
	};

	root.AlbumStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _albums.slice();
		},

		count: function () {
			return _albums.length;
		},

		addAlbumsIndexChangeListener: function (callback) {
			this.on(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		removeAlbumsIndexChangeListener: function (callback) {
			this.removeListener(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		addAlbumSwitchedListener: function (callback) {
			this.on(ALBUM_SWITCED_EVENT, callback);
		},

		removeAlbumSwitchedListener: function (callback) {
			this.removeListener(ALBUM_SWITCED_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				case CONSTANTS.ALBUM_PICTURES_RECEIVED:
					switchAlbum(payload.albumId);
					AlbumStore.emit(ALBUM_SWITCED);
					break;
				default:
					break;
			}
		})
	});
})(this);
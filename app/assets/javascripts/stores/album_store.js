(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var ALBUM_SWITCHED_EVENT = "ALBUM_SWITCHED_EVENT";
	var ALBUM_UPDATED_EVENT = "ALBUM_UPDATED_EVENT";
	var ALBUM_CREATED_EVENT = "ALBUM_CREATED_EVENT";
	var SEARCH_ALBUM_EVENT = "SEARCH_ALBUM_EVENT";

	var _albums = [];
	var _matches = [];
	var _queryStr = "";

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	var resetTitle = function (title) {
		_currentTitle = title;
	};

	var createAlbum = function (album) {
		_albums.unshift(album);
	};

	var searchAlbum = function (queryStr) {
		queryStr = queryStr.toLowerCase();
		_matches = [];
		_albums.forEach(function (alb) {
			if (alb.title.toLowerCase().match(queryStr)) {
				_matches.push(alb);
			}
		});
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

		addSearchAlbumListener: function (callback) {
			this.on(SEARCH_ALBUM_EVENT, callback);
		},

		removeSearchAlbumListener: function (callback) {
			this.removeListener(SEARCH_ALBUM_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_UPDATED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUM_UPDATED_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_CREATED:
					createAlbum(payload.album);
					AlbumStore.emit(ALBUM_CREATED_EVENT);
					break;
				case APP_CONSTANTS.SEARCH_ALBUM:
					_queryStr = payload.queryStr;
					searchAlbum(_queryStr);
					AlbumStore.emit(SEARCH_ALBUM_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
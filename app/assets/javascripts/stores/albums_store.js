(function(root){
	var ALBUMS_INDEX_CHANGED_EVENT = "ALBUMS_INDEX_CHANGED_EVENT";
	var _albums = [];

	var resetAlbums = function (albums) {
		_albums = albums;
	};

	root.AlbumStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _albums.slice();
		},

		addAlbumsIndexChangeListener: function (callback) {
			this.on(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		removeAlbumsIndexChangeListener: function (callback) {
			this.removeListener(ALBUMS_INDEX_CHANGED_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case CONSTANTS.ALBUMS_RECEIVED:
					resetAlbums(payload.albums);
					AlbumStore.emit(ALBUMS_INDEX_CHANGED_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
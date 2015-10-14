(function(root){
	var PICTURES_COLLECTION_CHANGED_EVENT = "PICTURES_COLLECTION_CHANGED_EVENT";
	var _pictures = [];

	var resetPictures = function (pictures) {
		_pictures = pictures;
	};

	root.PictureStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _pictures.slice();
		},

		count: function () {
			return _pictures.length;
		},

		addPicturesCollectionChangedListener: function (callback) {
			this.on(PICTURES_COLLECTION_CHANGED_EVENT, callback);
		},

		removePicturesCollectionChangedListener: function (callback) {
			this.removeListener(PICTURES_COLLECTION_CHANGED_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case CONSTANTS.ALBUM_PICTURES_RECEIVED:
					resetPictures(payload.album.pictures);
					AlbumStore.emit(PICTURES_COLLECTION_CHANGED_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
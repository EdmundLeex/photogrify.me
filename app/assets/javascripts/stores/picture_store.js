(function(root){
	var PICTURES_COLLECTION_CHANGED_EVENT = "PICTURES_COLLECTION_CHANGED_EVENT";
	var ALL_PICTURES_RECEIVED_EVENT = "ALL_PICTURES_RECEIVED_EVENT";
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

		addAllPicturesChangedListener: function (callback) {
			this.on(ALL_PICTURES_RECEIVED_EVENT, callback)
		},

		removeAllPicturesChangedListener: function (callback) {
			this.removeListener(ALL_PICTURES_RECEIVED_EVENT, callback)
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.ALBUM_PICTURES_RECEIVED:
					resetPictures(payload.album.pictures);
					PictureStore.emit(PICTURES_COLLECTION_CHANGED_EVENT);
					break;
				case APP_CONSTANTS.ALL_PICTURES_RECEIVED:
					resetPictures(payload.pictures)
					PictureStore.emit(ALL_PICTURES_RECEIVED_EVENT);
				default:
					break;
			}
		})
	});
})(this);
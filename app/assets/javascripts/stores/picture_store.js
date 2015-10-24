(function(root){
	var PICTURES_COLLECTION_CHANGED_EVENT = "PICTURES_COLLECTION_CHANGED_EVENT";
	var ALL_PICTURES_RECEIVED_EVENT = "ALL_PICTURES_RECEIVED_EVENT";
	var PICTURE_TOGGLE_EVENT = "PICTURE_TOGGLE_EVENT";

	var _pictures = [];
	var _enlargedImg = null;

	var resetPictures = function (pictures) {
		_pictures = pictures;
	};

	var setEnlargeImg = function (img) {
		_enlargedImg = img;
	};

	root.PictureStore = $.extend({}, EventEmitter.prototype, {
		all: function () {
			return _pictures.slice();
		},

		count: function () {
			return _pictures.length;
		},

		enlargedImg: function () {
			return _enlargedImg;
		},

		nextImg: function (dir) {
			var imgIdx = $.map(_pictures, function(pic, idx) {
		    if(pic.id === _enlargedImg.id) {
	        return idx;
		    }
			})[0];
			imgIdx = (imgIdx + dir >= 0) ? (imgIdx + dir) % _pictures.length : _pictures.length - 1;
			return _pictures.slice()[imgIdx];
		},

		find: function (id) {
			return _pictures.slice().filter(function (img) {
				return img.id === id;
			})[0];
		},

		addPicturesCollectionChangedListener: function (callback) {
			this.on(PICTURES_COLLECTION_CHANGED_EVENT, callback);
		},

		removePicturesCollectionChangedListener: function (callback) {
			this.removeListener(PICTURES_COLLECTION_CHANGED_EVENT, callback);
		},

		addAllPicturesChangedListener: function (callback) {
			this.on(ALL_PICTURES_RECEIVED_EVENT, callback);
		},

		removeAllPicturesChangedListener: function (callback) {
			this.removeListener(ALL_PICTURES_RECEIVED_EVENT, callback);
		},

		addTogglePictureListener: function (callback) {
			this.on(PICTURE_TOGGLE_EVENT, callback);
		},

		removeTogglePictureListener: function (callback) {
			this.removeListener(PICTURE_TOGGLE_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.ALBUM_PICTURES_RECEIVED:
					resetPictures(payload.pictures);
					PictureStore.emit(PICTURES_COLLECTION_CHANGED_EVENT);
					break;
				case APP_CONSTANTS.ALL_PICTURES_RECEIVED:
					resetPictures(payload.pictures);
					PictureStore.emit(ALL_PICTURES_RECEIVED_EVENT);
					break;
				case APP_CONSTANTS.PICTURE_ENLARGED:
					setEnlargeImg(payload.picture);
					PictureStore.emit(PICTURE_TOGGLE_EVENT);
					break;
				case APP_CONSTANTS.ALBUM_UPDATED:
					// AppDispatcher.waitFor(AlbumStore.dispatchId);
					resetPictures(payload.pictures);
					PictureStore.emit(PICTURES_COLLECTION_CHANGED_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
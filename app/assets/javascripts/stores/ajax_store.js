(function(root){
	var LOGGING_OUT_EVENT = "LOGGING_OUT_EVENT";
	var DELETING_ALBUM_EVENT = "DELETING_ALBUM_EVENT";
	var _loggingOut = false;
	var _deletingAlbum = false;

	var loggingOut = function (bool) {
		_loggingOut = bool;
	};

	var deletingAlbum = function (bool) {
		_deletingAlbum = bool;
	};

	root.AjaxStore = $.extend({}, EventEmitter.prototype, {
		isLoggingOut: function () {
			return _loggingOut;
		},

		isDeletingAlbum: function () {
			return _deletingAlbum;
		},

		addIsLoggingOutListener: function (callback) {
			this.on(LOGGING_OUT_EVENT, callback);
		},

		removeIsLoggingOutListener: function (callback) {
			this.removeListener(LOGGING_OUT_EVENT, callback);
		},

		addIsDeletingAlbumListener: function (callback) {
			this.on(DELETING_ALBUM_EVENT, callback);
		},

		removeIsDeletingAlbumListener: function (callback) {
			this.removeListener(DELETING_ALBUM_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch(payload.actionType){
				case APP_CONSTANTS.LOGGING_OUT:
					loggingOut(payload.bool);
					AjaxStore.emit(LOGGING_OUT_EVENT);
					break;
				case APP_CONSTANTS.DELETING_ALBUM:
					deletingAlbum(payload.bool);
					AjaxStore.emit(DELETING_ALBUM_EVENT);
					break;
				default:
					// no op
					break;
			}
		})
	});
})(this);
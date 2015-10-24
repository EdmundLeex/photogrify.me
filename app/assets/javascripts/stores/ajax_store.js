(function(root){
	var LOGGING_OUT_EVENT = "LOGGING_OUT_EVENT";
	var _loggingOut = false;

	var loggingOut = function (bool) {
		_loggingOut = bool;
	};

	root.AjaxStore = $.extend({}, EventEmitter.prototype, {
		isLoggingOut: function () {
			return _loggingOut;
		},

		addIsLoggingOutListener: function (callback) {
			this.on(LOGGING_OUT_EVENT, callback);
		},

		removeIsLoggingOutListener: function (callback) {
			this.removeListener(LOGGING_OUT_EVENT, callback)
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch(payload.actionType){
				case APP_CONSTANTS.LOGGING_OUT:
					loggingOut(payload.bool);
					AjaxStore.emit(LOGGING_OUT_EVENT);
					break;
				default:
					// no op
					break;
			}
		})
	});
})(this);
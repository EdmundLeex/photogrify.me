(function(root){
	var NEW_MESSAGE_EVENT = "NEW_MESSAGE_EVENT";
	var _msg = {};

	var setMsg = function (msg) {
		_msg = msg;
	};

	root.ServerFeedbackStore = $.extend({}, EventEmitter.prototype, {
		msg: function () {
			return _msg;
		},

		addShowMsgListener: function (callback) {
			this.on(NEW_MESSAGE_EVENT, callback);
		},

		removeShowMsgListener: function (callback) {
			this.removeListener(NEW_MESSAGE_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch(payload.actionType) {
				case APP_CONSTANTS.NEW_MESSAGE:
					setMsg(payload.msg);
					ServerFeedbackStore.emit(NEW_MESSAGE_EVENT);
					break;
				default:
					// no op
					break;
			}
		})
	});
})(this);
(function(root){
	var TOGGLE_SEARCH_EVENT = "TOGGLE_SEARCH_EVENT";
	var _showSearchBox = false;

	root.TogglerStore = $.extend({}, EventEmitter.prototype, {
		showSearchBox: function () {
			return _showSearchBox;
		},

		addToggleSearchListener: function (callback) {
			this.on(TOGGLE_SEARCH_EVENT, callback);
		},

		removeToggleSearchListener: function (callback) {
			this.removeListener(TOGGLE_SEARCH_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.TOGGLE_SEARCH:
					_showSearchBox = !payload.showSearchBox;
					TogglerStore.emit(TOGGLE_SEARCH_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
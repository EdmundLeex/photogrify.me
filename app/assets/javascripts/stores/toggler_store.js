(function(root){
	var TOGGLE_SEARCH_EVENT = "TOGGLE_SEARCH_EVENT";
	var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var TOGGLE_CREATING_EVENT = "TOGGLE_CREATING_EVENT";
	var PICTURE_TOGGLE_EVENT = "PICTURE_TOGGLE_EVENT";
	// var TOGGLE_MODE_EVENT = "TOGGLE_MODE_EVENT";
	var _showSearchBox = false;
	var _editingTitle = false;
	var _creating = 'new';
	var _enlargedImgUrl = null;
	// var _mode = 'view';

	// var toggleMode = function (mode) {
	// 	_mode = mode;
	// };

	var toggleEditing = function (editing) {
		_editingTitle = editing;
	};

	var toggleCreating = function (creating) {
		_creating = creating;
	};

	var setEnlargeImg = function (imgUrl) {
		_enlargedImgUrl = imgUrl;
	};

	root.TogglerStore = $.extend({}, EventEmitter.prototype, {
		showSearchBox: function () {
			return _showSearchBox;
		},

		isEditing: function () {
			return _editingTitle;
		},

		creatingState: function () {
			return _creating;
		},

		enlargeImgUrl: function () {
			return _enlargedImgUrl;
		},

		addToggleSearchListener: function (callback) {
			this.on(TOGGLE_SEARCH_EVENT, callback);
		},

		removeToggleSearchListener: function (callback) {
			this.removeListener(TOGGLE_SEARCH_EVENT, callback);
		},

		addToggleEditingListener: function (callback) {
			this.on(TOGGLE_EDITING_EVENT, callback);
		},

		removeToggleEditingListener: function (callback) {
			this.removeListener(TOGGLE_EDITING_EVENT, callback);
		},

		addToggleCreatingListener: function (callback) {
			this.on(TOGGLE_CREATING_EVENT, callback);
		},

		removeToggleCreatingListener: function (callback) {
			this.removeListener(TOGGLE_CREATING_EVENT, callback);
		},

		addTogglePictureListener: function (callback) {
			this.on(PICTURE_TOGGLE_EVENT, callback);
		},

		removeTogglePictureListener: function (callback) {
			this.removeListener(PICTURE_TOGGLE_EVENT, callback);
		},

		// addToggleModeListener: function (callback) {
		// 	this.on(TOGGLE_MODE_EVENT, callback);
		// },

		// removeToggleModeListener: function (callback) {
		// 	this.removeListener(TOGGLE_MODE_EVENT, callback);
		// },

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				case APP_CONSTANTS.TOGGLE_SEARCH:
					_showSearchBox = !payload.showSearchBox;
					TogglerStore.emit(TOGGLE_SEARCH_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_EDITING:
					toggleEditing(payload.editing);
					TogglerStore.emit(TOGGLE_EDITING_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_CREATING:
					toggleCreating(payload.creating);
					TogglerStore.emit(TOGGLE_CREATING_EVENT);
					break;
				case APP_CONSTANTS.PICTURE_ENLARGED:
					setEnlargeImg(payload.pictureUrl);
					TogglerStore.emit(PICTURE_TOGGLE_EVENT);
				// case APP_CONSTANTS.TOGGLE_MODE:
				// 	toggleMode(payload.mode);
				// 	AlbumStore.emit(TOGGLE_MODE_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
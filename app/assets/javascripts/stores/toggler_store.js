(function(root){
	var TOGGLE_SEARCH_EVENT = "TOGGLE_SEARCH_EVENT";
	var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var TOGGLE_CREATING_EVENT = "TOGGLE_CREATING_EVENT";
	var SLIDE_PANEL_EVENT = "SLIDE_PANEL_EVENT";
	var TOGGLE_OVERLAY_EVENT = "TOGGLE_OVERLAY_EVENT";
	var DROP_TO_ALBUM_EVENT = "DROP_TO_ALBUM_EVENT";
	// var TOGGLE_MODE_EVENT = "TOGGLE_MODE_EVENT";
	// var _showSearchBox = false;
	var _editingTitle = false;
	var _creating = 'new';
	var _isPanelShown = false;
	var _isOverlayShown = false;
	var _droppinToAlbumId = null;
	// var _mode = 'view';

	// var toggleMode = function (mode) {
	// 	_mode = mode;
	// };

	var toggleAlbumDropEffect = function (albumId) {
		_droppinToAlbumId = albumId;
	};

	var toggleEditing = function (editing) {
		_editingTitle = editing;
	};

	var toggleCreating = function (creating) {
		_creating = creating;
	};

	var toggleSlide = function (show) {
		if (typeof show !== 'undefined') {
			_isPanelShown = show;
			_isOverlayShown = show;
		} else {
			_isPanelShown = !_isPanelShown;
			_isOverlayShown = _isPanelShown;
		}
	};

	root.TogglerStore = $.extend({}, EventEmitter.prototype, {
		// showSearchBox: function () {
		// 	return _showSearchBox;
		// },

		isPanelShown: function () {
			return _isPanelShown;
		},

		isEditing: function () {
			return _editingTitle;
		},

		creatingState: function () {
			return _creating;
		},

		showOverlay: function () {
			return _isOverlayShown;
		},

		droppinToAlbumId: function () {
			return _droppinToAlbumId;
		},

		// addToggleSearchListener: function (callback) {
		// 	this.on(TOGGLE_SEARCH_EVENT, callback);
		// },

		// removeToggleSearchListener: function (callback) {
		// 	this.removeListener(TOGGLE_SEARCH_EVENT, callback);
		// },

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

		addToggleIndexPanelListener: function (callback) {
			this.on(SLIDE_PANEL_EVENT, callback);
		},

		removeToggleIndexPanelListener: function (callback) {
			this.removeListener(SLIDE_PANEL_EVENT, callback);
		},

		addToggleOverlayListener: function (callback) {
			this.on(TOGGLE_OVERLAY_EVENT, callback);
		},

		removeToggleOverlayListener: function (callback) {
			this.removeListener(TOGGLE_OVERLAY_EVENT, callback);
		},

		addToggleAlbumDropListener: function (callback) {
			this.on(DROP_TO_ALBUM_EVENT, callback);
		},

		removeToggleAlbumDropListener: function (callback) {
			this.removeListener(DROP_TO_ALBUM_EVENT, callback);
		},

		// addToggleModeListener: function (callback) {
		// 	this.on(TOGGLE_MODE_EVENT, callback);
		// },

		// removeToggleModeListener: function (callback) {
		// 	this.removeListener(TOGGLE_MODE_EVENT, callback);
		// },

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
				// case APP_CONSTANTS.TOGGLE_SEARCH:
				// 	_showSearchBox = !payload.showSearchBox;
				// 	TogglerStore.emit(TOGGLE_SEARCH_EVENT);
				// 	break;
				case APP_CONSTANTS.TOGGLE_EDITING:
					toggleEditing(payload.editing);
					TogglerStore.emit(TOGGLE_EDITING_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_CREATING:
					toggleCreating(payload.creating);
					TogglerStore.emit(TOGGLE_CREATING_EVENT);
					break;
				case APP_CONSTANTS.SLIDE_PANEL:
					toggleSlide(payload.show);
					TogglerStore.emit(SLIDE_PANEL_EVENT);
					break;
				case APP_CONSTANTS.DROP_TO_ALBUM:
					toggleAlbumDropEffect(payload.albumId);
					TogglerStore.emit(DROP_TO_ALBUM_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
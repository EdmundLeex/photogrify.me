(function(root){
	var TOGGLE_SEARCH_EVENT = "TOGGLE_SEARCH_EVENT";
	var TOGGLE_EDITING_EVENT = "TOGGLE_EDITING_EVENT";
	var TOGGLE_CREATING_EVENT = "TOGGLE_CREATING_EVENT";
	var SLIDE_PANEL_EVENT = "SLIDE_PANEL_EVENT";
	var TOGGLE_OVERLAY_EVENT = "TOGGLE_OVERLAY_EVENT";
	var DROP_TO_ALBUM_EVENT = "DROP_TO_ALBUM_EVENT";
	var SHOW_CONFIRMATION_EVENT = "SHOW_CONFIRMATION_EVENT";
	var HIDE_CONFIRMATION_EVENT = "HIDE_CONFIRMATION_EVENT";
	var TOGGLE_PIC_LIST_EVENT = "TOGGLE_PIC_LIST_EVENT";
	var SWITCH_TAB_EVENT = "SWITCH_TAB_EVENT";
	var PROMPT_TIP_EVENT = "PROMPT_TIP_EVENT";

	var _editingTitle = false;
	var _creating = 'new';
	var _isPanelShown = true;
	var _isOverlayShown = false;
	var _isDragging = false;
	var _confModalOpts = {};
	var _isPicListShown = true;
	var _tabSelected = "album";
	var _currentTip = null;
	var _tips = {
		dragAndDrop: false
	};

	var promptTip = function (tip) {
		if (_tips[tip] === false) {
			_currentTip = tip;
			_tips[tip] = true;
		} else {
			_currentTip = null;
		}
	};

	var toggleDragging = function (isDragging) {
		_isDragging = isDragging;
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

	var showConfModal = function (isShown, callback, model, msg, path) {
		_confModalOpts.isShown = isShown;
		if (isShown) {
			_confModalOpts.callback = callback;
			_confModalOpts.model = model.toUpperCase();
			_confModalOpts.msg = msg;
			_confModalOpts.path = path || "albums/" + AlbumStore.all()[0].id;
		}
	};

	var togglePicList = function () {
		_isPicListShown = !_isPicListShown;
	};

	var switchTab = function (tab) {
		_tabSelected = tab;
	};

	root.TogglerStore = $.extend({}, EventEmitter.prototype, {
		currentTip: function () {
			return _currentTip;
		},

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

		isDragging: function () {
			return _isDragging;
		},

		confModalOpts: function () {
			return _confModalOpts;
		},

		isPicListShown: function () {
			return _isPicListShown;
		},

		tabSelected: function () {
			return _tabSelected;
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

		addShowConfModalListener: function (callback) {
			this.on(SHOW_CONFIRMATION_EVENT, callback);
		},

		removeShowConfModalListener: function (callback) {
			this.removeListener(SHOW_CONFIRMATION_EVENT, callback);
		},

		addTogglePicListListener: function (callback) {
			this.on(TOGGLE_PIC_LIST_EVENT, callback);
		},

		removeTogglePicListListener: function (callback) {
			this.removeListener(TOGGLE_PIC_LIST_EVENT, callback);
		},

		addSwitchListener: function (callback) {
			this.on(SWITCH_TAB_EVENT, callback);
		},

		removeSwitchListener: function (callback) {
			this.removeListener(SWITCH_TAB_EVENT, callback);
		},

		addPromptTipListener: function (callback) {
			this.on(PROMPT_TIP_EVENT, callback);
		},

		removePromptTipListener: function (callback) {
			this.removeListener(PROMPT_TIP_EVENT, callback);
		},

		dispatchId: AppDispatcher.register(function (payload) {
			switch (payload.actionType) {
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
				case APP_CONSTANTS.IS_DRAGGING:
					toggleDragging(payload.isDragging);
					TogglerStore.emit(DROP_TO_ALBUM_EVENT);
					break;
				case APP_CONSTANTS.SHOW_CONFIRMATION:
					showConfModal(
						payload.show,
						payload.callback,
						payload.model,
						payload.msg,
						payload.path
					);
					TogglerStore.emit(SHOW_CONFIRMATION_EVENT);
					break;
				case APP_CONSTANTS.TOGGLE_PIC_LIST:
					togglePicList();
					TogglerStore.emit(TOGGLE_PIC_LIST_EVENT);
					break;
				case APP_CONSTANTS.SWITCH_TAB:
					switchTab(payload.tab);
					TogglerStore.emit(SWITCH_TAB_EVENT);
					break;
				case APP_CONSTANTS.PROMPT_TIP:
				debugger
					promptTip(payload.tip);
					TogglerStore.emit(PROMPT_TIP_EVENT);
					break;
				default:
					break;
			}
		})
	});
})(this);
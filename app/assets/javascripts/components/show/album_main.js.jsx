var AlbumsMain = React.createClass({
	mixins: [ReactRouter.History],

	getInitialState: function () {
		return {
			albums: AlbumStore.all(),
			isPanelShown: TogglerStore.isPanelShown(),
			isDragging: false,
			isConfModalShown: false
		};
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		AlbumStore.addSearchAlbumListener(this._onSearch);
		// AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onChange);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
		TogglerStore.addToggleAlbumDropListener(this._onDragging);
		TogglerStore.addShowConfModalListener(this._onShowConfModal);
		ApiUtil.fetchAllAlbums(true);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		AlbumStore.removeSearchAlbumListener(this._onSearch);
		// AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onChange);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
		TogglerStore.removeToggleAlbumDropListener(this._onDragging);
		TogglerStore.removeShowConfModalListener(this._onShowConfModal);
	},

	_onDragging: function () {
		this.setState({isDragging: TogglerStore.isDragging()});
	},

	_onChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	_onSearch: function () {
		this.setState({ albums: AlbumStore.matchedAlbums() });
	},

	_onSlide: function () {
		this.setState({ isPanelShown: TogglerStore.isPanelShown() });
	},

	_onShowConfModal: function () {
		this.setState({ isConfModalShown: true });
	},

	// _onSwitch: function () {
	// 	this.setState({ currentAlbum: AlbumStore.currentAlbum() });
	// },

	render: function () {
		var albumShow,
				album,
				indexKlass = "",
				klass = "",
				confModal;

		// if (this.state.isPanelShown) { klass = "shrank"; }
		if (this.state.albums.length && !this.props.params.albumId) {
			album = this.state.albums[0];
			albumShow = <AlbumShow params={{albumId: album.id}} />
		} else {
			albumShow = <div></div>
		}

		if (!this.state.isPanelShown) { indexKlass = "slide-out"; }

		// if (this.state.isConfModalShown) {
			confModal = <Confirmation callback={TogglerStore.confModalOpts.callback}
																model={TogglerStore.confModalOpts.model}
																msg={TogglerStore.confModalOpts.msg}
																path={TogglerStore.confModalOpts.path} />
		// } else {
		// 	confModal = <div></div>
		// }

		return (
			<div className="album-show-main">
				{confModal}
				<AlbumsIndexContainer albums={this.state.albums}
															history={this.history}
															klass={indexKlass}
															params={this.props.params}
															isDragging={this.state.isDragging} />
				{albumShow}
				{this.props.children}
			</div>
		);
	}
});
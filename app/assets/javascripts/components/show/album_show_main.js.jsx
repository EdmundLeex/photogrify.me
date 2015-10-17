var AlbumsMain = React.createClass({
	mixins: [ReactRouter.History],

	getInitialState: function () {
		return { albums: AlbumStore.all() };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		// AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onChange);
		ApiUtil.fetchAllAlbums(true);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		// AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	// _onSwitch: function () {
	// 	this.setState({ currentAlbum: AlbumStore.currentAlbum() });
	// },

	render: function () {
		var currentAlbumId = (this.state.currentAlbum) ?
													this.state.currentAlbum.id : 0;
		return (
			<div className="album-show-main">
				<AlbumsIndexContainer albums={this.state.albums}
															history={this.history}
															params={this.props.params} />
				{this.props.children}
			</div>
		);
	}
});
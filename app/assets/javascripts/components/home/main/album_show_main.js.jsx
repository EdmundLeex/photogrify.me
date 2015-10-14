var AlbumShowMain = React.createClass({
	getInitialState: function () {
		return { albums: AlbumStore.all(), currentAlbumId: null };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		ApiUtil.fetchAllAlbums(true);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
	},

	_onChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	_onSwitch: function () {
		this.setState({ currentAlbumId: AlbumStore.currentAlbumId() });
	},

	render: function () {
		return (
			<div className="album-show-main">
				<AlbumsIndexContainer currentAlbumId={this.state.currentAlbumId}
															albums={this.state.albums}/>
				<AlbumShow />
			</div>
		);
	}
});
var AlbumsIndex = React.createClass({
	getInitialState: function () {
		return { albums: AlbumStore.all(), currentAlbumId: null };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
	},

	_onChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	_onSwitch: function () {
		console.log(AlbumStore.currentAlbumId());
		this.setState({ currentAlbumId: AlbumStore.currentAlbumId() });
	},

	// handleClick: function (e) {
	// 	ComponentActions.switchAlbum(e.target.dataset.albumId);
	// 	// ApiActions.receivePicturesFromOneAlbum(e.target.dataset.albumId);
	// },

	render: function () {
		var klass,
				currentAlbumId = this.state.currentAlbumId;
		return (
			<ul className="albums-index">
				{this.state.albums.map(function (album) {
					klass = (album.id === currentAlbumId) ? "selected" : "";
					return <AlbumIndexItem key={album.id} album={album} klass={klass} />
				})}
			</ul>
		);
	}
});


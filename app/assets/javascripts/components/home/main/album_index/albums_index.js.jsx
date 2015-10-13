var AlbumsIndex = React.createClass({
	getInitialState: function () {
		return { albums: AlbumStore.all(), current_album_id: null };
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

	handleClick: function (e) {
		ApiActions.receivePicturesFromOneAlbum(e.target.dataset.albumId);
	},

	render: function () {
		return (
			<ul className="albums-index" onClick={this.handleClick}>
				{this.state.albums.map(function (album) {
					return <AlbumIndexItem key={album.id} album={album} />
				})}
			</ul>
		);
	}
});


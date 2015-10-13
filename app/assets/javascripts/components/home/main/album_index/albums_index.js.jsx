var AlbumsIndex = React.createClass({
	getInitialState: function () {
		return { albums: AlbumStore.all() };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	render: function () {
		return (
			<ul className="albums-index-list">
				{this.state.albums.map(function (album) {
					return <AlbumIndexItem key={album.id} album={album} />
				})}
			</ul>
		);
	}
});

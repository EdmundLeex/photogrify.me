var AlbumsIndex = React.createClass({
	render: function () {
		var klass,
				currentAlbumId = this.props.currentAlbumId;
		return (
			<ul className="albums-index">
				{this.props.albums.map(function (album) {
					klass = (album.id === currentAlbumId) ? "selected" : "";
					return <AlbumIndexItem key={album.id} album={album} klass={klass} />
				})}
			</ul>
		);
	}
});


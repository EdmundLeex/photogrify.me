var AlbumsIndex = React.createClass({

	render: function () {
		var params = this.props.params;
		var history = this.props.history;

		return (
			<div className="albums-index">
				{this.props.albums.map(function (album) {
					return <AlbumIndexItem key={album.id}
																 album={album}
																 params={params}
																 history={history}
																 isDragging={this.props.isDragging} />
				}, this)}
			</div>
		);
	}
});


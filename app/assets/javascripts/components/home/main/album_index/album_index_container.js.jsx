var AlbumsIndexContainer = React.createClass({
	render: function () {
		return (
			<div className="albums-index-container">
				<div className="albums-index-title">Albums</div>
				<AlbumsIndex currentAlbumId={this.props.currentAlbumId}
										 albums={this.props.albums}/>
			</div>
		);
	}
});
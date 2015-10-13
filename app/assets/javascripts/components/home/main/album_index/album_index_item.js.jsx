var AlbumIndexItem = React.createClass({
	render: function () {
		return (
			<li className="album-index-item" data-album-id={this.props.album.id}>
				{this.props.album.title}
			</li>
		);
	}
});
var AlbumIndexItem = React.createClass({
	render: function () {
		return (
			<li className="album-index-item">
				{this.props.album.title}
			</li>
		);
	}
});
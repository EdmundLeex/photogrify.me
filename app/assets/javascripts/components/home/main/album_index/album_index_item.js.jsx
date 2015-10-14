var AlbumIndexItem = React.createClass({
	render: function () {
		var klass = this.props.klass;
		return (
			<li className={"album-index-item " + klass}
					onClick={this.handleClick}>
				{this.props.album.title}
			</li>
		);
	},

	handleClick: function (e) {
		var albumId = this.props.album.id;
		ComponentActions.switchAlbum(albumId);
		ApiUtil.fetchPicturesFromAlbum(albumId);
	}
});
var AlbumIndexItem = React.createClass({
	// add selected class
	render: function () {
		var klass = this.props.klass;
		return (
			<div className={"album-index-item " + klass}
					onClick={this.handleClick}>
				{this.props.album.title}
			</div>
		);
	},

	handleClick: function (e) {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/show');
		// var albumId = this.props.album.id;
		// ComponentActions.switchAlbum(albumId);
		// ComponentActions.toggleMode('view');
		ApiUtil.fetchPicturesFromAlbum(this.props.album.id);
	}
});
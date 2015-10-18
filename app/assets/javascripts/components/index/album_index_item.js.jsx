var AlbumIndexItem = React.createClass({
	// add selected class
	render: function () {
		var props = this.props;
		var klass = (parseInt(props.params.albumId) === props.album.id) ?
			"selected" : "";

		try {
			var url = APP_CONFIG.ImageUrlBySize(
				props.album.cover_picture_url,
				APP_CONFIG.INDEX_COVER_SIZE
			);
			var divStyle = {backgroundImage: 'url(' + url + ')'};
		} catch(e) {
			console.log(e);
		}

		return (
			<div className="album-index-item-container"
					 style={divStyle} >
				<div className={"album-index-item " + klass}
						onClick={this.handleClick}>
					{props.album.title}
				</div>
			</div>
		);
	},

	handleClick: function (e) {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/show');
		// var albumId = this.props.album.id;
		// ComponentActions.switchAlbum(albumId);
		// ComponentActions.toggleMode('view');
		// ApiUtil.fetchPicturesFromAlbum(this.props.album.id);
	}
});
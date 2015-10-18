var AlbumIndexItem = React.createClass({
	// add selected class
	render: function () {
		var props = this.props;
		var klass = (parseInt(props.params.albumId) === props.album.id) ?
			"selected" : "";
		var divStyle = {backgroundImage: 'url(' + props.album.cover_picture_url + ')'}
		try{
			return (
				<div className="album-index-item-container"
						 style={divStyle} >
					<div className={"album-index-item " + klass}
							onClick={this.handleClick}>
						{props.album.title}
					</div>
				</div>
			);
		}catch(e){
			console.log(e);
		}
	},

	handleClick: function (e) {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/show');
		// var albumId = this.props.album.id;
		// ComponentActions.switchAlbum(albumId);
		// ComponentActions.toggleMode('view');
		ApiUtil.fetchPicturesFromAlbum(this.props.album.id);
	}
});
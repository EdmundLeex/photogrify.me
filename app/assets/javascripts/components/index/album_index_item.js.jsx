var AlbumIndexItem = React.createClass({
	handleClick: function (e) {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/show');
		// var albumId = this.props.album.id;
		// ComponentActions.switchAlbum(albumId);
		// ComponentActions.toggleMode('view');
		// ApiUtil.fetchPicturesFromAlbum(this.props.album.id);
	},

	handleDragOver: function (e) {

		e.preventDefault();
		ComponentActions.dropToAlbum(e.currentTarget.dataset.albumId);
		// e.currentTarget.classList.add("drop-zone");
		// e.currentTarget.firstChild.classList.remove("hidden");
	},

	handleDragLeave: function (e) {
		e.preventDefault();
		ComponentActions.dropToAlbum(null);
		// e.currentTarget.classList.remove("drop-zone");
		// e.currentTarget.firstChild.classList.add("hidden");
	},

	handleDrop: function (e) {
		e.preventDefault();
		if (parseInt(this.props.params.albumId) !== this.props.album.id) {
			var imgId = e.dataTransfer.getData(APP_CONSTANTS.DRAGGING_IMG);
			ApiUtil.transferImg(imgId, this.props.album.id);
		}
		// console.log("dragged: " + imgId);
	},

	render: function () {
		var props = this.props;
		var selectedKlass = (parseInt(props.params.albumId) === props.album.id) ?
			"selected" : "";
		var droppZoneKlass = (this.props.isDroppingTo) ? "drop-zone" : "";
		var dropContentKlass = (this.props.isDroppingTo) ? "" : "hidden";

		try {
			var url = APP_CONFIG.ImageUrlByOptions(
				props.album.cover_picture_url,
				APP_CONFIG.INDEX_COVER_SIZE
			);
			var divStyle = {backgroundImage: 'url(' + url + ')'};
		} catch(e) {
			console.log(e);
		}

		return (
			<div className={"album-index-item-container " + droppZoneKlass}
					 data-album-id={this.props.album.id}
					 onDragEnter={this.handleDragOver}
					 style={divStyle} >
				<div className={"album-index-item " + selectedKlass}
						onClick={this.handleClick}>
					{props.album.title}
				</div>
				<div className={"drop-window-content " + dropContentKlass}
						 onDragLeave={this.handleDragLeave}
						 onDrop={this.handleDrop}>
					Drag picture here
				</div>
			</div>
		);
	}
});
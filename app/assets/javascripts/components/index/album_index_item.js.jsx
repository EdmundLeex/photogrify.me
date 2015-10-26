var AlbumIndexItem = React.createClass({
	handleClick: function (e) {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/show');
	},

	handleDragOver: function (e) {
		e.preventDefault();
	},

	handleDrop: function (e) {
		e.preventDefault();
		if (parseInt(this.props.params.albumId) !== this.props.album.id) {
			var imgId = e.dataTransfer.getData(APP_CONSTANTS.DRAGGING_IMG);
			ApiUtil.transferImg(imgId, this.props.album.id);
		}
	},

	render: function () {
		var props = this.props;
		var selectedKlass = (parseInt(props.params.albumId) === props.album.id) ?
			"selected" : "";
		var dropContentKlass = (this.props.isDragging) ? "" : "hidden";

		try {
			var url = APP_CONFIG.ImageUrlByOptions(
				props.album.cover_picture_url,
				APP_CONFIG.INDEX_COVER_SIZE
			);
			var divStyle = {backgroundImage: 'url(' + url + ')'};
		} catch(e) {
			// no op
		}

		return (
			<div className={"album-index-item-container " + selectedKlass}
					 data-album-id={this.props.album.id}
					 onDragOver={this.handleDragOver}
					 style={divStyle} >
				<div className={"album-index-item " + selectedKlass}
						 onClick={this.handleClick} onDragOver={this.handleDragOver}>
					{props.album.title}
				</div>
				<div className={"drop-window-content " + dropContentKlass}
						 onDragOver={this.handleDragOver}
						 onDrop={this.handleDrop}>
					Drop your picture here
				</div>
			</div>
		);
	}
});

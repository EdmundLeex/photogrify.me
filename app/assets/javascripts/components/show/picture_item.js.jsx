var PictureItem = React.createClass({
	handleClick: function (e) {
		this.props.handleClick(this.props.picture);
	},

	handleClickDelete: function (e) {
		ApiUtil.deletePicture(this.props.picture.id)
	},

	handleDragStart: function (e) {
		e.dataTransfer.setData(APP_CONSTANTS.DRAGGING_IMG, this.props.picture.id);
	},

	handleDragEnd: function (e) {
		e.preventDefault();
		// var imgId = e.dataTransfer.getData(APP_CONSTANTS.DRAGGING_IMG);
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlByOptions(
			this.props.picture.picture_url,
			APP_CONFIG.THUMBNAIL_SIZE
		);

		return (
			<div className="img-thumb"
					 draggable="true"
					 onDragStart={this.handleDragStart}
					 onDragEnd={this.handleDragEnd}>
				<img src={url} onClick={this.handleClick} />
				<div className="thumb-tools">
					<span className="thumb-delete glyphicon glyphicon-trash"
								onClick={this.handleClickDelete}></span>
				</div>
			</div>
		);
	}
});

var PictureItem = React.createClass({
	handleClick: function (e) {
		this.props.handleClick(this.props.picture);
	},

	handleClickDelete: function (e) {
		ComponentActions.showConfirmation(
			true,
			ApiUtil.deletePicture.bind(null, this.props.picture.id),
			"picture",
			"this picture",
			null
		);
	},

	handleDragStart: function (e) {
		e.dataTransfer.setData(APP_CONSTANTS.DRAGGING_IMG, this.props.picture.id);
		e.currentTarget.style.opacity = "0.2";
		ComponentActions.isDroppingToAlbum(true);
		ComponentActions.slideOut(true);
	},

	handleDragEnd: function (e) {
		e.currentTarget.style.opacity = "1";
		ComponentActions.isDroppingToAlbum(false);
		ComponentActions.slideOut(false);
	},

	handleMouseOver: function (e) {
		this.props.handleHover(this.props.picture);
	},

	handleMouseLeave: function (e) {
		this.props.handleMouseLeave();
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlByOptions(
			this.props.picture.picture_url,
			APP_CONFIG.THUMBNAIL_SIZE
		);

		return (
			<div className={"img-thumb " + this.props.klass}
					 draggable="true"
					 onDragStart={this.handleDragStart}
					 onDragEnd={this.handleDragEnd}
					 onMouseOver={this.handleMouseOver}
					 onMouseLeave={this.handleMouseLeave} >
				<img src={url} onClick={this.handleClick} />
				{(this.props.isDeletable) ?
					<div className="thumb-tools">
						<span className="thumb-delete glyphicon glyphicon-trash"
									onClick={this.handleClickDelete}></span>
					</div> : <div></div>
				}
			</div>
		);
	}
});

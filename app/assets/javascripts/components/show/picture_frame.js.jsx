var PictureFrame = React.createClass({
	handleClickLeft: function () {
		this.props.handleClickLeft();
	},

	handleClickRight: function () {
		this.props.handleClickRight();
	},

	handleClick: function () {
		// this.props.handleClick(null);
	},

	handleClickClose: function () {
		this.props.handleClick(null);
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlByOptions(
			this.props.picture.picture_url,
			APP_CONFIG.FRAME_SIZE
		);

		return (
			<div className="img-frame-overlay">
				<div className="img-frame" onClick={this.handleClick}>
					<div className="glyphicon glyphicon-menu-left slideshow-arrow"
								onClick={this.handleClickLeft}></div>
					<div className="glyphicon glyphicon-remove slideshow-close"
								onClick={this.handleClickClose}></div>
					<img src={url}/>
					<div className="glyphicon glyphicon-menu-right slideshow-arrow"
								onClick={this.handleClickRight}></div>
				</div>
			</div>
		);
	}
});
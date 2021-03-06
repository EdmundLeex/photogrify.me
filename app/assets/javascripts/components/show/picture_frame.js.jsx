var PictureFrame = React.createClass({
	handleClickLeft: function () {
		this.props.handleClickLeft();
	},

	handleClickRight: function () {
		this.props.handleClickRight();
	},

	handleClick: function () {
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
				<div className="slideshow-close"
							onClick={this.handleClickClose}>
					<span className="glyphicon glyphicon-remove"></span>
				</div>
				<div className="img-frame" onClick={this.handleClick}>
					<div className="slideshow-arrow left-arrow"
								onClick={this.handleClickLeft}>
						<span className="glyphicon glyphicon-menu-left"></span>
					</div>
					<img src={url}/>
					<div className="slideshow-arrow right-arrow"
								onClick={this.handleClickRight}>
						<span className="glyphicon glyphicon-menu-right"></span>
					</div>
				</div>
			</div>
		);
	}
});
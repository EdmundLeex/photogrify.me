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
					<span className="glyphicon glyphicon-menu-left"
								onClick={this.handleClickLeft}></span>
					<span className="glyphicon glyphicon-remove"
								onClick={this.handleClickClose}></span>
					<img src={url}/>
					<span className="glyphicon glyphicon-menu-right"
								onClick={this.handleClickRight}></span>
				</div>
			</div>
		);
	}
});
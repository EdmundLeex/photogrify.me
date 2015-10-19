var PictureFrame = React.createClass({
	handleClick: function () {
		this.props.handleClick(null);
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlBySize(
			this.props.picture.picture_url,
			APP_CONFIG.FRAME_SIZE
		);

		return (
			<div className="img-frame-overlay">
				<div className="img-frame" onClick={this.handleClick}>
					<img src={url}/>
					<span></span>
				</div>
			</div>
		);
	}
});
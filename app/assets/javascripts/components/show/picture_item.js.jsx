var PictureItem = React.createClass({
	handleClick: function (e) {
		this.props.handleClick(this.props.picture.picture_url);
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlBySize(
			this.props.picture.picture_url,
			APP_CONFIG.THUMBNAIL_SIZE
		);

		return (
			<div className="img-thumb" onClick={this.handleClick}>
				<img src={url}/>
				<span></span>
			</div>
		);
	}
});

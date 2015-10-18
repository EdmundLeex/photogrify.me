var PictureItem = React.createClass({
	render: function () {
		var url = APP_CONFIG.ImageUrlBySize(
			this.props.picture.picture_url,
			APP_CONFIG.THUMBNAIL_SIZE
		);

		return (
			<div className="img-thumb">
				<img src={url}/>
				<span></span>
			</div>
		);
	}
});

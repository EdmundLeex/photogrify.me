var PictureItem = React.createClass({
	render: function () {
		var url = this.props.picture.picture_url.split('/');
		var insert_index = url.indexOf('upload') + 1;
		url.splice(insert_index, 0, APP_CONFIG.THUMBNAIL_SIZE)
		url = url.join('/');

		return (
			<div className="thumbnail">
				<img src={url}/>
				<span></span>
			</div>
		);
	}
});

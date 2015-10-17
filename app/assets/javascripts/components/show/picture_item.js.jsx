var PictureItem = React.createClass({
	render: function () {
		return (
			<div>
				<img src={this.props.picture.picture_url}
						 className="img-thumb"/>
				<span></span>
			</div>
		);
	}
});

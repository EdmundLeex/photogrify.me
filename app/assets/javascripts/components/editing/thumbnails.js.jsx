var ThumbNails = React.createClass({
	componentWillReceiveProps: function (nextProps) {
		console.log('new props');
		console.log(nextProps);
	},

	onImgClick: function () {
		// no op
	},

	render: function () {
		// img-thumb children
		console.log(this.props.pictures);
		return (
			<div className="album-thumbnails">
				<PicturesCollection history={this.props.history}
														pictures={this.props.pictures}
														handleClick={this.onImgClick}  />
			</div>
		);
	}
});
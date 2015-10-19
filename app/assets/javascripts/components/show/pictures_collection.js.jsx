var PicturesCollection = React.createClass({
	onImgClick: function (pictureUrl) {
		this.props.handleClick(pictureUrl);
	},

	render: function () {
		var that = this;
		return (
			<div className="pictures-collection clearfix">
				{this.props.pictures.map(function (pic) {
					return <PictureItem key={pic.id} picture={pic} handleClick={that.onImgClick} />
				})}
			</div>
		);
	}
});
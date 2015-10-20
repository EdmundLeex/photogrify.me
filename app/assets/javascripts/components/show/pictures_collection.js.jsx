var PicturesCollection = React.createClass({
	onImgClick: function (picture) {
		this.props.handleClick(picture);
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
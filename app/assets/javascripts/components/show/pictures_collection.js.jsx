var PicturesCollection = React.createClass({
	onImgClick: function (picture) {
		this.props.handleClick(picture);
	},

	render: function () {
		return (
			<div className="pictures-collection clearfix">
				{this.props.pictures.map(function (pic) {
					return <PictureItem key={pic.id}
															picture={pic}
															handleClick={this.onImgClick}
															isDeletable={this.props.isDeletable} />
				}, this)}
			</div>
		);
	}
});
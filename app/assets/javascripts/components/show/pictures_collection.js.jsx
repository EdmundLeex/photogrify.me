var PicturesCollection = React.createClass({
	onImgClick: function (picture) {
		this.props.handleClick(picture);
	},

	render: function () {
		var klass;
		var highlightPicture = this.props.highlightPicture;
		return (
			<div className="pictures-collection clearfix">
				{this.props.pictures.map(function (pic) {
					klass = (highlightPicture && pic.id === highlightPicture.id) ?
						"highlight" : "";
					return <PictureItem key={pic.id}
															picture={pic}
															handleClick={this.onImgClick}
															isDeletable={this.props.isDeletable}
															klass={klass} />
				}, this)}
			</div>
		);
	}
});
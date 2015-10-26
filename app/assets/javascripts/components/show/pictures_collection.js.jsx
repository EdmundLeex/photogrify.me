var PicturesCollection = React.createClass({
	onImgClick: function (picture) {
		this.props.handleClick(picture);
	},

	onImgHover: function (picture) {
		if (this.props.handleImgHover) {
			this.props.handleImgHover(picture);
		}
	},

	onImgUnhover: function () {
		if (this.props.handleImgUnhover) {
			this.props.handleImgUnhover();
		}
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
															handleHover={this.onImgHover}
															handleMouseLeave={this.onImgUnhover}
															isDeletable={this.props.isDeletable}
															klass={klass} />
				}, this)}
			</div>
		);
	}
});
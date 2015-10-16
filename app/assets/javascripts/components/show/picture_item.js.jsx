var PictureItem = React.createClass({
	render: function () {
		return (
			<div>
				<img src="" alt="and_this" className="img-thumb"/>
				<span>{this.props.picture.id}</span>
			</div>
		);
	}
});

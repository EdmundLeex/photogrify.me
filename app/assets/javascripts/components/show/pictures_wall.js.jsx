var PicturesWall = React.createClass({
	getInitialState: function () {
    return {pictures: []};
	},

	componentDidMount: function () {
		ApiUtil.fetchAllPictures();
		PictureStore.addAllPicturesChangedListener(this.onChange);
	},

	componentWillUnmount: function () {
		PictureStore.removeAllPicturesChangedListener(this.onChange);
	},

	onChange: function () {
		this.setState({pictures: PictureStore.all()});
	},

	render: function () {
		return (
			<div className="pictures-wall">
				<PicturesCollection pictures={this.state.pictures} />
			</div>
		);
	}
});
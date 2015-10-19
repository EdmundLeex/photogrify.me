var PicturesWall = React.createClass({
	getInitialState: function () {
    return {pictures: null};
	},

	componentDidMount: function () {
		ApiUtil.fetchAllPictures();
		PictureStore.addAllPicturesChangedListener(this.onChange);
	},

	componentWillMount: function () {
		PictureStore.removeAllPicturesChangedListener(this.onChange);
	},

	onChange: function () {
		this.setState({pictures: PictureStore.all()});
	},

	render: function () {
		return (
			<PicturesCollection />
		);
	}
});
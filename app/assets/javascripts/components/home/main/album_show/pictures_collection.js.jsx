var PicturesCollection = React.createClass({
	getInitialState: function () {
    return { pictures: PictureStore.all() };
	},

	componentDidMount: function () {
		PictureStore.addPicturesCollectionChangedListener(this._onChange);
	},

	componentWillUnmount: function () {
		PictureStore.removePicturesCollectionChangedListener(this._onChange);
	},

	_onChange: function () {
		this.setState({pictures: PictureStore.all()});
	},

	render: function () {
		return (
			<div>
				{this.state.pictures.map(function (pic) {
					return <PictureItem key={pic.id} picture={pic} />
				})}
			</div>
		);
	}
});
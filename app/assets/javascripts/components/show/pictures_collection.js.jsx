var PicturesCollection = React.createClass({
	// getInitialState: function () {
 //    return { pictures: [] };
	// },

	// componentDidMount: function () {
	// 	PictureStore.addPicturesCollectionChangedListener(this._onChange);
	// },

	// componentWillUnmount: function () {
	// 	PictureStore.removePicturesCollectionChangedListener(this._onChange);
	// },

	// _onChange: function () {
	// 	this.setState({pictures: PictureStore.all()});
	// },

	render: function () {
		return (
			<div className="pictures-collection clearfix">
				{this.props.pictures.map(function (pic) {
					return <PictureItem key={pic.id} picture={pic} />
				})}
			</div>
		);
	}
});
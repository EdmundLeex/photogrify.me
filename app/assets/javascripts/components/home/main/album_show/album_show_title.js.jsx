var AlbumShowTitle = React.createClass({
	getInitialState: function () {
    return {
    	title: null,
    	picCount: null
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	_onSwitch: function () {
		// change count, title
		var album = AlbumStore.currentAlbum();
		this.setState({title: album.title, picCount: PictureStore.count()});
	},

	render: function () {
		// pic counts
		// button group (edit, delete)
		// title
		console.log(this.state.picCount);
		return (
			<div className="album-show-title">
				<h1>{this.state.title}</h1>
				<span className="count">{this.state.picCount}</span>
			</div>
		);
	}
});
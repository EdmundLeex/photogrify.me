var AlbumShowTitle = React.createClass({
	getInitialState: function () {
    return {
    	id: null,
    	title: null,
    	picCount: null
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onSwitch: function () {
		// change count, title
		var album = AlbumStore.currentAlbum();
		this.setState({
			id: 			album.id,
			title: 	 	album.title,
			picCount: PictureStore.count()
		});
	},

	_onDelete: function () {
		console.log(this.state.id);
		ApiUtil.deleteAlbum(this.state.id);
	},

	_onEdit: function () {
		// body...
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
				<div className="title-btn-group">
					<div className="title-bar-btn" onClick={this._onEdit}>E</div>
					<div className="title-bar-btn" onClick={this._onDelete}>D</div>
				</div>
			</div>
		);
	}
});
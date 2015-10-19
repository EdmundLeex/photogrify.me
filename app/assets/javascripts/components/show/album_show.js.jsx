var AlbumShow = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
  	// var album = AlbumStore.find(this.props.params.albumId);
    return {
    	// albumId: null,
    	title: null,
    	pictures: []
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
		ApiUtil.fetchPicturesFromAlbum(this.props.params.albumId);
		// ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillReceiveProps: function (nextProps) {
		ApiUtil.fetchPicturesFromAlbum(nextProps.params.albumId);
	},

	_onTitleChanged: function () {
		this.setState({title: AlbumStore.find(this.props.params.albumId).title});
	},

	_onSwitch: function () {
		// change count, title
		var album = AlbumStore.find(this.props.params.albumId);
		this.setState({
			// id: 			album.id,
			title: 	 	album.title,
			// picCount: PictureStore.count(),
			pictures: PictureStore.all()
		});
	},

	onEditClick: function () {
		this.history.pushState(null, '/albums/' + this.props.params.albumId + '/edit');
	},

	onUploadClick: function () {
		var that = this;
		cloudinary.openUploadWidget(APP_CONFIG.CLOUDINARY_CONFIG,
			function (error, result) {
				console.log(error, result);
				if (typeof result !== 'undefined') {
					// var urls = result.map(function (img) {
					// 	return img.url;
					// });
					that.onDoneEditing(null, JSON.stringify(result));
				}
		});
	},

	onDeleteClick: function () {
		ApiUtil.deleteAlbum(this.props.params.albumId);
		this.history.pushState(null, '/');
	},

	onDoneEditing: function (title, imgUrls) {
		// var title = AlbumStore.find(this.props.params.albumId);
		ApiUtil.updateAlbum(this.props.params.albumId, title, null, imgUrls);
	},

	render: function () {
		return (
			<div className="album-show">
				<div className="album-show-container">
					<TitleBar mode={'edit'}
										title={this.state.title}
										onEditClick={this.onEditClick}
										onUploadClick={this.onUploadClick}
									  onDeleteClick={this.onDeleteClick}
									  onEditTitleFinish={this.onDoneEditing}
									  linkState={this.linkState} />
					<PicturesCollection history={this.history} pictures={this.state.pictures} />
				</div>
			</div>
		);
	}
});
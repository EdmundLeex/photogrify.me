var AlbumShow = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	title: null,
    	pictures: [],
    	enlargedImg: null
    };
	},

	componentDidMount: function () {
		ApiUtil.fetchPicturesFromAlbum(this.props.params.albumId);
		AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
		PictureStore.addTogglePictureListener(this._onEnlarge);
		// ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
		PictureStore.removeTogglePictureListener(this._onEnlarge);
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
		try{
			this.setState({
				title: 	 	album.title,
				pictures: PictureStore.all()
			});
		}catch(e){
			console.log(e);
		}
	},

	_onEnlarge: function () {
		this.setState({enlargedImg: PictureStore.enlargedImg()});
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

	onImgClick: function (picture) {
		ComponentActions.toggleImg(picture);
	},

	onLeftClick: function () {
		var nextImg = PictureStore.nextImg(-1);
		ComponentActions.toggleImg(nextImg);
	},

	onRightClick: function () {
		var nextImg = PictureStore.nextImg(1);
		ComponentActions.toggleImg(nextImg);
	},

	render: function () {
		var imgFrame = (this.state.enlargedImg) ?
			<PictureFrame picture={this.state.enlargedImg}
										handleClick={this.onImgClick}
										handleClickLeft={this.onLeftClick}
										handleClickRight={this.onRightClick} /> : "";
		return (
			<div className="album-show">
				<div className="album-show-container">
					{imgFrame}
					<TitleBar mode={'show'}
										title={this.state.title}
										onEditClick={this.onEditClick}
										onUploadClick={this.onUploadClick}
									  onDeleteClick={this.onDeleteClick}
									  onEditTitleFinish={this.onDoneEditing}
									  linkState={this.linkState} />
					<PicturesCollection history={this.history}
															pictures={this.state.pictures}
															handleClick={this.onImgClick}  />
				</div>
			</div>
		);
	}
});
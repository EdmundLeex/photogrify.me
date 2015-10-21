var AlbumShow = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	title: null,
    	pictures: [],
    	enlargedImg: null,
    	isExpanded: !TogglerStore.isPanelShown(),
    };
	},

	componentDidMount: function () {
		ApiUtil.fetchPicturesFromAlbum(this.props.params.albumId);
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		PictureStore.addPicturesCollectionChangedListener(this._onChange);
		PictureStore.addTogglePictureListener(this._onEnlarge);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
		// ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		PictureStore.removePicturesCollectionChangedListener(this._onChange);
		PictureStore.removeTogglePictureListener(this._onEnlarge);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
	},

	componentWillReceiveProps: function (nextProps) {
		ApiUtil.fetchPicturesFromAlbum(nextProps.params.albumId);
	},

	_onTitleChanged: function () {
		this.setState({title: AlbumStore.find(this.props.params.albumId).title});
	},

	_onChange: function () {
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
		this.setState({ enlargedImg: PictureStore.enlargedImg() });
	},

	_onSlide: function () {
		this.setState({ isExpanded: !TogglerStore.isPanelShown() });
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
		var expandKlass = "";
		if (!this.state.isExpanded) { expandKlass = " shrank"; }
		var album = AlbumStore.find(this.props.params.albumId);
		var cover_picture_url = album.cover_picture_url;

		return (
			<div className={"album-show " + this.props.klass + expandKlass}>
				<div className="album-show-container">
					{imgFrame}
					<TitleBar mode={'show'}
										title={this.state.title}
										cover_picture_url={cover_picture_url}
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
var AlbumShow = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	title: null,
    	pictures: [],
    	enlargedImg: null,
    	isExpanded: !TogglerStore.isPanelShown(),
    	isDragging: false
    };
	},

	componentDidMount: function () {
		ApiUtil.fetchPicturesFromAlbum(this.props.params.albumId);
		AlbumStore.addAlbumsIndexChangeListener(this._onChange);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		PictureStore.addPicturesCollectionChangedListener(this._onChange);
		PictureStore.addTogglePictureListener(this._onEnlarge);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
		TogglerStore.addToggleAlbumDropListener(this._onDragging);
		// ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		PictureStore.removePicturesCollectionChangedListener(this._onChange);
		PictureStore.removeTogglePictureListener(this._onEnlarge);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
		TogglerStore.removeToggleAlbumDropListener(this._onDragging);
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

	_onDragging: function () {
		this.setState({isDragging: TogglerStore.isDragging()});
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
		ComponentActions.showConfirmation(
			true,
			ApiUtil.deleteAlbum.bind(null, this.props.params.albumId),
			"album",
			this.state.title,
			'/'
		);
		// ApiUtil.deleteAlbum(this.props.params.albumId);
		// this.history.pushState(null, '/');
	},

	onDoneEditing: function (title, imgUrls) {
		// var title = AlbumStore.find(this.props.params.albumId);
		ApiUtil.updateAlbum(this.props.params.albumId, title, null, imgUrls);
	},

	onImgClick: function (picture) {
		ComponentActions.toggleImg(picture);
	},

	onLeftClick: function () {
		console.log('left');
		var nextImg = PictureStore.nextImg(-1);
		ComponentActions.toggleImg(nextImg);
	},

	onRightClick: function () {
		console.log('right');
		var nextImg = PictureStore.nextImg(1);
		ComponentActions.toggleImg(nextImg);
	},

	handleClick: function () {
		ComponentActions.slideOut(false);
	},

	render: function () {
		var album;
		var expandKlass = "";
		var cover_picture_url;
		var imgFrame = (this.state.enlargedImg) ?
			<PictureFrame picture={this.state.enlargedImg}
										handleClick={this.onImgClick}
										handleClickLeft={this.onLeftClick}
										handleClickRight={this.onRightClick} /> : "";
		if (!this.state.isExpanded) { expandKlass = " shrank"; }
		album = AlbumStore.find(this.props.params.albumId);
		if (album) { cover_picture_url = album.cover_picture_url; }

		return (
			<div className={"album-show " + this.props.klass + expandKlass}
					 onClick={this.handleClick}>
				<div className="album-show-container">
					{imgFrame}
					<TitleBar mode={'show'}
										title={this.state.title}
										cover_picture_url={cover_picture_url}
										onEditClick={this.onEditClick}
										onUploadClick={this.onUploadClick}
									  onDeleteClick={this.onDeleteClick}
									  onEditTitleFinish={this.onDoneEditing}
									  linkState={this.linkState}
									  isDragging={this.state.isDragging} />
					<PicturesCollection history={this.history}
															pictures={this.state.pictures}
															handleClick={this.onImgClick}  />
				</div>
			</div>
		);
	}
});
var Edit = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
		var albumId = this.props.params.albumId;
		var album = AlbumStore.find(albumId);
		var title = album.title;
		var description = album.description;

    return {
    	// albumId: albumId,
    	title: title,
    	description: description,
    	pictures: [],
    	picCount: null,
    	creatingState: null
    };
	},

	componentDidMount: function () {
		// AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		// PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		// AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		// PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onTitleChanged: function () {
		this.setState({title: AlbumStore.find(this.props.params.albumId).title});
	},

	_onAlbumCreated: function () {
		this.setState({
			albumId: AlbumStore.latestAlbum().id,
			title: AlbumStore.latestAlbum().title,
		});
	},

	onDeleteClick: function () {
		// prompt confirmation
		ApiUtil.deleteAlbum(this.props.params.albumId);
		this.history.pushState(null, '/');
	},

	onUploadClick: function () {
		var that = this;
		cloudinary.openUploadWidget(
			APP_CONFIG.CLOUDINARY_CONFIG,
			function (error, result) {
			console.log(error, result);
			if (typeof result !== 'undefined') {
				that.onDoneEditing({imgUrls: JSON.stringify(result)});
			}
		});
	},

	onCancelClick: function () {
		this.props.history.pushState(null, '/');
	},

	onSaveClick: function () {
		this.props.history.pushState(null, '/');
	},

	onDoneEditing: function (values) {
		var description,
				imgUrls;
		if (values) {
			description = values.description;
			imgUrls = values.imgUrls;
		}

		ApiUtil.updateAlbum(this.props.params.albumId, this.state.title, description, imgUrls);
	},


	render: function () {
		return (
			<div className="album-show">
				<div className="form-container">
					<TitleBar mode={'edit'}
										title={this.state.title}
										albumId={this.props.params.albumId}
										onEditClick={this.onEditClick}
									  onDeleteClick={this.onDeleteClick}
									  onSaveClick={this.onSaveClick}
									  onUploadClick={this.onUploadClick}
									  onCancelClick={this.onCancelClick}
									  onEditTitleFinish={this.onDoneEditing}
									  linkState={this.linkState} />
					<ThumbNails />
					<div id="editor">
						<QEditor albumId={this.props.params.albumId}
										 description={this.state.description}
										 linkState={this.linkState}
										 onDoneTyping={this.onDoneEditing} />
					</div>
				</div>
			</div>
		);
	}
});
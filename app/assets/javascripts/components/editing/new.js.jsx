var New = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	albumId: null,
    	title: null,
    	description: null,
    	pictures: [],
    	picCount: null,
    	mode: 'new',
    	creatingState: null
    };
	},

	componentDidMount: function () {
		// AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		TogglerStore.addToggleCreatingListener(this._onToggleCreating);
		// PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		// AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		TogglerStore.removeToggleCreatingListener(this._onToggleCreating);
		// PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onTitleChanged: function () {
		if (this.props.mode === 'new') {
			this.setState({title: ""});
		} else {
			this.setState({title: AlbumStore.latestAlbum().title});
		}
	},

	_onAlbumCreated: function () {
		this.setState({
			albumId: AlbumStore.latestAlbum().id,
			title: AlbumStore.latestAlbum().title,
			mode: 'edit',
			creatingState: 'created'
		});
	},

	_onSaved: function () {
		// render some effects
	},

	_onToggleCreating: function () {
		this.setState({creatingState: TogglerStore.creatingState()});
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

	onDoneEditing: function (values) {
		var description,
				imgUrls;
		if (values) {
			description = values.description;
			imgUrls = values.imgUrls;
		}

		if (this.state.mode === 'edit') {
			ApiUtil.updateAlbum(this.state.albumId, this.state.title, description, imgUrls);
		} else {
			console.log(this.state.creatingState);
			// debugger
			if (this.state.creatingState !== 'created' && this.state.creatingState !== 'creating') {
				if (this.state.title || description || imgUrls) {
					ComponentActions.toggleCreating('creating');

					ApiUtil.createAlbum({
						title: this.state.title,
						description: description,
						urls: imgUrls
					});
				}
			}
		}
	},

	render: function () {
		console.log('new rendered');
		// pass in options to show buttons
		return (
			<div className="album-new-main">
				<TitleBar mode={this.state.mode}
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
		);
	}
});
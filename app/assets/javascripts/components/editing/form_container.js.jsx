var FormContainer = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
		var albumId,
				title,
				album;
		if (this.props.mode === 'new') {
			albumId = null;
			title = "";
			description = "";
		} else {
			albumId = this.props.params.albumId;
			album = AlbumStore.find(albumId);
			title = album.title;
			description = album.description;
		}

    return {
    	albumId: albumId,
    	title: title,
    	description: description,
    	pictures: [],
    	picCount: null,
    	mode: this.props.mode,
    	creatingState: null
    };
	},

	componentDidMount: function () {
		// AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		AlbumStore.addToggleCreatingListener(this._onToggleCreating);
		// PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		// AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		AlbumStore.removeToggleCreatingListener(this._onToggleCreating);
		// PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onTitleChanged: function () {
		if (this.props.mode === 'new') {
			this.setState({title: AlbumStore.latestAlbum().title});
		} else {
			this.setState({title: AlbumStore.find(this.props.params.albumId).title});
		}
	},

	_onAlbumCreated: function () {
		this.setState({albumId: AlbumStore.latestAlbum().id,
									 title: AlbumStore.latestAlbum().title,
									 mode: 'edit',
									 creatingState: 'created'});
	},

	_onSaved: function () {
		// render some effects
	},

	_onToggleCreating: function () {
		this.setState({creatingState: 'creating'});
	},

	onEditClick: function () {
		this.history.pushState(null, '/albums/' + this.props.params.albumId + '/edit');
	},

	onDeleteClick: function () {
		ApiUtil.deleteAlbum(this.state.albumId);
		this.history.pushState(null, '/');
	},

	onSaveClick: function () {

	},

	onUploadClick: function () {
		var that = this;
		cloudinary.openUploadWidget({
			cloud_name: 'edmundleex',
			upload_preset: 'k24aopiw',
			theme: 'minimal'
		}, function (error, result) {
			console.log(error, result);
			if (typeof result !== 'undefined') {
				that.onDoneEditing({imgUrls: JSON.stringify(result)});
			}
		});
	},

	onCancelClick: function () {
		this.props.history.pushState(null, '/');
	},

	// onEditTitleFinish: function () {
	// 	if (this.state.mode !== 'new') {
	// 		ApiUtil.updateAlbum(this.state.albumId, this.state.title, null);
	// 	} else {
	// 		ApiUtil.createAlbum({title: this.state.title});
	// 	}
	// },

	onDoneEditing: function (values) {
		var description,
				imgUrls;
		if (values) {
			description = values.description;
			imgUrls = values.imgUrls;
		}
		debugger
		if (this.state.mode === 'edit') {
			ApiUtil.updateAlbum(this.state.albumId, this.state.title, description, imgUrls);
		} else {
			console.log(this.state.creatingState);
			if (this.state.creatingState !== 'created' && this.state.creatingState !== 'creating') {
			console.log("about to create");
				if (this.state.title !== "" || description !== "" || imgUrls) {
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
		// var album = AlbumStore.find(this.props.params.albumId);
		return (
			<div className="form-container">
				<TitleBar mode={this.state.mode}
									title={this.state.title}
									albumId={this.state.albumId}
									onEditClick={this.onEditClick}
								  onDeleteClick={this.onDeleteClick}
								  onSaveClick={this.onSaveClick}
								  onUploadClick={this.onUploadClick}
								  onCancelClick={this.onCancelClick}
								  onEditTitleFinish={this.onDoneEditing}
								  linkState={this.linkState} />
				<ThumbNails />
				<div id="editor">
					<QEditor albumId={this.state.albumId}
									 description={this.state.description}
									 linkState={this.linkState}
									 onDoneTyping={this.onDoneEditing} />
				</div>
			</div>
		);
	}
});

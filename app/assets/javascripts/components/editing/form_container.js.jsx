var FormContainer = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
		var albumId,
				title,
				album;
		if (this.props.mode === 'new') {
			albumId = null;
			title = null;
			description = null;
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
    	picCount: null,
    	mode: this.props.mode
    };
	},

	componentDidMount: function () {
		// AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		// PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		// AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
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
									 mode: 'edit'});
	},

	_onSaved: function () {
		// render some effects
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
		
	},

	onCancelClick: function () {
		this.props.history.pushState(null, '/');
	},

	onEditTitleFinish: function () {
		if (this.state.mode !== 'new') {
			ApiUtil.updateAlbum(this.state.albumId, this.state.title, null);
		} else {
			ApiUtil.createAlbum({title: this.state.title});
		}
	},

	onEditorDoneTyping: function (value) {
		if (this.state.mode === 'edit') {
			ApiUtil.updateAlbum(this.state.albumId, null, value);
		} else {
			ApiUtil.createAlbum({description: value});
		}
	},

	// onEditorBlur: function () {
	// 	debugger
	// 	ComponentActions.toggleEditing(false);
	// 	if (this.state.mode === 'edit' ||
	// 		this.state.mode === 'view') {
	// 		ApiUtil.updateAlbum(this.state.albumId, null, this.state.description);
	// 	} else {
	// 		ApiUtil.createAlbum({description: this.state.description});
	// 	}
	// },

	render: function () {
		// var album = AlbumStore.find(this.props.params.albumId);
		return (
			<div>
				<TitleBar mode={this.state.mode}
									title={this.state.title}
									albumId={this.state.albumId}
									onEditClick={this.onEditClick}
								  onDeleteClick={this.onDeleteClick}
								  onSaveClick={this.onSaveClick}
								  onUploadClick={this.onUploadClick}
								  onCancelClick={this.onCancelClick}
								  onEditTitleFinish={this.onEditTitleFinish}
								  linkState={this.linkState} />
				<div id="editor">
					<QEditor albumId={this.state.albumId}
									 description={this.state.description}
									 linkState={this.linkState}
									 onDoneTyping={this.onEditorDoneTyping}
									 onEditorBlur={this.onEditorBlur} />
				</div>
			</div>
		);
	}
});

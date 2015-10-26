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
    	creatingState: null,
    	isPanelShown: TogglerStore.isPanelShown(),
    	albums: AlbumStore.all(),
    	isConfModalShown: false
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onAlbumsIndexChange);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		AlbumStore.addSearchAlbumListener(this._onSearch);
		TogglerStore.addToggleCreatingListener(this._onToggleCreating);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
		TogglerStore.addShowConfModalListener(this._onShowConfModal);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onAlbumsIndexChange);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		AlbumStore.removeSearchAlbumListener(this._onSearch);
		TogglerStore.removeToggleCreatingListener(this._onToggleCreating);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
		TogglerStore.removeShowConfModalListener(this._onShowConfModal);
	},

	_onAlbumsIndexChange: function () {
		this.setState({ albums: AlbumStore.all() });
	},

	_onSearch: function () {
		this.setState({ albums: AlbumStore.matchedAlbums() });
	},

	_onTitleChanged: function () {
		if (this.state.mode === 'new') {
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
		this.setState({ creatingState: TogglerStore.creatingState() });
	},

	_onSlide: function () {
		this.setState({ isPanelShown: TogglerStore.isPanelShown() });
	},

	_onShowConfModal: function () {
		this.setState({ isConfModalShown: TogglerStore.confModalOpts().isShown });
	},

	onDeleteClick: function () {
		ComponentActions.showConfirmation(
			true,
			ApiUtil.deleteAlbum.bind(null, this.state.albumId),
			"album",
			this.state.title,
			'/'
		);
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

	onSaveClick: function () {
		this.props.history.pushState(null, '/albums/' + this.state.albumId + '/show');
		ComponentActions.slideOut(true);
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

	handleOverlayClick: function () {
		ComponentActions.slideOut(false);
	},

	render: function () {
		var indexKlass = "";
		var showOverlay = (this.state.isPanelShown) ? "" : "behind";

		if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
		return (
			<div className="album-new-main">
				<Confirmation show={this.state.isConfModalShown} />
				<AlbumsIndexContainer albums={this.state.albums}
															history={this.history}
															klass={indexKlass}
															params={this.props.params} />
				<div className={"album-main-overlay " + showOverlay}
						 onClick={this.handleOverlayClick}></div>
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
				// <ThumbNails />
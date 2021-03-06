var Edit = React.createClass({
	mixins: [
		ReactRouter.History,
		React.addons.LinkedStateMixin,
		React.addons.PureRenderMixin
		// JoyrideMixin
	],

	getInitialState: function () {
		var albumId = this.props.params.albumId;
		var album = AlbumStore.find(albumId) || {};
		var title = album.title;
		var description = album.description;

    return {
    	// albumId: albumId,
    	title: title,
    	description: description,
    	pictures: [],
    	picCount: null,
    	creatingState: null,
    	showOverlay: false
    };
	},

	componentWillMount: function () {
    // this.joyrideSetOptions({
    //   showSkipButton: true,
    //   tooltipOffset: 10,
    //   showStepsProgress: true,

    //   stepCallback: function(step) {
    //     // console.log(step);
    //   },

    //   completeCallback: function(steps) {
    //     // console.log(steps);
    //   }
    // });
	},

	componentDidMount: function () {
		// this.joyrideReplaceSteps(APP_CONFIG.NewEditPageTour);
		// this.joyrideStart();

		AlbumStore.addAlbumsIndexChangeListener(this._onTitleChanged);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		TogglerStore.addToggleIndexPanelListener(this._onOverlayToggled);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onTitleChanged);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		TogglerStore.removeToggleIndexPanelListener(this._onOverlayToggled);
	},

	_onTitleChanged: function () {
		var album = AlbumStore.find(this.props.params.albumId);
		this.setState({
			title: album.title,
			description: album.description
		});
	},

	_onAlbumCreated: function () {
		this.setState({
			albumId: AlbumStore.latestAlbum().id,
			title: AlbumStore.latestAlbum().title,
		});
	},

	_onOverlayToggled: function () {
		this.setState({showOverlay: TogglerStore.showOverlay()});
	},

	onDeleteClick: function () {
		ComponentActions.showConfirmation(
			true,
			ApiUtil.deleteAlbum.bind(null, this.props.params.albumId),
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
			if (typeof result !== 'undefined') {
				that.onDoneEditing({imgUrls: JSON.stringify(result)});
			}
		});
	},

	onCancelClick: function () {
		this.props.history.pushState(null, '/');
	},

	onSaveClick: function () {
		this.props.history.pushState(null, '/albums/' + this.props.params.albumId + '/show');
		ComponentActions.slideOut(true);
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

	handleOverlayClick: function () {
		ComponentActions.slideOut(false);
	},

	render: function () {
		var pictures = PictureStore.all();
		var showOverlay = (this.state.showOverlay) ? "" : "behind";
		var albumId = this.props.params.albumId;
		var cover_picture_url = AlbumStore.find(albumId).cover_picture_url;

		return (
			<div className="album-show">
				<div className={"album-main-overlay " + showOverlay}
						 onClick={this.handleOverlayClick}></div>
				<div className="form-container">
					<TitleBar mode={'edit'}
										title={this.state.title}
										albumId={albumId}
										cover_picture_url={cover_picture_url}
										onEditClick={this.onEditClick}
									  onDeleteClick={this.onDeleteClick}
									  onSaveClick={this.onSaveClick}
									  onUploadClick={this.onUploadClick}
									  onCancelClick={this.onCancelClick}
									  onEditTitleFinish={this.onDoneEditing}
									  linkState={this.linkState} />
					<div id="editor">
						<QEditor albumId={albumId}
										 description={this.state.description}
										 linkState={this.linkState}
										 onDoneTyping={this.onDoneEditing} />
					</div>
				</div>
			</div>
		);
	}
});
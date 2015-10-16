var FormContainer = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	albumId: null,
    	title: null,
    	description: null,
    	picCount: null,
    	mode: null
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
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

	onEditClick: function () {
		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/edit');
	},

	onDeleteClick: function () {
		ApiUtil.deleteAlbum(this.state.albumId);
		this.props.history.pushState(null, '/');
	},

	onSaveClick: function () {
		
	},

	onUploadClick: function () {
		
	},

	onCancelClick: function () {
		this.props.history.pushState(null, '/');
	},

	onEditFinish: function () {
		if (this.state.mode !== 'new') {
			ApiUtil.updateAlbum(this.state.id, this.state.title, null);
		} else {
			ApiUtil.createAlbum({title: this.state.title});
		}
	},

	render: function () {
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
								  onEditFinish={this.onEditFinish}
								  linkState={this.linkState} />

			</div>
		);
	}
});
				// <QEditor albumId={this.state.albumId}
				// 				 description={this.state.description} />

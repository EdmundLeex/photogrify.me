var AlbumShow = React.createClass({
	mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

	getInitialState: function () {
  	var album = AlbumStore.find(this.props.params.albumId);
    return {
    	albumId: album.id,
    	title: album.title
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
		ApiUtil.fetchAllAlbums();
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onTitleChanged: function () {
		this.setState({title: AlbumStore.find(this.state.albumId).title});
	},

	_onSwitch: function () {
		// change count, title
		var album = AlbumStore.find(this.props.params.albumId);
		this.setState({
			id: 			album.id,
			title: 	 	album.title,
			picCount: PictureStore.count()
		});
	},

	onEditClick: function () {
		this.history.pushState(null, '/albums/' + this.props.params.albumId + '/edit');
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
				var urls = result.map(function (img) {
					return img.url;
				});
				that.onDoneEditing({imgUrls: urls});
			}
		});
	},

	onDeleteClick: function () {
		ApiUtil.deleteAlbum(this.state.albumId);
		this.history.pushState(null, '/');
	},

	onDoneEditing: function () {
		ApiUtil.updateAlbum(this.state.albumId, this.state.title);
	},

	render: function () {
		return (
			<div className="album-show">
				<TitleBar mode={'edit'}
									title={this.state.title}
									albumId={this.state.albumId}
									onEditClick={this.onEditClick}
									onUploadClick={this.onUploadClick}
								  onDeleteClick={this.onDeleteClick}
								  onEditTitleFinish={this.onDoneEditing}
								  linkState={this.linkState} />
				<PicturesCollection history={this.history} params={this.props.params} />
			</div>
		);
	}
});
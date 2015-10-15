var AlbumNewMain = React.createClass({
	getInitialState: function () {
    return { album: null };
	},

	componentDidMount: function () {
		var albumId = localStorage.getItem('createdAlbumId');
		if (albumId) {
			ComponentActions.retrieveAlbumState(albumId);
			localStorage.removeItem('createdAlbumId');
		}

		AlbumStore.addAlbumCreateListener(this._onCreate);
		AlbumStore.addCurrentAlbumIdRetrieveListener(this._onRetrieve);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumCreateListener(this._onCreate);
	},

	_onCreate: function () {
		this.setState({ album: AlbumStore.currentAlbum() });
	},

	_onRetrieve: function () {
		debugger
	},

	_onToggleMode: function (mode) {
		ComponentActions.toggleMode(mode);
	},

	render: function () {
		// show title editable
		// add form
		var albumId = (this.state.album) ? this.state.album.id : null;
		return (
			<div className="album-new-main">
				<AlbumShowTitle handleClickEdit={this._onToggleMode}/>
				<AlbumForm albumId={albumId} album={this.state.album} mode="new" />
			</div>
		);
	}
});
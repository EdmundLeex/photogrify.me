var AlbumNewMain = React.createClass({
	getInitialState: function () {
    return { album: null };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumCreateListener(this._onCreate);
		// AlbumStore.addCurrentAlbumIdRetrieveListener(this._onRetrieve);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumCreateListener(this._onCreate);
		if (this.state.album) {
			ComponentActions.saveNewAlbum(this.state.album);
		}
		AlbumStore.removeAlbumCreateListener(this._onCreate);
		// AlbumStore.removeCurrentAlbumIdRetrieveListener(this._onRetrieve);
	},

	_onCreate: function () {
		this.setState({ album: AlbumStore.newAlbum() });
	},

	// _onRetrieve: function () {
	// 	debugger
	// },

	_onToggleMode: function (mode) {
		ComponentActions.toggleMode(mode);
	},

	render: function () {
		// show title editable
		// add form
		var albumId = (this.state.album) ? this.state.album.id : null;
		return (
			<div className="album-new-main">
				<AlbumShowTitle handleClickEdit={this._onToggleMode} mode={"new"}/>
				<AlbumForm albumId={albumId} album={this.state.album} mode={"new"} />
			</div>
		);
	}
});
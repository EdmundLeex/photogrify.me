var AlbumNewMain = React.createClass({
	getInitialState: function () {
    return { album: null };
	},
	componentDidMount: function () {
		AlbumStore.addAlbumCreateListener(this._onCreate);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumCreateListener(this._onCreate);
	},

	_onCreate: function () {
		this.setState({ album: AlbumStore.currentAlbum() });
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
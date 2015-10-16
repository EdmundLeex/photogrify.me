var AlbumForm = React.createClass({
	// mixins: [React.addons.LinkedStateMixin],
	componentDidMount: function () {
	  AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
	},

	componentWillUnmount: function () {
	  AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
	},

	_onAlbumCreated: function () {
		this.setState({id: AlbumStore.latestAlbum().id, title: AlbumStore.latestAlbum().title});
	},

	render: function () {
		// show title editable
		// add form
		var albumId = (this.props.album) ? this.props.album.id : null;
		return (
			<div className="album-form">
				<AlbumThumbNails albumId={albumId} />
				<div id="editor">
					<Editor album={this.props.album} mode={this.props.mode} history={this.props.history} />
				</div>
			</div>
		);
	}
});
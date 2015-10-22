var AlbumsIndex = React.createClass({
	getInitialState: function () {
    return {
    	idDroppinToAlbum: false
    };
	},

	componentDidMount: function () {
		TogglerStore.addToggleAlbumDropListener(this._onDropToAlbum);
	},

	componentWillUnmount: function () {
		TogglerStore.removeToggleAlbumDropListener(this._onDropToAlbum);
	},

	_onDropToAlbum: function () {
		this.setState({idDroppinToAlbum: TogglerStore.isDroppingToAlbum()});
	},

	render: function () {
		var params = this.props.params;
		var history = this.props.history;
		var isDroppingTo;

		return (
			<div className="albums-index">
				{this.props.albums.map(function (album) {
					return <AlbumIndexItem key={album.id}
																 album={album}
																 params={params}
																 history={history}
																 isDroppingTo={this.state.idDroppinToAlbum} />
				}, this)}
			</div>
		);
	}
});


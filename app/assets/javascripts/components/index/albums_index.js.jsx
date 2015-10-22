var AlbumsIndex = React.createClass({
	getInitialState: function () {
    return {
    	droppingAlbumId: null
    };
	},

	componentDidMount: function () {
		TogglerStore.addToggleAlbumDropListener(this._onDropToAlbum);
	},

	componentWillUnmount: function () {
		TogglerStore.removeToggleAlbumDropListener(this._onDropToAlbum);
	},

	_onDropToAlbum: function () {
		this.setState({droppingAlbumId: TogglerStore.droppinToAlbumId()});
	},

	render: function () {
		var params = this.props.params;
		var history = this.props.history;
		var isDroppingTo;

		return (
			<div className="albums-index">
				{this.props.albums.map(function (album) {
					isDroppingTo = (album.id === parseInt(this.state.droppingAlbumId)) ?
						true : false;
					return <AlbumIndexItem key={album.id}
																 album={album}
																 params={params}
																 history={history}
																 isDroppingTo={isDroppingTo} />
				}, this)}
			</div>
		);
	}
});


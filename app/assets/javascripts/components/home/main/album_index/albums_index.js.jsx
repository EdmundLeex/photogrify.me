var AlbumsIndex = React.createClass({
	componentDidMount: function () {
		// call ApiUtil.fetechAllAlbums
	},

	render: function () {
		return (
			<div className="albums-index">
				<div className="albums-index-title"></div>
				<AlbumIndexItem />
			</div>
		);
	}
});
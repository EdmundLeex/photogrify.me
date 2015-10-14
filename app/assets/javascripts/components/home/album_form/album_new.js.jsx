// no index

var AlbumNew = React.createClass({
	render: function () {
		return (
			<div className="main">
				<Sidebar />
				<div className="album-show-main">
					<AlbumsIndexContainer />
					<AlbumForm />
				</div>
			</div>
		);
	}
});
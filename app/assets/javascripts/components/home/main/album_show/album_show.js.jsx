var AlbumShow = React.createClass({
	render: function () {
		return (
			<div className="album_show">
				<AlbumShowTitle />
				<PicturesCollection />
			</div>
		);
	}
});
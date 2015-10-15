var AlbumShow = React.createClass({
	mixins: [ReactRouter.History],

	render: function () {
		var album = AlbumStore.find(this.props.params.albumId);
		return (
			<div className="album-show">
				<AlbumShowTitle history={this.history} album={album} params={this.props.params} />
				<PicturesCollection history={this.history} album={album} params={this.props.params} />
			</div>
		);
	}
});
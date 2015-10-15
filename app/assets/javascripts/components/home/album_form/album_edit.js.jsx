var AlbumEdit = React.createClass({
	render: function () {
		return (
			<div className="album-show">
				<AlbumShowTitle history={this.history} />
				<AlbumForm />
			</div>
		);
	}
});
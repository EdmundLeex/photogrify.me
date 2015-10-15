var AlbumShow = React.createClass({
	render: function () {
		return (
			<div className="album-show">
				<AlbumShowTitle mode={this.props.mode} />
				{(this.props.mode === 'view') ?
					<PicturesCollection /> :
					<AlbumForm album={this.props.album} mode={this.props.mode} />}
			</div>
		);
	}
});
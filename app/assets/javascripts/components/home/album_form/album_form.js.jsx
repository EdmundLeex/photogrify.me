var AlbumForm = React.createClass({
	// mixins: [React.addons.LinkedStateMixin],

	render: function () {
		// show title editable
		// add form
		var albumId = (this.props.album) ? this.props.album.id : null;

		return (
			<div className="album-form">
				<AlbumThumbNails albumId={albumId} />
				<div id="editor">
					<Editor album={this.props.album} mode={this.props.mode} />
				</div>
			</div>
		);
	}
});
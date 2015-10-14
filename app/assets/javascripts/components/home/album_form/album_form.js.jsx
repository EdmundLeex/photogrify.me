var AlbumForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	render: function () {
		// show title editable
		// add form
		var album = this.props.album;
		return (
			<div className="album-form">
				<AlbumThumbNails albumId={album.id} />
				<div id="editor">
					<Editor album={album} mode={this.props.mode}/>
				</div>
			</div>
		);
	}
});
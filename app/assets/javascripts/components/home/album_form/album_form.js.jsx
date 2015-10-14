var AlbumForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	render: function () {
		// show title editable
		// add form
		return (
			<div className="album-show">
				<AlbumShowTitle />
				<div id="editor">
					<Editor />
				</div>
			</div>
		);
	}
});
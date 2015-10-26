var CreateAlbumBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" data-toggle="tooltip" title="NEW ALBUM" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-plus"></span>
			</div>
		);
	},

	onClickHandler: function () {
		ComponentActions.slideOut(false);
		this.props.history.pushState(null, '/new');
	}
});
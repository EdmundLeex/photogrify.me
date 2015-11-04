var CreateAlbumBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" data-toggle="tooltip" title="NEW ALBUM" onClick={this.onClickHandler}>
				<span className={"glyphicon glyphicon-plus " + ((this.props.selected) ? "selected" : "")}></span>
			</div>
		);
	},

	onClickHandler: function () {
		ComponentActions.slideOut(false);
		ComponentActions.switchTab('new');
		this.props.history.pushState(null, '/new');
	}
});
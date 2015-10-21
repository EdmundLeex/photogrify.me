var CreateAlbumBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-plus"></span>
			</div>
		);
	},

	onClickHandler: function () {
		// ComponentActions.toggleMode('new');
		ComponentActions.slideOut(false);
		this.props.history.pushState(null, '/new');
	}
});
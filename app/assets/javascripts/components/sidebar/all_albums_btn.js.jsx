var AllAlbumsBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-book"></span>
			</div>
		);
	},

	onClickHandler: function () {
		// fetech all albums
		// call ApiUtil.fetchAllAlbums
		ApiUtil.fetchAllAlbums();
		this.props.history.pushState(null, '/');
		// ComponentActions.toggleMode('view');
	}
});
var AllAlbumsBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" data-toggle="tooltip" title="ALL ALBUMS" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-book"></span>
			</div>
		);
	},

	onClickHandler: function () {
		ApiUtil.fetchAllAlbums();
		ComponentActions.slideOut();
	}
});
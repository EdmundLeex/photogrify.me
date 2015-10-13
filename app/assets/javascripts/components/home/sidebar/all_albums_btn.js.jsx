var AllAlbumsBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>Album</div>
		);
	},

	onClickHandler: function () {
		// fetech all albums
		// call ApiUtil.fetchAllAlbums
		ApiUtil.fetchAllAlbums();
	}
});
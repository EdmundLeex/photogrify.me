var CreateAlbumBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>
				Create
			</div>
		);
	},

	onClickHandler: function () {
		// go to albums/new route
		console.log('clicked');
		ApiUtil.createAlbum();
		this.props.history.pushState(null, "new");
	}
});
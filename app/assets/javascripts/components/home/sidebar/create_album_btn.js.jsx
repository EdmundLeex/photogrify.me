var CreateAlbumBtn = React.createClass({
	mixins: [ReactRouter.History],

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
		this.history.pushState(null, "new");
	}
});
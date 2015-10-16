var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs"></div>
				<CreateAlbumBtn history={this.history} />
				<AllAlbumsBtn history={this.history} />
				<AllPicturesBtn history={this.history} />
				<UserMenuBtn />
			</div>
		);
	}
});

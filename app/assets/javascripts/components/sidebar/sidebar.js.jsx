var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	handleClickLogo: function () {
		ComponentActions.slideOut(false);
		this.history.pushState(null, '/');
	},

	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs" onClick={this.handleClickLogo}>
					<img src="assets/logo-sidebar.png" alt=""/>
				</div>
				<div className="sidebar-btn-group">
					<CreateAlbumBtn history={this.history} />
					<AllAlbumsBtn history={this.history} />
					<AllPicturesBtn history={this.history} />
				</div>
				<UserMenuBtn />
			</div>
		);
	}
});

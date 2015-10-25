var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	handleClickLogo: function () {
		ComponentActions.slideOut(true);
		this.history.pushState(null, '/');
	},

	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs"
						 onClick={this.handleClickLogo}
						 data-toggle="tooltip" title="HOME">
					<img src="images/logo-sidebar.png" alt=""/>
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

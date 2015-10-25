var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	handleClickLogo: function () {
		ComponentActions.slideOut(true);
		this.history.pushState(null, '/');
	},

	handleClickMap: function () {
		this.history.pushState(null, '/map');
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
					<div className="sidebar-thumbs map-icon">
						<span className="" onClick={this.handleClickMap}></span>
					</div>
				</div>
				<UserMenuBtn />
			</div>
		);
	}
});

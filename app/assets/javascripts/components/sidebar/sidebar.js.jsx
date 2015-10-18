var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs">
					<img src="%image_path(logo-sidebar.png)%" alt=""/>
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

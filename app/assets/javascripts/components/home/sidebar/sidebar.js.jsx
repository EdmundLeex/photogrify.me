var SideBar = React.createClass({
	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs"></div>
				<CreateAlbumBtn />
				<AllAlbumsBtn />
				<AllPicturesBtn />
				<UserMenuBtn />
			</div>
		);
	}
});

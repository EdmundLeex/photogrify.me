var Home = React.createClass({
	render: function () {
		return (
			<div className="home">
				<Sidebar />
				<AlbumShowMain />
			</div>
		);
	}
});
var UserMenuBtn = React.createClass({
	render: function () {
		// temporary as logout btn
		return (
			<div className="sidebar-thumbs user-menu" onClick={this.handleClick}>
				<span className="glyphicon glyphicon-user"></span>
			</div>
		);
	},

	handleClick: function () {
		ApiUtil.logout();
	}
});
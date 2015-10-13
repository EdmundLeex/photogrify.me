var UserMenuBtn = React.createClass({
	render: function () {
		// temporary as logout btn
		return (
			<div className="sidebar-thumbs" onClick={this.handleClick}>
				logout
			</div>
		);
	},

	handleClick: function () {
		ApiUtil.logout();
	}
});
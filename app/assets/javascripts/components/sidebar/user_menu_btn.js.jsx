var UserMenuBtn = React.createClass({
	render: function () {
		// temporary as logout btn
		return (
			<div className="sidebar-thumbs user-menu" data-toggle="tooltip" title="LOG OUT" onClick={this.handleClick}>
				<span className="glyphicon glyphicon-off"></span>
			</div>
		);
	},

	handleClick: function () {
		ApiUtil.logout();
	}
});
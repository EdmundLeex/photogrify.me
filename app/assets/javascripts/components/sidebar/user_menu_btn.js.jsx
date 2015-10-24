var UserMenuBtn = React.createClass({
	getInitialState: function () {
    return {
    	isLoggingOut: AjaxStore.isLoggingOut()
    };
	},

	componentDidMount: function () {
  	AjaxStore.addIsLoggingOutListener(this._loggingOut);
	},

	componentWillUnmount: function () {
  	AjaxStore.removeIsLoggingOutListener(this._loggingOut);
	},

	_loggingOut: function () {
		this.setState({isLoggingOut: AjaxStore.isLoggingOut()});
	},

	render: function () {
		// temporary as logout btn
		var statusKlass = (this.state.isLoggingOut) ? "disabled" : "";
		return (
			<div className={"sidebar-thumbs user-menu " + statusKlass}
					 data-toggle="tooltip"
					 title="LOG OUT"
					 onClick={this.handleClick}>
				<span className="glyphicon glyphicon-off"></span>
			</div>
		);
	},

	handleClick: function () {
		if (!this.state.isLoggingOut) { ApiUtil.logout(); }
	}
});
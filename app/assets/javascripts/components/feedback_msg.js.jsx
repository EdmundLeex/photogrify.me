var FeedBackMsg = React.createClass({
	getInitialState: function () {
    return {
    	msg: null
    };
	},

	componentDidMount: function () {
		ServerFeedbackStore.addShowMsgListener(this._onShowMsg);
	},

	componentWillUnmount: function() {
		ServerFeedbackStore.removeShowMsgListener(this._onShowMsg);
	},

	_onShowMsg: function () {
		this.setState({msg: ServerFeedbackStore.msg()});
		setTimeout(this._hideMsg, 2000);
	},

	_hideMsg: function () {
		ComponentActions.newMsg(null);
	},

	render: function () {
		var klass = (this.state.msg) ? "" : "behind";

		return (
			<div className={"feedback-msg " + klass}>
				{this.state.msg}
			</div>
		);
	}
});
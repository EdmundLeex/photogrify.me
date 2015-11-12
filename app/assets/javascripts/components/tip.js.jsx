var TIPS = {
	dragAndDrop: "Try to drag a photo to another album"
};

var Tip = React.createClass({
	// getInitialState: function () {
 //    return {
	// 		tip: TogglerStore.currentTip()
 //    };
	// },

	// componentDidMount: function () {
	// 	TogglerStore.addPromptTipListener(this._onPromptTip);
	// },

	// componentWillMount: function () {
	// 	TogglerStore.removePromptTipListener(this._onPromptTip);
	// },

	handleClick: function () {
		ComponentActions.promptTip(TogglerStore.currentTip());
	},

	// _onPromptTip: function () {
	// 	debugger
	// 	this.setState({ tip: TogglerStore.currentTip() });
	// },

	render: function () {
		var show = (this.props.tip) ? 'show' : 'hide';
		var id = this.props.tip || "";
		var tip = TIPS[this.props.tip];

		return (
			<div className={"tip " + show} id={id}>
				{tip}
				<div className="tip-btn" onClick={this.handleClick}>OK</div>
			</div>
		);
	}
});
var SearchBtn = React.createClass({
	getInitialState: function () {
    return {showSearchBox: false};
	},

	componentDidMount: function () {
		TogglerStore.addToggleSearchListener(this.onToggle);
	},

	componentWillUnmount: function () {
		TogglerStore.removeToggleSearchListener(this.onToggle);
	},

	onToggle: function () {
		this.setState({showSearchBox: TogglerStore.showSearchBox()});
	},

	onClickHandler: function () {
		ComponentActions.toggleSearchBar(this.state.showSearchBox);
	},

	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-search"></span>
				{(this.state.showSearchBox) ? <SearchBox /> : ""}
			</div>
		);
	}
});
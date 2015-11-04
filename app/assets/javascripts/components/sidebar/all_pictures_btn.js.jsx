var AllPicturesBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" data-toggle="tooltip" title="ALL PICTURES" onClick={this.onClickHandler}>
				<span className={"glyphicon glyphicon-th " + ((this.props.selected) ? "selected" : "")}></span>
			</div>
		);
	},

	onClickHandler: function () {
		ComponentActions.slideOut(false);
		ComponentActions.switchTab('pictures');
		this.props.history.pushState(null, '/pictures');
	}
});
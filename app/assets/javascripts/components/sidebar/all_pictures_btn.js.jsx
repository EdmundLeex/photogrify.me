var AllPicturesBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" data-toggle="tooltip" title="ALL PICTURES" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-th"></span>
			</div>
		);
	},

	onClickHandler: function () {
		ComponentActions.slideOut(false);
		this.props.history.pushState(null, '/pictures');
	}
});
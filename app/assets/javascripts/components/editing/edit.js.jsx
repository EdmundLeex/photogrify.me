var Edit = React.createClass({
	render: function () {
		return (
			<div className="album-show">
				<FormContainer mode={"edit"} params={this.props.params} />
			</div>
		);
	}
});
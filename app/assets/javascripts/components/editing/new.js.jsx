var New = React.createClass({
	render: function () {
		return (
			<div className="album-new-main">
				<FormContainer mode={"new"} params={this.props.params} />
			</div>
		);
	}
});
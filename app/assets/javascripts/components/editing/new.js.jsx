var New = React.createClass({
	render: function () {
		console.log('new rendered');
		return (
			<div className="album-new-main">
				<FormContainer mode={"new"} params={this.props.params} />
			</div>
		);
	}
});
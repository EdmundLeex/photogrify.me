var Confirmation = React.createClass({
	render: function () {
		return (
			<div className="conf-modal">
				<div className="conf-form-container">
					<div className="conf-icon">
						<span className="glyphicon glyphicon-trash"></span>
					</div>
					<div className="conf-title">DELETE</div>
					<div className="conf-text">Are you sure?</div>
					<div className="conf-btn-group">
						<div className="cancel">Cancel</div>
						<div className="delete">Delete</div>
					</div>
				</div>
			</div>
		);
	}
});
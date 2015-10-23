var Confirmation = React.createClass({
	render: function () {
		return (
			<div className="modal conf-modal fade">
				<div className="modal-dialog conf-form-container">
					<div>
						<div className="row">
							<span className="center-block conf-icon glyphicon glyphicon-trash"></span>
						</div>
						<div className="row">
							<div className="center-block conf-title">DELETE</div>
						</div>
						<div className="row">
							<div className="center-block conf-msg">Are you sure?</div>
						</div>
						<div className="row conf-btn-group">
							<div className="center-block">
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="cancel conf-btn pull-right">
										Cancel
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="delete conf-btn pull-left">
										Delete
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
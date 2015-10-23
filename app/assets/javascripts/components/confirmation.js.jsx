var Confirmation = React.createClass({
	mixins: [ReactRouter.History],

	handleCancel: function () {
		ComponentActions.showConfirmation(false);
	},

	handleDelete: function () {
		var self = this;
		TogglerStore.confModalOpts().callback(function () {
			self.history.pushState(null, TogglerStore.confModalOpts.path);
			ComponentActions.showConfirmation(false);
		});

		// ApiUtil.deleteAlbum(this.props.params.albumId);
		// this.history.pushState(null, '/');

		// ComponentActions.showConfirmation(
		// 	ApiUtil.deleteAlbum.bind(null, this.props.params.albumId),
		// 	"album",
		// 	this.state.title,
		// 	'/'
		// );
	},

	render: function () {
		var showKlass = (this.props.show) ?
			"in show" : "";
		return (
			<div className={"modal conf-modal fade " + showKlass}>
				<div className="modal-dialog conf-form-container">
					<div>
						<div className="row">
							<span className="center-block conf-icon glyphicon glyphicon-trash"></span>
						</div>
						<div className="row">
							<div className="center-block conf-title">
								{"DELETE " + TogglerStore.confModalOpts().model}
							</div>
						</div>
						<div className="row">
							<div className="center-block conf-msg">
								{"Are you sure you want to delete " + TogglerStore.confModalOpts().msg + " ?"}
							</div>
						</div>
						<div className="row conf-btn-group">
							<div className="center-block">
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="cancel conf-btn pull-right" onClick={this.handleCancel}>
										Cancel
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="delete conf-btn pull-left" onClick={this.handleDelete}>
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
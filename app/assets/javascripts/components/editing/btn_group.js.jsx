var TitleBtnGroupNew = React.createClass({
	_onDeleteClick: function () {
		this.props.onDeleteClick();
	},

	_onEditClick: function () {
		// ComponentActions.toggleMode('edit');
		this.props.onEditClick();
	},

	_onSaveClick: function () {
		this.props.onSaveClick();
	},

	_onUploadClick: function () {
		this.props.onUploadClick();
	},

	_onCancelClick: function () {
		this.props.onCancelClick();
	},

	render: function () {
		var btnGrp;

		if (this.props.mode === 'new') {
			btnGrp = (
				<div className="title-btn-group">
					<div className="title-bar-btn" onClick={this._onSaveClick}>S</div>
					<div className="title-bar-btn" onClick={this._onUploadClick}>U</div>
					<div className="title-bar-btn" onClick={this._onCancelClick}>C</div>
				</div>
			)
		} else {
			btnGrp = (
				<div className="title-btn-group">
					<div className="title-bar-btn" onClick={this._onEditClick}>E</div>
					<div className="title-bar-btn" onClick={this._onDeleteClick}>D</div>
				</div>
			)
		}
		return (btnGrp);
	}
});
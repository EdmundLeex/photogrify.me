var TitleBtnGroup = React.createClass({
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
					<span className="glyphicon glyphicon-upload" id="upload" onClick={this._onUploadClick}></span>
					<span className="glyphicon glyphicon-remove" onClick={this._onCancelClick}></span>
				</div>
			)
		} else if (this.props.mode === 'edit') {
			btnGrp = (
				<div className="title-btn-group">
					<span className="glyphicon glyphicon-upload" id="upload" onClick={this._onUploadClick}></span>
					<span className="glyphicon glyphicon-remove" onClick={this._onCancelClick}></span>
				</div>
			)
		} else {
			btnGrp = (
				<div className="title-btn-group">
					<span className="glyphicon glyphicon-edit" onClick={this._onEditClick}></span>
					<span className="glyphicon glyphicon-upload" onClick={this._onUploadClick}></span>
					<span className="glyphicon glyphicon-trash" onClick={this._onDeleteClick}></span>
				</div>
			)
		}
		return (btnGrp);
	}
});
var TitleBtnGroup = React.createClass({
	getInitialState: function () {
    return {
    	isDeletingAlbum: AjaxStore.isDeletingAlbum()
    };
	},

	componentDidMount: function () {
  	AjaxStore.addIsDeletingAlbumListener(this._deletingAlbum);
	},

	componentWillUnmount: function () {
  	AjaxStore.removeIsDeletingAlbumListener(this._deletingAlbum);
	},

	_deletingAlbum: function () {
		this.setState({ isDeletingAlbum: AjaxStore.isDeletingAlbum() });
	},

	_onDeleteClick: function () {
		if (!this.state.isDeletingAlbum) {this.props.onDeleteClick();}
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
		var statusKlass = (this.state.isDeletingAlbum) ? "disabled" : "";

		if (this.props.mode === 'new') {
			console.log('new btnGrp');
			btnGrp = (
				<div className="title-btn-group">
					<span className="title-btn glyphicon glyphicon-upload"
								id="upload"
								onClick={this._onUploadClick}
								data-toggle="tooltip" title="UPLOAD PICTURES"></span>
					<span className="title-btn glyphicon glyphicon-remove"
								onClick={this._onCancelClick}
								data-toggle="tooltip" title="CANCEL"></span>
				</div>
			);
		} else if (this.props.mode === 'edit') {
			console.log('edit btnGrp');
			btnGrp = (
				<div className="title-btn-group">
					<span className="title-btn glyphicon glyphicon-upload"
								id="upload"
								onClick={this._onUploadClick}
								data-toggle="tooltip" title="UPLOAD PICTURES"></span>
					<span className="title-btn glyphicon glyphicon-ok"
								onClick={this._onSaveClick}
								data-toggle="tooltip" title="DONE"></span>
				</div>
			);
		} else {
			console.log('view btnGrp');
			btnGrp = (
				<div className="title-btn-group">
					<span className="title-btn glyphicon glyphicon-edit"
								onClick={this._onEditClick}
								data-toggle="tooltip" title="EDIT"></span>
					<span className="title-btn glyphicon glyphicon-upload"
								onClick={this._onUploadClick}
								data-toggle="tooltip" title="UPLOAD PICTURES"></span>
					<span className={"title-btn glyphicon glyphicon-trash " + statusKlass}
								onClick={this._onDeleteClick}
								data-toggle="tooltip" title="DELETE"></span>
				</div>
			)
		}
		return (btnGrp);
	}
});
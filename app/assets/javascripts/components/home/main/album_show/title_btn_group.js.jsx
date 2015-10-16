// var TitleBtnGroup = React.createClass({
// 	_onClickDelete: function () {
// 		ApiUtil.deleteAlbum(this.props.album.id);
// 		this.props.history.pushState(null, '/');
// 	},

// 	_onClickEdit: function () {
// 		// ComponentActions.toggleMode('edit');
// 		this.props.history.pushState(null, '/albums/' + this.props.album.id + '/edit');
// 	},

// 	_onClickSave: function () {
// 	},

// 	_onClickUpload: function () {
// 		//
// 	},

// 	_onClickCancel: function () {
// 		this.props.history.pushState(null, '/');
// 	},

// 	render: function () {
// 		var btnGrp;

// 		if (this.props.mode === 'new') {
// 			btnGrp = (
// 				<div className="title-btn-group">
// 					<div className="title-bar-btn" onClick={this._onClickSave}>S</div>
// 					<div className="title-bar-btn" onClick={this._onClickUpload}>U</div>
// 					<div className="title-bar-btn" onClick={this._onClickCancel}>C</div>
// 				</div>
// 			)
// 		} else {
// 			btnGrp = (
// 				<div className="title-btn-group">
// 					<div className="title-bar-btn" onClick={this._onClickEdit}>E</div>
// 					<div className="title-bar-btn" onClick={this._onClickDelete}>D</div>
// 				</div>
// 			)
// 		}
// 		return (btnGrp);
// 	}
// });


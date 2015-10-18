var TitleBar = React.createClass({
	getInitialState: function () {
    return {
    	editing: false,
    	title: ""
    };
	},

	_onEditingToggle: function () {
		this.setState({editing: AlbumStore.isEditing()});
	},

	componentDidMount: function () {
		AlbumStore.addToggleEditingListener(this._onEditingToggle);
	},

	componentWillUnmount: function () {
		AlbumStore.removeToggleEditingListener(this._onEditingToggle);
	},

	toggleToFocus: function () {
		ComponentActions.toggleEditing(true);
	},

	toggleToBlur: function () {
		ComponentActions.toggleEditing(false);
		this.props.onEditTitleFinish();
	},

	render: function () {
		var titleBar = this.renderTitle();

		return (
			<div className="album-show-title">
				{titleBar}
				<span className="count">{this.state.picCount}</span>
				<TitleBtnGroupNew mode={this.props.mode}
											 onEditClick={this.props.onEditClick}
											 onDeleteClick={this.props.onDeleteClick}
											 onSaveClick={this.props.onSaveClick}
											 onUploadClick={this.props.onUploadClick}
											 onCancelClick={this.props.onCancelClick} />
			</div>
		);
	},

	renderTitle: function () {
		var klass, placeholder;

		if (this.state.editing) {
			klass = "editing";
			placeholder = "";
		} else {
			klass = "";
			placeholder = "No Title";
		}

		return (
			<div className="title">
				<input type="text"
							 placeholder={placeholder}
							 onFocus={this.toggleToFocus}
							 onBlur={this.toggleToBlur}
							 className={klass}
							 valueLink={this.props.linkState("title")} />
			</div>
		);
	}
});
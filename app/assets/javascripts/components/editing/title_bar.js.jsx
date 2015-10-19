var TitleBar = React.createClass({
	getInitialState: function () {
    return {
    	editing: false,
    	title: this.props.title
    };
	},

	_onEditingToggle: function () {
		this.setState({editing: TogglerStore.isEditing()});
	},

	componentDidMount: function () {
		TogglerStore.addToggleEditingListener(this._onEditingToggle);
	},

	componentWillUnmount: function () {
		TogglerStore.removeToggleEditingListener(this._onEditingToggle);
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({title: nextProps.title})
	},

	toggleToFocus: function () {
		ComponentActions.toggleEditing(true);
	},

	toggleToBlur: function () {
		debugger
		ComponentActions.toggleEditing(false);
		this.props.onEditTitleFinish(this.state.title);
	},

	render: function () {
		var titleBar = this.renderTitle();

		return (
			<div className="album-show-title">
				{titleBar}
				<span className="count">{this.state.picCount}</span>
				<TitleBtnGroup mode={this.props.mode}
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
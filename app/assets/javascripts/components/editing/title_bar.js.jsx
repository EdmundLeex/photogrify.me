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
		ComponentActions.toggleEditing(false);
		this.props.onEditTitleFinish(this.state.title);
	},

	handleDragOver: function (e) {
		e.preventDefault();
	},

	handleDrop: function (e) {
		e.preventDefault();
		var imgId = e.dataTransfer.getData(APP_CONSTANTS.DRAGGING_IMG);
		ApiUtil.updateAlbumCover(imgId);
		// console.log("dragged: " + imgId);
	},

	render: function () {
		var titleBar = this.renderTitle();
		var dropContentKlass = (this.props.isDragging) ? "" : "hidden";
		try {

			var url = APP_CONFIG.ImageUrlByOptions(
				this.props.cover_picture_url,
				"e_brightness:20"
			);
			var divStyle = {backgroundImage: 'url(' + url + ')'};
		} catch(e) {
			console.log(e);
		}

		return (
			<div className="album-show-title"
					 style={divStyle}
					 onDrop={this.handleDrop}
					 onDragOver={this.handleDragOver}>
				<div className="overlay">
					{titleBar}
					<span className="count">{this.state.picCount}</span>
					<TitleBtnGroup mode={this.props.mode}
												 onEditClick={this.props.onEditClick}
												 onDeleteClick={this.props.onDeleteClick}
												 onSaveClick={this.props.onSaveClick}
												 onUploadClick={this.props.onUploadClick}
												 onCancelClick={this.props.onCancelClick} />
				</div>
				<div className={"drop-window-content " + dropContentKlass}
						 onDragOver={this.handleDragOver}
						 onDrop={this.handleDrop}>
					Drop your picture here
				</div>
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
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
			placeholder = "Type here for your album title...";
		}

		return (
			<div className="title">
				<input type="text"
							 placeholder={placeholder}
							 onFocus={this.toggleToFocus}
							 onBlur={this.toggleToBlur}
							 className={klass}
							 valueLink={this.props.linkState("title")}
							 data-toggle="tooltip" title="CLICK TO EDIT TITLE" />
				<div className="description">San Francisco (/sæn frənˈsɪskoʊ/), officially the City and County of San Francisco, is the cultural, commercial, and financial center of Northern California and the only consolidated city-county in California.[24] San Francisco encompasses a land area of about 46.9 square miles (121 km2)[25] on the northern end of the San Francisco Peninsula, which makes it the smallest county in the state. It has a density of about 18,187 people per square mile (7,022 people per km2), making it the most densely settled large city (population greater than 200,000) in the state of California and the second-most densely populated major city in the United Sttates after New York City.[26] San Francisco is the fourth-most populous city in California, after Los Angeles, San Diego and San Jose, and the 13th-most populous city in the United States—with a Census-estimated 2014 population of 852,469.[21] The city and its surrounding areas ar</div>
			</div>
		);
	}
});
var AlbumShowTitle = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function () {
    return {
    	id: null,
    	title: null,
    	picCount: null,
    	editing: false
    };
	},

	componentDidMount: function () {
		AlbumStore.addAlbumSwitchedListener(this._onSwitch);
		AlbumStore.addToggleEditingListener(this._onEditingToggle);
		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
	},

	componentWillUnmount: function () {
		AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
		AlbumStore.removeToggleEditingListener(this._onEditingToggle);
		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
	},

	_onSwitch: function () {
		// change count, title
		var album = AlbumStore.currentAlbum();
		this.setState({
			id: 			album.id,
			title: 	 	album.title,
			picCount: PictureStore.count()
		});
	},

	_onDelete: function () {
		console.log(this.state.id);
		ApiUtil.deleteAlbum(this.state.id);
	},

	_onClickEdit: function () {
		ComponentActions.toggleMode('edit');
	},

	_onEditingToggle: function () {
		this.setState({editing: AlbumStore.isEditing()});
	},

	_onTitleChanged: function () {
		this.setState({title: AlbumStore.currentTitle()});
	},

	_onAlbumCreated: function () {
		this.setState({id: AlbumStore.newAlbumId(), title: AlbumStore.newAlbumTitle()});
	},

	toggleToFocus: function () {
		ComponentActions.toggleEditing(true);
	},

	toggleToBlur: function () {
		ComponentActions.toggleEditing(false);
		if (this.props.mode === 'edit' || AlbumStore.newAlbumId()) {
			ApiUtil.updateAlbum(this.state.id, this.state.title, null);
		} else {
			ApiUtil.createAlbum({title: this.state.title});
		}
	},

	render: function () {
		// pic counts
		// button group (edit, delete)
		// title
		var titleBar = this.renderTitle();

		console.log(this.state.title);
		return (
			<div className="album-show-title">
				{titleBar}
				<span className="count">{this.state.picCount}</span>
				<div className="title-btn-group">
					<div className="title-bar-btn" onClick={this._onClickEdit}>E</div>
					<div className="title-bar-btn" onClick={this._onDelete}>D</div>
				</div>
			</div>
		);
	},

	renderTitle: function () {
		var klass = (this.state.editing) ? "editing" : "";
		return (
			<input type="text"
						 placeholder="No Title"
						 onFocus={this.toggleToFocus}
						 onBlur={this.toggleToBlur}
						 className={klass}
						 valueLink={this.linkState("title")} />
		);
	}
});
// var AlbumMainTitle = React.createClass({
// 	mixins: [React.addons.LinkedStateMixin],

// 	getInitialState: function () {
//     return {
//     	id: null,
//     	title: null,
//     	picCount: null,
//     	editing: false,
//     	mode: this.props.mode
//     };
// 	},

// 	componentDidMount: function () {
// 		// AlbumStore.addAlbumSwitchedListener(this._onSwitch);
// 		if (this.props.mode === 'edit') {
// 			var album = this.props.album;
// 			this.setState({
// 				id: album.id,
// 				title: album.title,
// 				picCount: PictureStore.count()
// 			});
// 		}

// 		AlbumStore.addToggleEditingListener(this._onEditingToggle);
// 		AlbumStore.addAlbumsIndexChangeListener(this._onSwitch);
// 		AlbumStore.addAlbumUpdateListener(this._onTitleChanged);
// 		AlbumStore.addAlbumCreateListener(this._onAlbumCreated);
// 		PictureStore.addPicturesCollectionChangedListener(this._onSwitch);
// 	},

// 	componentWillUnmount: function () {
// 		// AlbumStore.removeAlbumSwitchedListener(this._onSwitch);
// 		AlbumStore.removeToggleEditingListener(this._onEditingToggle);
// 		AlbumStore.removeAlbumsIndexChangeListener(this._onSwitch);
// 		AlbumStore.removeAlbumUpdateListener(this._onTitleChanged);
// 		AlbumStore.removeAlbumCreateListener(this._onAlbumCreated);
// 		PictureStore.removePicturesCollectionChangedListener(this._onSwitch);
// 	},

// 	_onSwitch: function () {
// 		// change count, title
// 		var album = AlbumStore.find(this.props.params.albumId);
// 		this.setState({
// 			id: 			album.id,
// 			title: 	 	album.title,
// 			picCount: PictureStore.count()
// 		});
// 	},

// 	_onEditingToggle: function () {
// 		this.setState({editing: AlbumStore.isEditing()});
// 	},

// 	_onTitleChanged: function () {
// 		if (this.props.mode === 'new') {
// 			this.setState({title: AlbumStore.latestAlbum().title});
// 		} else {
// 			this.setState({title: AlbumStore.find(this.props.params.albumId).title});
// 		}
// 	},

// 	_onAlbumCreated: function () {
// 		this.setState({id: AlbumStore.latestAlbum().id,
// 									 title: AlbumStore.latestAlbum().title,
// 									 mode: 'edit'});
// 	},

// 	toggleToFocus: function () {
// 		ComponentActions.toggleEditing(true);
// 	},

// 	toggleToBlur: function () {
// 		ComponentActions.toggleEditing(false);
// 		if (this.state.mode !== 'new') {
// 			ApiUtil.updateAlbum(this.state.id, this.state.title, null);
// 		} else {
// 			// debugger
// 			ApiUtil.createAlbum({title: this.state.title});
// 		}
// 	},

// 	render: function () {
// 		// pic counts
// 		// button group (edit, delete)
// 		// title
// 		var titleBar = this.renderTitle();

// 		return (
// 			<div className="album-show-title">
// 				{titleBar}
// 				<span className="count">{this.state.picCount}</span>
// 				<TitleBtnGroup mode={this.props.mode}
// 											 history={this.props.history}
// 											 album={this.props.album}
// 											 onEditClick={this._onClickEdit}
// 											 onDeleteClick={this._onDelete} />
// 			</div>
// 		);
// 	},

// 	renderTitle: function () {
// 		var klass = (this.state.editing) ? "editing" : "";
// 		return (
// 			<input type="text"
// 						 placeholder="No Title"
// 						 onFocus={this.toggleToFocus}
// 						 onBlur={this.toggleToBlur}
// 						 className={klass}
// 						 valueLink={this.linkState("title")} />
// 		);
// 	}
// });
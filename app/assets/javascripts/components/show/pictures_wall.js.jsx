var PicturesWall = React.createClass({
	mixins: [ReactRouter.History],

	getInitialState: function () {
    return {
    	pictures: [],
    	isPanelShown: TogglerStore.isPanelShown()
    };
	},

	componentDidMount: function () {
		ApiUtil.fetchAllPictures();
		PictureStore.addAllPicturesChangedListener(this.onChange);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
	},

	componentWillUnmount: function () {
		PictureStore.removeAllPicturesChangedListener(this.onChange);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
	},

	onChange: function () {
		this.setState({pictures: PictureStore.all()});
	},

	_onSlide: function () {
		this.setState({ isPanelShown: TogglerStore.isPanelShown() });
	},

	getRandomSize: function (min, max) {
	  return Math.round(Math.random() * (max - min) + min);
	},

	render: function () {
		var indexKlass = "";
		var albums = AlbumStore.all();
		var size;
		var that = this;

		if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
		return (
			<div className="pictures-wall" id="photos">
				<AlbumsIndexContainer albums={albums}
															history={this.history}
															klass={indexKlass}
															params={this.props.params} />
				{this.state.pictures.map(function (pic) {
					size = "w_" + that.getRandomSize(200, 400);
					return <WallPicItem key={pic.id} picture={pic} size={size} />
				})}
			</div>
		);
	}
});

var WallPicItem = React.createClass({
	render: function () {
		var url = APP_CONFIG.ImageUrlByOptions(
			this.props.picture.picture_url,
			this.props.size
		);

		return (
			<div className="img-thumb"
					 draggable="true"
					 onDragStart={this.handleDragStart}
					 onDragEnd={this.handleDragEnd}>
				<img src={url} onClick={this.handleClick} />
				<div className="thumb-tools">
					<span className="thumb-delete glyphicon glyphicon-trash"
								onClick={this.handleClickDelete}></span>
				</div>
			</div>
		);
	}
})
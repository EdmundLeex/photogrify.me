var PicturesWall = React.createClass({
	mixins: [ReactRouter.History],

	getInitialState: function () {
    return {
    	pictures: [],
    	isPanelShown: TogglerStore.isPanelShown(),
    	enlargedImg: null
    };
	},

	componentDidMount: function () {
		ApiUtil.fetchAllPictures();
		PictureStore.addAllPicturesChangedListener(this.onChange);
		PictureStore.addTogglePictureListener(this._onEnlarge);
		TogglerStore.addToggleIndexPanelListener(this._onSlide);
	},

	componentWillUnmount: function () {
		PictureStore.removeAllPicturesChangedListener(this.onChange);
		PictureStore.removeTogglePictureListener(this._onEnlarge);
		TogglerStore.removeToggleIndexPanelListener(this._onSlide);
	},

	onChange: function () {
		this.setState({pictures: PictureStore.all()});
	},

	_onSlide: function () {
		this.setState({ isPanelShown: TogglerStore.isPanelShown() });
	},

	_onEnlarge: function () {
		this.setState({ enlargedImg: PictureStore.enlargedImg() });
	},

	getRandomSize: function (min, max) {
	  return Math.round(Math.random() * (max - min) + min);
	},

	onImgClick: function (picture) {
		ComponentActions.toggleImg(picture);
	},

	onLeftClick: function () {
		var nextImg = PictureStore.nextImg(-1);
		ComponentActions.toggleImg(nextImg);
	},

	onRightClick: function () {
		var nextImg = PictureStore.nextImg(1);
		ComponentActions.toggleImg(nextImg);
	},

	handleOverlayClick: function () {
		ComponentActions.slideOut(false);
	},

	render: function () {
		var indexKlass = "";
		var albums = AlbumStore.all();
		var size;
		var that = this;
		var showOverlay = (this.state.isPanelShown) ? "" : "behind";
		var imgFrame = (this.state.enlargedImg) ?
			<PictureFrame picture={this.state.enlargedImg}
										handleClick={this.onImgClick}
										handleClickLeft={this.onLeftClick}
										handleClickRight={this.onRightClick} /> : "";

		if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
		return (
			<div className="pictures-wall-wrapper">
				{imgFrame}
				<div className={"album-main-overlay " + showOverlay}
						 onClick={this.handleOverlayClick}></div>
				<AlbumsIndexContainer albums={albums}
															history={this.history}
															klass={indexKlass}
															params={this.props.params} />
				<div className="pictures-wall clearfix">
					{this.state.pictures.map(function (pic) {
						return <WallPicItem key={pic.id}
																picture={pic}
																handleClick={this.onImgClick} />
					}, this)}
				</div>
			</div>
		);
	}
});

var WallPicItem = React.createClass({
	handleClick: function () {
		this.props.handleClick(this.props.picture);
	},

	render: function () {
		var url = APP_CONFIG.ImageUrlByOptions(
			this.props.picture.picture_url,
			"w_400,h_400,c_fill"
		);

		var divStyle = {backgroundImage: 'url(' + url + ')'};

		return (
			<div className="pic-wall-thumb"
					 style={divStyle}
					 onClick={this.handleClick}>
			</div>
		);
	}
})
(function(root){
	root.MapMain = React.createClass({
		getInitialState: function () {
	    return {
	    	pictures: PictureStore.all(),
	    	filterParams: FilterParamsStore.params(),
	    	enlargedImg: null,
	    	albums: AlbumStore.all(),
				isPanelShown: false,
	    };
		},

		_onChange: function () {
			this.setState({ albums: AlbumStore.all() });
		},

		_onSlide: function () {
			this.setState({ isPanelShown: TogglerStore.isPanelShown() });
		},

		_picturesChanged: function(){
      this.setState({pictures: PictureStore.all()});
    },

    _filtersChanged: function () {
      this.setState({ filterParams: FilterParamsStore.params() });
      // ApiUtil.fetchAllPictures();
      ApiUtil.fetchPicturesByFilter();
    },

    _onEnlarge: function () {
    	this.setState({ enlargedImg: PictureStore.enlargedImg() });
    },

    onMarkerClick: function (picture) {
    	this.onImgClick(picture);
    },

    onMarkerHover: function (picture) {
    	// show image
    	this.showPreview(picture);
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

    showPreview: function (picture) {
    	// show preview on top left corner or highlight picture in list
    },

    componentWillMount: function () {
    	ComponentActions.slideOut(false);
    },

		componentDidMount: function(){
			AlbumStore.addAlbumsIndexChangeListener(this._onChange);
      PictureStore.addAllPicturesChangedListener(this._picturesChanged);
      PictureStore.addTogglePictureListener(this._onEnlarge);
      FilterParamsStore.addChangeListener(this._filtersChanged);
      TogglerStore.addToggleIndexPanelListener(this._onSlide);
      ApiUtil.fetchAllAlbums(true);
      ApiUtil.fetchAllPictures();
    },

    componentWillUnmount: function(){
    	AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
      PictureStore.removeAllPicturesChangedListener(this._picturesChanged);
      PictureStore.removeTogglePictureListener(this._onEnlarge);
      TogglerStore.removeToggleIndexPanelListener(this._onSlide);
      // FilterParamsStore.removeChangeListener(this._filtersChanged);
    },

		render: function () {
			var indexKlass;
			if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
			var imgFrame = (this.state.enlargedImg) ?
			<PictureFrame picture={this.state.enlargedImg}
										handleClick={this.onImgClick}
										handleClickLeft={this.onLeftClick}
										handleClickRight={this.onRightClick} /> : "";

			return (
				<div className="album-show-main">
					{imgFrame}
					<AlbumsIndexContainer albums={this.state.albums}
																history={this.history}
																klass={indexKlass}
																params={this.props.params} />
					<Map pictures={this.state.pictures}
							 onMarkerClick={this.onMarkerClick}
							 onMarkerHover={this.onMarkerHover} />
					<div className="map-pic-list">
						<PicturesCollection pictures={this.state.pictures}
																handleClick={this.onImgClick}
																isDeletable={false} />
					</div>
				</div>
			);
		}
	})
})(this);
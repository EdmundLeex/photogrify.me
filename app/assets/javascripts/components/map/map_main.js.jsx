(function(root){
	root.MapMain = React.createClass({
    mixins: [
      React.addons.PureRenderMixin,
      // JoyrideMixin,
      ReactRouter.History
    ],

		getInitialState: function () {
	    return {
	    	pictures: PictureStore.all(),
	    	filterParams: FilterParamsStore.params(),
	    	enlargedImg: null,
	    	albums: AlbumStore.all(),
				isPanelShown: false,
				highlightPicture: null,
				isPicListShown: TogglerStore.isPicListShown()
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
      ApiUtil.fetchPicturesByFilter();
    },

    _onEnlarge: function () {
    	this.setState({ enlargedImg: PictureStore.enlargedImg() });
    },

    _onMarkerHighlight: function () {
    	this.setState({ highlightPicture: PictureStore.highlightPicture() });
      this._onImgHighlight();
    },

    _onImgHighlight: function () {
      var highlightPicture = PictureStore.highlightPicture();
      this.markers.forEach(function (marker) {
        if (highlightPicture && marker.pictureId === highlightPicture.id) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          marker.setAnimation(null);
        }
      }, this)
    },

    _onTogglePicList: function () {
    	this.setState({ isPicListShown: TogglerStore.isPicListShown() });
    },

    onMarkerClick: function (picture) {
    	this.onImgClick(picture);
    },

    onMarkerHover: function (picture) {
    	// show image
    	this.showPreview(picture);
    },

    onImgHover: function (picture) {
      ComponentActions.highlightPicture(picture);
    },

    onImgUnhover: function () {
      ComponentActions.highlightPicture(null);
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

    onCollapse: function () {
    	ComponentActions.togglePicList();
    },

    showPreview: function (picture) {
    	ComponentActions.highlightPicture(picture);
    },

    componentWillMount: function () {
    	ComponentActions.slideOut(false);
      this.markers = [];

      // this.joyrideSetOptions({
      //   showSkipButton: true,
      //   tooltipOffset: 10,
      //   showStepsProgress: true,

      //   stepCallback: function(step) {
      //     // console.log(step);
      //   },

      //   completeCallback: function(steps) {
      //     // console.log(steps);
      //   }
      // });
    },

		componentDidMount: function(){
      // this.joyrideReplaceSteps(APP_CONFIG.MapTour);
      // this.joyrideStart();

			AlbumStore.addAlbumsIndexChangeListener(this._onChange);
      PictureStore.addAllPicturesChangedListener(this._picturesChanged);
      PictureStore.addTogglePictureListener(this._onEnlarge);
      FilterParamsStore.addChangeListener(this._filtersChanged);
      TogglerStore.addToggleIndexPanelListener(this._onSlide);
      TogglerStore.addTogglePicListListener(this._onTogglePicList);
      PictureStore.addHighlightPictureListener(this._onMarkerHighlight);
      ComponentActions.switchTab('map');
      ApiUtil.fetchAllAlbums(true);
      ApiUtil.fetchAllPictures();
    },

    componentWillUnmount: function(){
    	AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
      PictureStore.removeAllPicturesChangedListener(this._picturesChanged);
      PictureStore.removeTogglePictureListener(this._onEnlarge);
      TogglerStore.removeToggleIndexPanelListener(this._onSlide);
      TogglerStore.removeTogglePicListListener(this._onTogglePicList);
      PictureStore.removeHighlightPictureListener(this._onMarkerHighlight);
      // FilterParamsStore.removeChangeListener(this._filtersChanged);
    },

		render: function () {
			var indexKlass = "",
					picListKlass = "";
			if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
			if (!this.state.isPicListShown) {picListKlass = "collapsed"; }
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
							 onMarkerHover={this.onMarkerHover}
               highlightPicture={this.state.highlightPicture}
               markers={this.markers} />
					<div className={"map-pic-list " + picListKlass}>
						<div className={"collapse-btn " + picListKlass}
								 onClick={this.onCollapse}></div>
						<PicturesCollection pictures={this.state.pictures}
																handleClick={this.onImgClick}
																isDeletable={false}
																highlightPicture={this.state.highlightPicture}
                                handleImgHover={this.onImgHover}
                                handleImgUnhover={this.onImgUnhover} />
					</div>
				</div>
			);
		}
	})
})(this);
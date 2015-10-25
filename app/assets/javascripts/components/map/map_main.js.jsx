(function(root){
	root.MapMain = React.createClass({
		getInitialState: function () {
	    return {
	    	pictures: PictureStore.all(),
	    	filterParams: FilterParamsStore.params(),
	    	enlargedImg: null
	    };
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

		componentDidMount: function(){
      PictureStore.addAllPicturesChangedListener(this._picturesChanged);
      PictureStore.addTogglePictureListener(this._onEnlarge);
      FilterParamsStore.addChangeListener(this._filtersChanged);
      ApiUtil.fetchAllPictures();
    },

    componentWillUnmount: function(){
      PictureStore.removeAllPicturesChangedListener(this._picturesChanged);
      PictureStore.removeTogglePictureListener(this._onEnlarge);
      // FilterParamsStore.removeChangeListener(this._filtersChanged);
    },

		render: function () {
			var imgFrame = (this.state.enlargedImg) ?
			<PictureFrame picture={this.state.enlargedImg}
										handleClick={this.onImgClick}
										handleClickLeft={this.onLeftClick}
										handleClickRight={this.onRightClick} /> : "";

			return (
				<div className="album-show-main">
					{imgFrame}
					<Map pictures={this.state.pictures}
							 onMarkerClick={this.onMarkerClick}
							 onMarkerHover={this.onMarkerHover} />
					<div className="map-pic-list">
						<PicturesCollection pictures={this.state.pictures}
																handleClick={this.onImgClick} />
					</div>
				</div>
			);
		}
	})
})(this);
(function(root){
	root.MapMain = React.createClass({
		getInitialState: function () {
	    return {
	    	pictures: PictureStore.all(),
	    	filterParams: FilterParamsStore.params()
	    };
		},

		_picturesChanged: function(){
      this.setState({pictures: PictureStore.all()});
    },

    _filtersChanged: function () {
      this.setState({ filterParams: FilterParamsStore.params() });
      ApiUtil.fetchAllPictures();
    },

		componentDidMount: function(){
      PictureStore.addAllPicturesChangedListener(this._picturesChanged);
      FilterParamsStore.addChangeListener(this._filtersChanged);
      ApiUtil.fetchAllPictures();
    },

    componentWillUnmount: function(){
      PictureStore.removeAllPicturesChangedListener(this._picturesChanged);
      // FilterParamsStore.removeChangeListener(this._filtersChanged);
    },

		render: function () {
			return (
				<div className="album-show-main">
					<Map pictures={this.state.pictures} />
				</div>
			);
		}
	})
})(this);
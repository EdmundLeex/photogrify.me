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

	render: function () {
		var indexKlass = "";
		var albums = AlbumStore.all();

		if (!this.state.isPanelShown) { indexKlass = "slide-out"; }
		return (
			<div className="pictures-wall">
				<AlbumsIndexContainer albums={albums}
															history={this.history}
															klass={indexKlass}
															params={this.props.params} />
				<PicturesCollection pictures={this.state.pictures} />
			</div>
		);
	}
});
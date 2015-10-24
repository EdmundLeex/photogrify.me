var SearchBox = React.createClass({
	getInitialState: function () {
    return {searchTxt: ""};
	},

	componentDidMount: function () {
		AlbumStore.addSearchAlbumListener(this.onChange);
	},

	componentWillUnmount: function () {
		AlbumStore.removeSearchAlbumListener(this.onChange);
	},

	onChange: function () {
		this.setState({searchTxt: AlbumStore.queryStr()});
	},

	handleInput: function (e) {
		ComponentActions.searchAlbum(e.currentTarget.value);
	},

	render: function () {
		return (
			<div className="search-box" tabIndex="-1">
				<span className="glyphicon glyphicon-search"></span>
				<input type="text"
							 placeholder="search"
							 onChange={this.handleInput}
							 value={this.state.searchTxt} />
			</div>
		);
	}
});
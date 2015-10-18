var AlbumsIndexContainer = React.createClass({
	render: function () {
		return (
			<div className="albums-index-container">
				<div className="albums-index-title">
					Albums
					<SearchBox />
				</div>
				<AlbumsIndex albums={this.props.albums}
										 history={this.props.history}
										 params={this.props.params} />
			</div>
		);
	}
});
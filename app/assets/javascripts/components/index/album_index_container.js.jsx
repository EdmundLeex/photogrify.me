var AlbumsIndexContainer = React.createClass({
	render: function () {
		return (
			<div className={"albums-index-container " + this.props.klass}>
				<div className="albums-index-title">
					<SearchBox />
				</div>
				<AlbumsIndex albums={this.props.albums}
										 history={this.props.history}
										 params={this.props.params}
										 isDragging={this.props.isDragging} />
			</div>
		);
	}
});
var AlbumTitleText = React.createClass({
	render: function () {
		var klass = (this.props.editing) ? "editing" : "";
		return (
			<input type="text"
						 onFocus={this.handleFocus}
						 onChange={this.handleChange}
						 className={klass}
						 value={this.props.text}>
			</input>
		);
	},

	handleFocus: function (e) {
		var title = e.target.value;
		this.props.handleTitleClick(title);
	},

	
});
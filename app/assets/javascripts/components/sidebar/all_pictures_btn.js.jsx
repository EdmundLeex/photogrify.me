var AllPicturesBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>
				<span className="glyphicon glyphicon-th"></span>
			</div>
		);
	},

	onClickHandler: function () {
		// fetech all pictures
		// call ApiUtil.fetchAllPictures
	}
});
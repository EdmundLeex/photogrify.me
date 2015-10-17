var AllPicturesBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}>Pictures</div>
		);
	},

	onClickHandler: function () {
		// fetech all pictures
		// call ApiUtil.fetchAllPictures
	}
});
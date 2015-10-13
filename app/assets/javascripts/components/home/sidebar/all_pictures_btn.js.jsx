var AllPicturesBtn = React.createClass({
	render: function () {
		return (
			<div className="sidebar-thumbs" onClick={this.onClickHandler}></div>
		);
	},

	onClickHandler: function () {
		// fetech all pictures
		// call ApiUtil.fetchAllPictures
	}
});
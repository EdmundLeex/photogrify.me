var AlbumShow = React.createClass({
	// getInitialState: function () {
 //    return { album: album };
	// },

	// componentDidMount: function () {
	// 	AlbumStore.addAlbumsIndexChangeListener(this._onChange);
	// 	ApiUtil.fetchPicturesFromOneAlbum();
	// },

	// componentWillUnmount: function () {
	// 	AlbumStore.removeAlbumsIndexChangeListener(this._onChange);
	// },

	// _onChange: function () {
	// 	this.setState({ album: AlbumStore.find(id) });
	// },

	render: function () {
		return (
			<div className="album-show">
				<AlbumShowTitle />
				<PicturesCollection />
			</div>
		);
	}
});
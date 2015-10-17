var Home = React.createClass({
	// getInitialState: function () {
 //    return {mode: 'view'};
	// },

	// componentDidMount: function () {
	// 	AlbumStore.addToggleModeListener(this._onSwitchMode);
	// },

	// componentWillUnmount: function () {
	// 	AlbumStore.removeToggleModeListener(this._onSwitchMode);
	// },

	// _onSwitchMode: function () {
	// 	this.setState({mode: AlbumStore.currentMode()});
	// },

	render: function () {
		return (
			<div className="main">
				<AlbumShowMain />
			</div>
		);
	}
});
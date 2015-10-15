var Home = React.createClass({
	getInitialState: function () {
    return {mode: 'view'};
	},

	componentDidMount: function () {
		AlbumStore.addToggleModeListener(this._onSwitchMode);
	},

	componentWillUnmount: function () {
		AlbumStore.removeToggleModeListener(this._onSwitchMode);
	},

	_onSwitchMode: function () {
		this.setState({mode: AlbumStore.currentMode()});
	},

	render: function () {
		return (
			<div className="main">
				<Sidebar onSwitchMode={this._onSwitchMode}/>
				{(this.state.mode === 'new') ?
					<AlbumNewMain mode={this.state.mode}/> :
					<AlbumShowMain mode={this.state.mode}/>}
			</div>
		);
	}
});
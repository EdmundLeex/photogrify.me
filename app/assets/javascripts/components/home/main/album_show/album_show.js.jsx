var AlbumShow = React.createClass({
	getInitialState: function () {
    return {mode: "view"};
	},

	componentDidMount: function () {
		AlbumStore.addToggleModeListener(this._onModeChange);
	},

	_onToggleMode: function (mode) {
		ComponentActions.toggleMode(mode);
	},

	_onModeChange: function () {
		this.setState({mode: AlbumStore.currentMode()});
	},

	render: function () {
		return (
			<div className="album-show">
				<AlbumShowTitle handleClickEdit={this._onToggleMode}/>
				{(this.state.mode === 'view') ?
					<PicturesCollection /> :
					<AlbumForm />}
			</div>
		);
	}
});
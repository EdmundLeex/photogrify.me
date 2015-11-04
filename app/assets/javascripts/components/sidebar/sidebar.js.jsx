var Sidebar = React.createClass({
	mixins: [ReactRouter.History],

	getInitialState: function () {
    return {
    	tabSelected: TogglerStore.tabSelected()
    };
	},

	componentDidMount: function () {
		TogglerStore.addSwitchListener(this._onTabSwitch);
	},

	componentWillUnmount: function () {
		TogglerStore.removeSwitchListener(this._onTabSwitch);
	},

	_onTabSwitch: function () {
		this.setState({tabSelected: TogglerStore.tabSelected()});
	},

	handleClickLogo: function () {
		ComponentActions.slideOut(true);
		this.history.pushState(null, '/');
	},

	handleClickMap: function () {
		ComponentActions.switchTab('map');
		this.history.pushState(null, '/map');
	},

	render: function () {
		return (
			<div className="sidebar">
				<div className="logo sidebar-thumbs"
						 onClick={this.handleClickLogo}
						 data-toggle="tooltip" title="HOME">
					<img src="images/logo-sidebar.png" alt=""/>
				</div>
				<div className="sidebar-btn-group">
					<CreateAlbumBtn history={this.history}
													selected={this.state.tabSelected === "new"} />
					<AllAlbumsBtn history={this.history}
												selected={this.state.tabSelected === "album"} />
					<AllPicturesBtn history={this.history}
													selected={this.state.tabSelected === "pictures"} />
					<div className={"sidebar-thumbs map-icon " + ((this.state.tabSelected === "map") ? "selected" : "")}
							 onClick={this.handleClickMap}
							 data-toggle="tooltip" title="WORLD MAP">
					</div>
				</div>
				<UserMenuBtn />
			</div>
		);
	}
});

$(function () {
	var RouteHandler = ReactRouter.RouteHandler;
	var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var root = document.getElementById('main');

	// prevent sign up page rendering react components
  if (root) {
  	window.NEW_ALBUM_PATH = "NEW_ALBUM_PATH";
  	var App = React.createClass({
  		componentDidMount: function () {
  			setInterval(this._checkAlbums, 10000)
  		},

  		_checkAlbums: function () {
  			if (AlbumStore.all().length === 0) {
  			console.log('checking albums');
  				ApiUtil.fetchAllAlbums();
  			}
  		},

	    render: function(){
	      return (
          <div>
          	<FeedbackMsg />
          	<Sidebar />
            {this.props.children}
          </div>
	      );
	    }
	  });

		React.render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={AlbumsMain} />
					<Route path="albums" component={AlbumsMain}>
						<Route path="/albums/:albumId/show" component={AlbumShow} />
						<Route path="/albums/:albumId/edit" component={Edit} />
					</Route>
					<Route path="new" component={New} />
					<Route path="pictures" component={PicturesWall} />
				</Route>
			</Router>
		), root);
	}
});
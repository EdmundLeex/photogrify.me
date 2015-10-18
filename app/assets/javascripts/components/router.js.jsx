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
	    render: function(){
	      return (
          <div>
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
					<Route path="search" component={SearchBox} />
				</Route>
			</Router>
		), root);
	}
});
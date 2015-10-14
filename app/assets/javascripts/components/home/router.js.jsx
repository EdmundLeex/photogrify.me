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
            {this.props.children}
          </div>
	      );
	    }
	  });

		React.render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home} />
					<Route path="new" component={AlbumNew} />
				</Route>
			</Router>
		), root);
	}
});
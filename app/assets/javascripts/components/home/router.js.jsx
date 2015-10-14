$(function () {
	var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var root = document.getElementById('main');

	// prevent sign up page rendering react components
  if (root) {
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
					<Route path="new" components={{sidebar: Sidebar,
																				 albumsIndexContainer: AlbumsIndexContainer}} />
				</Route>
			</Router>
		), root);
	}
});
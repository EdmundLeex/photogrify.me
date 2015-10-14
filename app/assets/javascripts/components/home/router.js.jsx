$(function () {
	var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var root = document.getElementById('main');

	// prevent sign up page rendering react components
  if (root) {
		React.render((
			<Router>
				<Route path="/" component={Home}>
					<Route path="new" components={{sidebar: Sidebar,
																				 albumsIndexContainer: AlbumsIndexContainer}} />
				</Route>
			</Router>
		), root);
	}
});
$(function () {
	var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var root = document.getElementById('main');

	React.render((
		<Router>
			<Router path="/" component={Home} />
		</Router>
	), root);
});
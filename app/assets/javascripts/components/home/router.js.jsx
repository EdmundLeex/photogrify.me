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
						<Route path="/albums/:albumId" component={AlbumShow} />
						<Route path="/albums/:albumId/edit" component={AlbumForm} />
					</Route>

					<Route>
						<Route path="title" component={AlbumShowTitle} />
						<Route path="pictures" component={PicturesCollection}>
							<Route path="PictureItem" component={PictureItem} />
						</Route>
					</Route>

					<Route path="new" component={AlbumNewMain} />
				</Route>
			</Router>
		), root);
	}
});
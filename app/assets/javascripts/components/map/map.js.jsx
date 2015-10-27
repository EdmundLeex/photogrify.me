(function(root){
  function _getCoordsObj(latLng) {
    return {
      lat: latLng.lat(),
      lng: latLng.lng(),
      infoWindow: null
    };
  }

  var CENTER = {lat: 37.7758, lng: -122.435};

  root.Map = React.createClass({
    componentDidMount: function(){
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: this.centerCoords(),
        zoom: 8,
        styles: APP_CONFIG.MAP_STYLE
      };
      this.map = new google.maps.Map(map, mapOptions);
      this.registerListeners();
      this.markers = this.props.markers;
      this.setState({infoWindow: new google.maps.InfoWindow({})});
    },

    centerCoords: function () {
      return CENTER;
    },

    componentDidUpdate: function (oldProps) {
      this._onChange();
    },

    _onChange: function(){
      var pictures = this.props.pictures;
      var toAdd = [], toRemove = this.markers.slice(0);
      pictures.forEach(function(picture, idx){
        var idx = -1;
        //check if picture is already on map as a marker
        for(var i = 0; i < toRemove.length; i++){
          if(toRemove[i].pictureId == picture.id){
            idx = i;
            break;
          }
        }
        if(idx === -1){
          //if it's not already on the map, we need to add a marker
          toAdd.push(picture);
        } else {
          //if it IS already on the map AND in the store, we don't need
          //to remove it
          toRemove.splice(idx, 1);
        }
      });
      toAdd.forEach(this.createMarkerFromPicture);
      toRemove.forEach(this.removeMarker);

      if (this.props.singleBench) {
        this.map.setOptions({draggable: false});
        this.map.setCenter(this.centerBenchCoords());
      }
    },

    componentWillUnmount: function(){
    },

    registerListeners: function(){
      var that = this;
      google.maps.event.addListener(this.map, 'idle', function() {
        var bounds = that.map.getBounds();
        var northEast = _getCoordsObj(bounds.getNorthEast());
        var southWest = _getCoordsObj(bounds.getSouthWest());
        //actually issue the request
        var bounds = {
          northEast: northEast,
          southWest: southWest
        };
        console.log(bounds);
        FilterActions.updateBounds(bounds);
      });
    },

    createMarkerFromPicture: function (picture) {
      var that = this;
      var imgUrl = APP_CONFIG.ImageUrlByOptions(
        picture.picture_url,
        APP_CONFIG.MAP_PREVIEW_SIZE
      );
      var infoContent = "<img src='" + imgUrl + "' />";
      var pos = new google.maps.LatLng(picture.lat, picture.lng);
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        pictureId: picture.id,
        animation: google.maps.Animation.DROP,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZZJREFUSA2dlL0uRUEUhS+JcElQ+AsaEoXKE1BqFBql3kOIN/AAEoUo1RIdBYlSRIPETyIUEgWdkOBbcuaa7Lvnzlw7WZmZtddac07mzOmo5WsWyTxYqEY5TsBxNV6KaLfqGNbANfjOQBpp5SmuXZS5YNuXp6hWUFlz6VreljVO9xWUBlqdvMpI1g4da9L6DKwDHbiguThPqwy3hmA/gDUlDWjVs3plDIOmWoWx4he4gSblH6GeNNanrN/qDBNGvbqtPYg3S0Zr9aSx1ciKN6hbFetbh7PUnSVY9wQu3sB70skgbDFOOL1nh6t5Z/CIsPE0jkk9aewZLDna2pQjlHHTE1ecejZcX1Hywzh3DF9wh0Bv2FtBc3Hq2Q324ZKln5Y1xOt3+kLM2fliMp1GN7jPBNjAeK3feLaWUcSm0vknvrlseiX4z+96ozRcuj7gHXjqbQ7Qx3dKGdnSJXsAqdDA60H6s2kJwQz8EwhhdryiN5rwFtPTKG+ADb+AGytOyQhH6J+CsMkR88GMp+227sg22AJdpe4f/CLtDEPGQvkAAAAASUVORK5CYII="
      });
      marker.addListener('click', function () {
        that.props.onMarkerClick(picture);
      });
      marker.addListener('mouseover', function () {
        that.props.onMarkerHover(picture);
      });
      marker.addListener('mouseout', function () {
        that.props.onMarkerHover(null);
      });
      this.markers.push(marker);

      google.maps.event.addListener(marker, 'mouseover', function () {
        that.state.infoWindow.setContent(infoContent);
        that.state.infoWindow.open(that.map, marker);
      });

      google.maps.event.addListener(marker, 'mouseout', function () {
        that.state.infoWindow.close(that.map, marker);
      });
    },

    removeMarker: function(marker){
      for(var i = 0; i < this.markers.length; i++){
        if (this.markers[i].pictureId === marker.pictureId){
          this.markers[i].setMap(null);
          this.markers.splice(i, 1);
          break;
        }
      }
    },

    render: function(){
      return ( <div className="album-show-main map" ref="map">Map</div>);
    }
  });
})(this);

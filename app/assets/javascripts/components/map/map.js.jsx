(function(root){
  function _getCoordsObj(latLng) {
    return {
      lat: latLng.lat(),
      lng: latLng.lng()
    };
  }

  var CENTER = {lat: 37.7758, lng: -122.435};

  root.Map = React.createClass({
    componentDidMount: function(){
      console.log('map mounted');
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: this.centerCoords(),
        zoom: 8,
        styles: APP_CONFIG.MAP_STYLE
      };
      this.map = new google.maps.Map(map, mapOptions);
      this.registerListeners();
      this.markers = [];
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
      console.log("map UNmounted");
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
      // google.maps.event.addListener(this.map, 'click', function(event) {
      //   var coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      //   that.props.onMapClick(coords);
      // });
    },

    createMarkerFromPicture: function (picture) {
      var that = this;
      var pos = new google.maps.LatLng(picture.lat, picture.lng);
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        pictureId: picture.id
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

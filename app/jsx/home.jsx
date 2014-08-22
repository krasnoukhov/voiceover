/** @jsx React.DOM */
var Home = React.createClass({
  getInitialState: function () {
    return { loaded: false, items: [] };
  },

  componentDidMount: function () {
    $.ajax({
      url: "/api/countries/counts",
      dataType: "json",
      success: function(data) {
        this.setState({ loaded: true, items: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    })
  },

  componentDidUpdate: function() {
    if($(".home .map").length == 0) { return; }

    var map = new google.maps.Map($(".home .map")[0], {
      zoom: 2,
      center: new google.maps.LatLng(30, 10),
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    this.state.items.forEach(function(item) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.country.lat, item.country.lng),
        map: map,
        icon: "//maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });

      var infowindow = new google.maps.InfoWindow({
        content: "See " + item.count + " " + (item.count == 1 ? "story" : "stories") + " from " + item.country.title
      });

      google.maps.event.addListener(marker, "mouseover", function() {
        infowindow.open(map, this);
      });

      google.maps.event.addListener(marker, "mouseout", function() {
        infowindow.close();
      });

      google.maps.event.addListener(marker, "click", function() {
        Router.transitionTo("country", { id: item.country.id })
      });

      item.marker = marker;
    });
  },

  render: function() {
    return (
      <section className="col-md-9 home">
        <Loader loaded={this.state.loaded} color="#fff">
          <div className="map"></div>
        </Loader>
      </section>
    );
  }
});

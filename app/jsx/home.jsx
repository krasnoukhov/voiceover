/** @jsx React.DOM */
var Home = React.createClass({
  componentDidMount: function() {
    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(20,10)
    }

    var map = new google.maps.Map($(".home .map")[0], mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
    });
  },

  render: function() {
    return (
      <section className="col-md-9 home">
        <div className="map"></div>
      </section>
    );
  }
});

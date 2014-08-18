/** @jsx React.DOM */
var PhotosIndex = React.createClass({
  getInitialState: function () {
    return { loaded: false, items: [] };
  },

  componentDidMount: function () {
    $.ajax({
      url: "/api/photos",
      dataType: "json",
      success: function(data) {
        this.setState({ loaded: true, items: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    })
  },

  render: function() {
    return (
      <section className="col-md-8 photos">
        <Loader loaded={this.state.loaded} color="#fff">
          {this.state.items.map(function(item) {
            return (
              <Photo key={item.id} item={item} />
            )
          }.bind(this))}
        </Loader>
      </section>
    );
  }
});

var PhotoShow = React.createClass({
  render: function() {
    return (
      <div>
        PHOTO
      </div>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var src = "http://theoldreader.com/kittens/200/150?"+Math.random().toString();

    return (
      <div>
        <img src={src} />
      </div>
    );
  }
});

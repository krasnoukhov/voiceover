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
      <section className="col-md-9 photos">
        <Loader loaded={this.state.loaded} color="#fff">
          <ul className="list-unstyled row">
          {this.state.items.map(function(item) {
            return (
              <li key={item.id} className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <Photo item={item} />
              </li>
            )
          }.bind(this))}
          </ul>
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
    var src = "http://theoldreader.com/kittens/260/170?"+Math.random().toString();
    var style = {
      "background-image": "url(" + src + ")"
    };

    return (
      <Link to="photo" id={this.props.item.id} style={style}></Link>
    );
  }
});

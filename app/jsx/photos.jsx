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
                <p class="text-muted">{item.title}</p>
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
      <section className="col-md-9 photo">
        PHOTO
      </section>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var style = {
      "background-image": "url(/static/thumbnail/" + this.props.item.basename + ")"
    };

    return (
      <Link to="photo" id={this.props.item.id} style={style}></Link>
    );
  }
});

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
      <div>
        <section className="col-md-9 photos">
          <Loader loaded={this.state.loaded} color="#fff">
            <ul className="list-unstyled row">
            {this.state.items.map(function(item) {
              return (
                <li key={item.id} className="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                  <Photo type="thumbnail" item={item} />
                  <p className="text-muted">{item.title}</p>
                </li>
              )
            }.bind(this))}
            </ul>
          </Loader>
        </section>
        <section className="fotorama" data-auto="false">
        {this.state.items.map(function(item) {
          return (
            <Photo key={item.id} type="original" item={item} />
          )
        }.bind(this))}
        </section>
      </div>
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
    type: React.PropTypes.string.isRequired
  },

  id: function() {
    return "photo-" + this.props.item.id;
  },

  click: function() {
    $(".fotorama").show().fotorama({
      width: "100%",
      height: "100%",
      nav: "thumbs",
      keyboard: true
    });
    $(".fotorama").data("fotorama").show(this.id());

    $(document).bind("keydown", this.keydown);
  },

  keydown: function(evt) {
    if(evt.keyCode == 27) {
      $(".fotorama").hide();
    }
  },

  componentWillUnmount: function() {
    $(document).unbind("keydown", this.keydown);
    $(".fotorama").data("fotorama").destroy();
  },

  render: function() {
    var thumb = "/static/thumbnail/" + this.props.item.basename;
    var style = {
      "background-image": "url(/static/" + this.props.type + "/" + this.props.item.basename + ")"
    };

    return (
      <div style={style} id={this.id()} data-thumb={thumb} onClick={this.click}>-</div>
    );
  }
});

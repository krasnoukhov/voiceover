/** @jsx React.DOM */
var PhotosIndex = React.createClass({
  propTypes: {
    classNames: React.PropTypes.string,
    onUpdate: React.PropTypes.func,
  },

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

  componentDidUpdate: function() {
    if(this.props.onUpdate) {
      this.props.onUpdate();
    }
  },

  render: function() {
    var classNames = "photos " + (this.props.classNames || "col-md-9");

    return (
      <section className={classNames}>
        <button type="button" className="hidden close"><span aria-hidden="true">{'\u00d7'}</span><span className="sr-only">Close</span></button>
        <PhotosWidget loaded={this.state.loaded} items={this.state.items} />
        <FotoramaWidget items={this.state.items} />
      </section>
    );
  }
});

var PhotosWidget = React.createClass({
  propTypes: {
    loaded: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <Loader loaded={this.props.loaded} color="#fff">
        <ul className="list-unstyled row grid">
        {this.props.items.map(function(item) {
          return (
            <li key={item.id} className="col-sm-4 col-md-4 col-lg-3">
              <PhotoWidget type="thumbnail" item={item} />
              <p className="text-muted">{item.title}</p>
            </li>
          )
        }.bind(this))}
        </ul>
      </Loader>
    )
  }
});

var FotoramaWidget = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <div className="fotorama" data-auto="false">
      {this.props.items.map(function(item) {
        return (
          <PhotoWidget key={item.id} type="original" item={item} />
        )
      }.bind(this))}
      </div>
    )
  }
});

var PhotoWidget = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired
  },

  id: function() {
    return "photo-" + this.props.item.id;
  },

  click: function() {
    // Can't do
    if ($(".photos:visible").length == 0) {
      return false;
    }

    $(".photos .close").removeClass("hidden").bind("click", this.hideFotorama);
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
      this.hideFotorama();
    }
  },

  hideFotorama: function() {
    $(".photos .close").addClass("hidden");
    $(".fotorama").hide();
  },

  componentWillUnmount: function() {
    $(document).unbind("keydown", this.keydown);
  },

  render: function() {
    var thumb = "/static/thumbnail/" + this.props.item.basename;
    var style = {
      "background-image": "url(/static/" + this.props.type + "/" + this.props.item.basename + ")"
    };

    return (
      <div style={style} id={this.id()} data-photoid={this.props.item.id} data-thumb={thumb} onClick={this.click}>-</div>
    );
  }
});

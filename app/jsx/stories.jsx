/** @jsx React.DOM */
var PHOTOS_LIMIT = 36;

var StoriesIndex = React.createClass({
  getInitialState: function () {
    return { loaded: false, country: {}, count: 0, items: [], photos: {} };
  },

  componentDidMount: function () {
    $.ajax({
      url: "/api/countries/" + this.props.params.id,
      dataType: "json",
      success: function(data) {
        this.setState({
          loaded: true,
          country: data.country,
          count: data.count,
          items: data.stories,
          photos: data.photos
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    })
  },

  render: function() {
    return (
      <section className="row stories">
        <Loader loaded={this.state.loaded} color="#fff">
          {/*
          <aside className="col-md-3">
            <h2>{this.state.country.title}</h2>
            <p>{this.state.count} {this.state.count == 1 ? "story" : "stories"}</p>
            <div className="links">
              <h2><Link to="app">Go back</Link></h2>
            </div>
          </aside>
          */}

          <section className="col-md-12">
            <ul className="list-unstyled row grid">
            {this.state.items.map(function(item) {
              var photo_ids = item.photo_ids.split(",")
              var photo = this.state.photos[photo_ids[0]]
              var style = {
                "background-image": "url(/static/thumbnail/" + photo.basename + ")"
              };
              var title = "";
              if(item.name) {
                title += item.name + ", "
              }
              title += item.age + " years";

              return (
                <li key={item.id} className="col-sm-4 col-md-4 col-lg-3">
                  <Link to="story" id={item.id}><div style={style}>-</div></Link>
                  <p className="text-muted">{title}</p>
                </li>
              )
            }.bind(this))}
            </ul>
          </section>
        </Loader>
      </section>
    );
  }
});

var NewStory = React.createClass({
  getInitialState: function () {
    return { step: 0, items: [], countries: [] };
  },

  destinationItems: function() {
    return $.map($(".destination li div"), function(x) {
      return parseInt($(x).attr("data-photoid"))
    });
  },

  onPhotosUpdate: function() {
    this.updateDestination();

    $("section ul").sortable({
      connectWith: "section ul",
      start: function(evt, ui) {
        ui.placeholder.height(ui.item.outerHeight());
        $(".destination .sample").remove();
        $(".destination").addClass("ready");
      }.bind(this),
      stop: function(evt, ui) {
        this.setState({ items: this.destinationItems() })
        if(this.state.items.length > PHOTOS_LIMIT) {
          return false;
        }

        this.updateDestination();
        $(".destination").removeClass("ready");
      }.bind(this)
    }).disableSelection();
  },

  updateDestination: function() {
    $(".destination").css("minHeight", $(".source .grid").outerHeight() || "");
  },

  stepForward: function() {
    if(this.state.step >= 2) {
      this.lastStep();
    } else {
      this.setState({ step: this.state.step + 1 });
    }
  },

  stepBack: function() {
    this.setState({ step: this.state.step - 1 });
  },

  lastStep: function() {
    $.ajax({
      url: "/api/stories",
      dataType: "json",
      method: "POST",
      data: $("form").serialize() + "&story[photo_ids]=" + this.destinationItems().join(","),
      success: function(data) {
        Router.transitionTo("story", { id: data.id })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    })
  },

  inputChange: function() {
    var formValid = $(".js-story-form").data("bootstrapValidator").isValid() && $("#storyTerms").is(":checked");

    if(formValid && this.state.step == 1) {
      this.stepForward();
    }else if(!formValid && this.state.step == 2) {
      this.stepBack();
    }
  },

  termsChange: function() {
    $(".js-story-form").data("bootstrapValidator").validate();
    this.inputChange();
  },

  componentDidMount: function () {
    $.ajax({
      url: "/api/countries",
      dataType: "json",
      success: function(data) {
        this.setState({ countries: data })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    });
  },

  componentDidUpdate: function() {
    $("section ul").sortable({
      connectWith: "section ul"
    }).disableSelection();

    // Temporary hide source photos
    if(this.state.step >= 1) {
      $(".source").hide();
    } else {
      $(".source").show();
    }

    this.updateDestination();

    // Form
    if($(".js-story-form").length) {
      $(".js-story-form").bootstrapValidator({
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          "story[age]": {
            validators: {
              notEmpty: {},
              regexp: {
                regexp: /^[0-9]+$/,
              }
            }
          },
          "story[country]": {
            validators: {
              notEmpty: {},
              stringLength: {
                min: 2,
                max: 2,
                message: "Please choose country"
              }
            }
          },
          "story[description]": {
            validators: {
              notEmpty: {},
              stringLength: {
                max: 65000
              }
            }
          },
          "story[name]": {
            validators: {
              stringLength: {
                max: 30
              }
            }
          },
          "story[email]": {
            validators: {
              emailAddress: {
              }
            }
          }
        }
      });
    }
  },

  render: function() {
    var headerButton;
    if(this.state.items.length > 0 && this.state.step < 2) {
      if(this.state.step == 1) {
        var handler = this.stepBack;
        var buttonText = "Go back";
      } else {
        var handler = this.stepForward;
        var buttonText = "Next";
      }

      headerButton = (
        <button onClick={handler} className="btn btn-primary btn-header">{buttonText}</button>
      )
    }

    var formContent;
    if(this.state.step >= 1) {
      formContent = (
        <form className="form-horizontal js-story-form" role="form">
          <div className="form-group">
            <label htmlFor="storyAge" className="col-sm-2 control-label">Age</label>
            <div className="col-sm-10">
              <input onChange={this.inputChange} type="number" className="form-control" id="storyAge" name="story[age]" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyCountry" className="col-sm-2 control-label">Country</label>
            <div className="col-sm-10">
              <select onChange={this.inputChange} className="form-control" id="storyCountry" name="story[country]">
                <option>-- Choose from the list</option>
                {this.state.countries.map(function(item) {
                  return (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  )
                }.bind(this))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea onChange={this.inputChange} className="form-control" id="storyDescription" name="story[description]" rows="10" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyName" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input onChange={this.inputChange} type="text" className="form-control" id="storyName" name="story[name]" placeholder="Optional: stay in touch" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="storyEmail" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input onChange={this.inputChange} type="email" className="form-control" id="storyEmail" name="story[email]" placeholder="Optional: stay in touch" />
            </div>
          </div>
          <div className="form-group checkbox clearfix">
            <div className="col-sm-offset-2 col-sm-10">
              <label htmlFor="storyTerms">
                <input onChange={this.termsChange} type="checkbox" id="storyTerms" />
                <small>I voluntarily participated in the Voice-Over art project. I understand that the content of my submission will be publicly visible on the voiceoverproject.org website and may be used as part of installations and publications within the conceptual framework of this project in the future such as book publications, exhibition catalogs or traveling exhibitions without compromise of my personal information.</small>
              </label>
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.stepForward} className="form-control btn btn-big btn-primary" disabled={this.state.step != 2}>Add story</button>
            </div>
          </div>
        </form>
      )
    }

    return (
      <section className="row new-story">
        {headerButton}

        <div className="col-xs-6">
          {formContent}
          <PhotosIndex classNames="col-md-12 source" onUpdate={this.onPhotosUpdate} />
        </div>

        <div className="col-xs-6">
          <ul className="list-unstyled row grid destination">
            <li className="sample">
              <h3>Choose the order of photos by dragging and dropping here</h3>
              <p>Here, add your selection of images (min. 1 – max. 36) to create your own story and then press <strong>Next</strong> on the top right of the page.</p>
              <p>Once done, on the next page, you will be sent to a form where we ask you to put in basic information about yourself and include a text about your selection of images.</p>
            </li>
          </ul>
        </div>
      </section>
    );
  }
});

var StoryShow = React.createClass({
  getInitialState: function () {
    return { loaded: false, item: {}, country: {}, photos: [] };
  },

  componentDidMount: function () {
    $.ajax({
      url: "/api/stories/" + this.props.params.id,
      dataType: "json",
      success: function(data) {
        this.setState({
          loaded: true,
          item: data.story,
          country: data.country,
          photos: data.photos
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR failed")
      }.bind(this)
    })
  },

  render: function() {
    return (
      <section className="row story">
        <Loader loaded={this.state.loaded} color="#fff">
          <aside className="col-md-3">
            {this.state.item.name ? "<h2>{this.state.item.name}</h2>" : ""}
            <p>{this.state.country.title}, {this.state.item.age} years</p>
            <p>{this.state.item.description}</p>
            <div className="links">
              <h2><Link to="stories" id={this.state.country.id}>Go back</Link></h2>
            </div>
          </aside>

          <section className="col-md-9 photos">
            <button type="button" className="hidden close"><span aria-hidden="true">{'\u00d7'}</span><span className="sr-only">Close</span></button>
            <ul className="list-unstyled row grid">
            {this.state.photos.map(function(item) {
              return (
                <li key={item.id} className="col-sm-4 col-md-4 col-lg-3">
                  <PhotoWidget type="thumbnail" item={item} />
                </li>
              )
            }.bind(this))}
            </ul>
            <FotoramaWidget items={this.state.photos} />
          </section>
        </Loader>
      </section>
    );
  }
});

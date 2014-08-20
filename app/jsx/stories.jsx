/** @jsx React.DOM */
var PHOTOS_LIMIT = 36;

var NewStory = React.createClass({
  getInitialState: function () {
    return { step: 0, items: [], person: {} };
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
        this.setState({ "items": this.destinationItems() })
        if(this.state.items.length > PHOTOS_LIMIT) {
          return false;
        }

        this.updateDestination();
        $(".destination").removeClass("ready");
      }.bind(this)
    }).disableSelection();
  },

  updateDestination: function() {
    $(".destination").css("minHeight", $(".grid:first").outerHeight());
  },

  nextStep: function() {
    this.setState({ step: this.state.step + 1 })
    console.log(this.state.step);
  },

  componentDidUpdate: function() {
    $("section ul").sortable({
      connectWith: "section ul"
    }).disableSelection();
  },

  render: function() {
    var nextButton;
    if(this.state.items.length > 0) {
      var classNames = "btn btn-primary add-story";
      // TODO: form
      if(this.state.step == 1 && true) {
        classNames += " disabled";
      }

      nextButton = (
        <button className={classNames} onClick={this.nextStep}>Add story</button>
      )
    }

    var leftContent;
    if(this.state.step == 1) {
      leftContent = (
        <form>
          OMG<br />
          {this.state.items}
        </form>
      )
    } else {
      leftContent = (
        <PhotosIndex classNames="col-md-12" onUpdate={this.onPhotosUpdate} />
      )
    }

    return (
      <section className="row new-story">
        {nextButton}

        <div className="col-xs-6">
          {leftContent}
        </div>

        <div className="col-xs-6">
          <ul className="list-unstyled row grid destination">
            <li className="sample"><h2>Choose the order of photos by dragging and dropping here</h2></li>
          </ul>
        </div>
      </section>
    );
  }
});

var StoryShow = React.createClass({
  render: function() {
    return (
      <section className="col-md-9 story">
        STORY
      </section>
    );
  }
});

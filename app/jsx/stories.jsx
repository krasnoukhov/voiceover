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
    alert("Request goes to backend");
  },

  inputChange: function() {
    var formFilled = $("form").serializeArray().map(function(x) {
      return x["value"] == "";
    }).indexOf(true) === -1;

    if(formFilled && this.state.step == 1) {
      this.stepForward();
    }else if(!formFilled && this.state.step == 2) {
      this.stepBack();
    }
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
  },

  render: function() {
    var nextButton;
    if(this.state.items.length > 0) {
      var classNames = "btn btn-default add-story";
      var buttonText = "Next";
      var handler = this.stepForward;

      if(this.state.step == 1) {
        handler = this.stepBack;
        buttonText = "Go back";
      }else if(this.state.step == 2) {
        classNames += " btn-primary";
        buttonText = "Add story";
      }

      nextButton = (
        <button className={classNames} onClick={handler}>{buttonText}</button>
      )
    }

    var formContent;
    if(this.state.step >= 1) {
      formContent = (
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label htmlFor="personName" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input onChange={this.inputChange} type="text" className="form-control" id="personName" name="person[name]" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="personAge" className="col-sm-2 control-label">Age</label>
            <div className="col-sm-10">
              <input onChange={this.inputChange} type="number" className="form-control" id="personAge" name="person[age]" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="personCountry" className="col-sm-2 control-label">Country</label>
            <div className="col-sm-10">
              <select onChange={this.inputChange} className="form-control" id="personCountry" name="person[country]">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="personDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea onChange={this.inputChange} className="form-control" id="personDescription" name="person[description]" rows="10" />
            </div>
          </div>
        </form>
      )
    }

    return (
      <section className="row new-story">
        {nextButton}

        <div className="col-xs-6">
          {formContent}
          <PhotosIndex classNames="col-md-12 source" onUpdate={this.onPhotosUpdate} />
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

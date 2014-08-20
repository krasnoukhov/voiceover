/** @jsx React.DOM */
var NewStory = React.createClass({
  onPhotosUpdate: function() {
    this.updateDestination();
    $("section ul").sortable({
      connectWith: "section ul",
      start: function(evt, ui) {
        ui.placeholder.height(ui.item.outerHeight());
        $(".destination .sample").remove();
        $(".destination").addClass("ready");
      },
      stop: function(evt, ui) {
        this.updateDestination();
        $(".destination").removeClass("ready");
      }.bind(this)
    }).disableSelection();
  },

  updateDestination: function() {
    $(".destination").css("minHeight", $(".grid:first").outerHeight());
  },

  componentDidMount: function() {
    $("section ul").sortable({
      connectWith: "section ul"
    }).disableSelection();
  },

  render: function() {
    return (
      <section className="row new-story">
        <div className="col-xs-6">
          <PhotosIndex classNames="col-md-12" onUpdate={this.onPhotosUpdate} />
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

/** @jsx React.DOM */
var NewStory = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          Source
        </div>

        <div className="col-md-6">
          Destination
        </div>
      </div>
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

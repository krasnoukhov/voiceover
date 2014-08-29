/** @jsx React.DOM */
var Router = ReactRouter,
    Routes = Router.Routes,
    Route = Router.Route,
    DefaultRoute = Router.Route,
    Link = Router.Link,
    ActiveState = Router.ActiveState;

var App = React.createClass({
  render: function() {
    if(typeof ga !== "undefined") {
      ga("send", "pageview");
    }else{
      console.log("Page view: ", location.href)
    }

    return (
      <div className="container-fluid">
        <header>
          <h1><Link to="app">Voice<label>-</label>over</Link></h1>
        </header>
        <this.props.activeRouteHandler />
      </div>
    );
  }
});

var SidebarLayout = React.createClass({
  render: function() {
    return (
      <div className="row">
        <Sidebar />
        <this.props.activeRouteHandler />
      </div>
    );
  }
});

var Sidebar = React.createClass({
  render: function() {
    return (
      <aside className="col-md-3">
        <p>“Voice-Over” is an online and offline platform open to free participation internationally  to help write this narrative collectively.</p>
        <p>Through asking the participants a personalized selection and sequencing from  the 75 provided images on this site, we hope to build a diverse platform so that everyone can write their own story.</p>

        <p>In 2010, I traveled to Israel and the West Bank as part of my on-going curiosity about the Middle-East. It seemed natural to see the situation first hand for anyone who wanted to come a step closer to understanding the Middle-East.</p>
        <p>During the one-month I was able to spend there, the perplex situation left me with more questions than answers. We can describe the atrocities impacting lives on the both sides, we can speak of the sides. However, for me, despite that I had more access to "one side" rather than "the other", the complexities I've witnessed proved this is a human rights issue, a universal matter that is often explained through differences and numbers. If, in fact we move beyond the numbers, no winners will be left of this on-going violence.</p>
        <p>As years pass and the story proves a continuous repetition, I began to question the role of images in creating the narrative of this history.</p>
        <p>Hence, came the idea for "Voice-Over" to transform this experience beyond my own into a dialogue.</p>

        <div className="links">
          <h2><Link to="photos">See the photos</Link></h2>
          <hr />
          <h2><Link to="new_story">Add your story</Link></h2>
        </div>
      </aside>
    )
  }
});

/** @jsx React.DOM */
var Routes = ReactRouter.Routes,
    Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.Route,
    Link = ReactRouter.Link,
    ActiveState = ReactRouter.ActiveState;

var App = React.createClass({
  render: function() {
    if(typeof ga !== "undefined") {
      ga("send", "pageview");
    }else{
      console.log("Page view: ", location.href)
    }

    return (
      <div className="app">
        <Link to="app">Home</Link>
        <Link to="photos">Photos</Link>
        <Link to="sets_index">Sets</Link>
        <Link to="new_set">New set</Link>

        <this.props.activeRouteHandler />
      </div>
    );
  }
});

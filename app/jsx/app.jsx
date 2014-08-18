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
      <div className="container">
        <div className="row">
          <Sidebar />
          <this.props.activeRouteHandler />
        </div>
      </div>
    );
  }
});

var Sidebar = React.createClass({
  render: function() {
    return (
      <aside className="col-md-4">
        <h1><Link to="app">Voice<label>-</label>over</Link></h1>

        <p>Voice-Over is Emine Gozde Sevim's interactive installation that employs the photographs from Palestine-Israel Sevim made in 2010.</p>
        <p>By using an online and offline platform, with this installation, Sevim invites her audience to create their own narratives through making their own selection and sequencing of the  defined set of photographs from her body of work on a web platform.</p>
        <p>For the platform, Sevim will provide 75 photographs for her audience to select and order and will ask them to add a short abstract describing the attempt of the selected photographs and the order.</p>
        <p>To track the participant demographics, the users will be asked to provide basic information about themselves in order to add their own version of a contact sheet to the collective archive. The on-going platform will be provided for Arabic, Hebrew,Turkish and English speakers and will be available in English viewing for a general international audience.</p>
        <p>Tackling this most contested subject matter about the Middle-East with such approach and with such platform that will outlive the physical installation at DEPO (Istanbul) in the fall of 2014, Sevim aims to expose the parallel complexity of (visual) story-telling and of the dynamic (re)writing of history and underline the power of images and the new meaning they gain (through the specific place) in the creation of a visual narrative, emphasizing intangibility of the process by which we create our own memory of the given subject matter.</p>

        <div className="links">
          <h2><Link to="photos">See the photos</Link></h2>
          <hr />
          <h2><Link to="new_story">Add your story</Link></h2>
        </div>

      </aside>
    )
  }
});

/** @jsx React.DOM */
React.renderComponent((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="photos" path="/photos" handler={PhotosIndex} />
      <Route name="photo" path="/photos/:id" handler={PhotoShow} />
      <Route name="stories_index" path="/stories" handler={StoriesIndex} />
      <Route name="new_story" path="/stories/new" handler={NewStory} />
      <DefaultRoute handler={Home} />
    </Route>
  </Routes>
), document.getElementById("app"));

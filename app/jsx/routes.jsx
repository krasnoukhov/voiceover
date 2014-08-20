/** @jsx React.DOM */
React.renderComponent((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="new_story" path="/stories/new" handler={NewStory} />
      <Route handler={SidebarLayout}>
        <Route name="photos" path="/photos" handler={PhotosIndex} />
        <Route name="photo" path="/photos/:id" handler={PhotoShow} />
        <Route name="story" path="/stories/:id" handler={StoryShow} />
        <DefaultRoute handler={Home} />
      </Route>
    </Route>
  </Routes>
), document.getElementById("app"));

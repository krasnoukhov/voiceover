/** @jsx React.DOM */
React.renderComponent((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="country" path="/countries/:id" handler={StoriesIndex} />
      <Route name="new_story" path="/stories/new" handler={NewStory} />
      <Route name="story" path="/stories/:id" handler={StoryShow} />
      <Route handler={SidebarLayout}>
        <Route name="photos" path="/photos" handler={PhotosIndex} />
        <DefaultRoute handler={Home} />
      </Route>
    </Route>
  </Routes>
), document.getElementById("app"));

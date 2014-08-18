/** @jsx React.DOM */
React.renderComponent((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="photos" path="/photos" handler={PhotosIndex} />
      <Route name="photo" path="/photos/:id" handler={PhotoShow} />
      <Route name="sets_index" path="/sets" handler={SetsIndex} />
      <Route name="new_set" path="/sets/new" handler={NewSet} />
      <DefaultRoute handler={Home} />
    </Route>
  </Routes>
), document.getElementById("app"));

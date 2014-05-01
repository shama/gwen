// Initial Loading Screen
// This loads the entire app async allowing us to display
// initial loading messages

//  Loading CSS
require('./css/loading.styl');

// Load the main app
require(['./app'], function(App) {
  App.create();
});

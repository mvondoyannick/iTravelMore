/**
 * This is a test runner that sets up the Flickr
 * API, and uses its connect/express proxy function
 * to listen for API calls that are POST'ed to the
 * API url. In this case:
 *
 *  http://127.0.0.1:3000/service/rest/flickr.method.name
 *
 * A test page for this API can be accessed by
 * loading http://127.0.0.1:3000 in your browser.
 */
var habitat = require("habitat"),
    env = habitat.load(),
    Flickr = require("./src/FlickrApi"),
    FlickrOptions = env.get("FLICKR");


// Start up the Flickr API proxy, and call the test.echo
// method to make sure we are actually able to talk to Flickr.
console.log("pre");
Flickr.authenticate(FlickrOptions, function(error, flickr) {

  var uploadOptions = {
    photos: [
      {
        title: 'test"test',
        photo: __dirname + "/test.jpg",
        tags: ['happy fox']
      }
    ]
  }

  console.log("testing upload...");
  Flickr.upload(uploadOptions, FlickrOptions, function(err, result) {
    if(err) {
      console.log("error");
      console.log(error);
    }

    console.log("result");
    return console.log(result);
  });
  return console.log("post Flickr.upload.");
});
console.log("post");
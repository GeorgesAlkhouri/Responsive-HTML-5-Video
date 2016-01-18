
Videos = new Mongo.Collection("videos");

if ( Videos.find().fetch().length == 0 ) { 
  // inesrt sample videos
  Videos.insert({slug:"sample-video-1"});
  Videos.insert({slug:"sample-video-1"});
  Videos.insert({slug:"sample-video-1"});
  Videos.insert({slug:"sample-video-1"});
}

if (Meteor.isClient) {

  Session.setDefault('screenSize', {"width" : 0, "height" : 0 } );

  

  setScreenSize = function() {
    Session.set('screenSize', {"width" : $(window).width(), "height" : $(window).height()} );
  };

  Meteor.startup(function () {
    setScreenSize();
  });

  

  Template.main.helpers({
    screenSize: function () {
      return JSON.stringify(Session.get('screenSize'));
    }
  }); 

  $(window).resize(function(){
    setScreenSize();
  });

  /*
  Template.hello.events({
    'click button': function () {
      // increment the screenSize when button is clicked
      Session.set('screenSize', Session.get('screenSize') + 1);
    }
  });
  */

  Template.home.helpers({
    videos: function() {
      return Videos.find();
      //return [ { "slug" : "sample-video-1" } ];
    }
  });

  videoFormats = [ "webm", "ogv", "mp4", "3gp" ];

  Template.video.helpers({
    
    videoSources: function() {
      var slug = this.slug;
      var ret = [];

      /*
      Meteor.call("test", function(err, result) {
        console.log( "callback", err, result );  
      });
      */
      
      $.each(videoFormats, function(i, format) {
        // TODO: test if file exists

        var src = "/videos/" + slug + "." + format;

              
        //console.log( fs.existsSync( src ) );

        ret.push( { src: src, format: "video/" + format } );
      });

      return ret;
    }
  });

  

  Template.video.onRendered( function(){
    // we need to re-init the video after added video-sources
    this.$("video")[0].load();
  });  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  var fs = Npm.require('fs');
  //var fs = Meteor.npmRequire('fs');

  __ROOT_APP_PATH__ = fs.realpathSync('.');
  //console.log(__ROOT_APP_PATH__);

  //path = path.join(__meteor_bootstrap__.serverDir, "../web.browser/app");
  stats = fs.lstatSync( "../web.browser/app/test.txt" ); //"../test.txt"
  //console.log( __ROOT_APP_PATH__ + "/../web.browser/app/test.txt" );
  //console.log( stats );

  if (!fs.existsSync("../web.browser/app/test.txt")) {
    throw new Error(myPath + " does not exists");
  }

}

Meteor.methods({

  test: function () {
    return "xyz"
  }

});
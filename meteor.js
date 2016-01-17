if (Meteor.isClient) {

  console.log( $(window).height() );

  Session.setDefault('screenSize', {"width" : 0, "height" : 0 } );

  setScreenSize = function() {
    Session.set('screenSize', {"width" : $(window).width(), "height" : $(window).height()} );
  };

  Meteor.startup(function () {
    setScreenSize();
  });

  

  Template.body.helpers({
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

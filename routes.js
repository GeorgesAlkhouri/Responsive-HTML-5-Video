Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: 'notFound'
});

/*
Router.route('home', {
  path: '/'
});
*/

Router.route('/', {
	name: 'home',
    template: 'home'
});

Router.route('/about', {
	name: 'about',
    template: 'about'
});

Router.route('/video/:slug', {
	name: 'video',
	template: 'video',
	//this.render("video", {
	    data: function() {
	        //console.log(this.params);
	        //console.log( Videos.findOne( { slug: this.params.slug } ) );
	        return Videos.findOne( { slug: this.params.slug } );
	    }
	//});
});

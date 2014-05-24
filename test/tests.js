/**
 * First we will try initializing an Instagram Feed with improper values.  It won't work.
 */

var template = '';

$.get( '../templates/twitter-feed.rac').then( function ( val ) {
	template = val;


	testBadClientID(
		makeCorrectFeed // callback after BadClient is created.
	);
});//Get Template

testBadClientID = function(nextTest){
  /**
   * Initialize our Template
   */
	instaBad = new instagramFeed({
      el: 'template-target',
      template: template,
      clientID: 'dsa',
      search: 'dribbble',
      dataCallback: function(data){
      	//After getting a response from IG API, check that the error message is displayed.
      	var racInsta = this;
      	test('Checking error messages after request with bad Client ID.', function(){
      		ok(racInsta.error === true, "Error value is set");
	      	ok(racInsta.get('message') === 'Invalid Client ID', "Error message is set");
	    });
	    nextTest(); //We're done with tests... move on.
      },
      complete: function(){
      	test('Instagram object created with bad Client ID.', function(){
	      	ok(true, "Created!");
	    });
      }
    });//Ractive init
};

makeCorrectFeed = function(nextTest){
  /**
   * Initialize our Template
   */
	instaGood = new instagramFeed({
      el: 'template-target',
      template: template,
      clientID: 'dsa',
      search: 'dribbble',
      dataCallback: function(){

      },
      complete: function(){
      	test('Instagram object created with good Client ID.', function(){
	      	ok(true, "Created!");
	    });
      }
    });//Ractive init
};

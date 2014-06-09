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

/** Compares the two arrays for any repeated IDs.
 *
 */
function hasDuplicates(newData, oldData){
	for (var i = newData.data.length - 1; i >= 0; i--) {
		for (var j = oldData.length - 1; j >= 0; j--) {
			oldData[j];
		};
	};
	return false;
}

function testLoadDuplicates(insta){
  	insta.load('before', function(returnedData){
		test('Checking for duplicated in before method.', function(){
			ok(hasDuplicates(insta.data.instagramData, returnedData) == false, 'Load("Before") did not load any duplicate data.');
		});
	});
	insta.load('after', function(returnedData){
		test('Checking for loading data with Before and After methods.', function(){
  			ok(hasDuplicates(insta.data.instagramData, returnedData) == false, 'Load("After") did not load any duplicate data.');
  		});
  	});
}

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
      clientID: 'fd88310566744275a3d68092d9c175d1',
      search: 'dribbble',
      complete: function(){
      	var insta = this;
      	test('Instagram object created with good Client ID.', function(){
	      	ok(true, "Created!");
	    });
	    window.setTimeout(function(){
	    	//wait for a second, then try loading more data.
	    	testLoadDuplicates(insta);
	    	//wait for a second, then try loading more data.
	    	testLoadDuplicates(insta);
	    }, 1000)
      }
    });//Ractive init
};
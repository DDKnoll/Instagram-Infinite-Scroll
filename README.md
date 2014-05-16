# [Instagram Infinite Scroll](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

[Demo](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

Instagram Infinite Feed

The Instagram feed uses Ractive to render a mustache html template with
instagram image data.

How to Use:

1. Create an instagram developer account and Client ID for your application.
2. Include the Ractive.js and instagram.js scripts.
3. Create a mustache template.
4. Pass the Client ID, hashtag to search, and template string into the instagramFeed constructor.

Example Template:


	<!-- This loops over the data -->
    {{#instagramData.data:index}}
		<div class="insta-image">
			<img src="{{instagramData.data[index].images.standard_resolution.url}}" alt="" />
		</div>
	{{/instagramData.data}} 

Sample Usage:

    <script src="js/ractive/Ractive-legacy.0.3.9.min.js"></script><!-- Get Ractive-->
    <script src="js/instagram.js"></script> <!-- Get Instagram extension -->
    <script>
    //Check URL for search parameter.
    query = (window.location.search.length ? window.location.search.slice(1) : 'dribbble');

    //Infinite Scroll Window Bindings.
    var infiniteScrollBinding = function(){
      $(window).scroll(function(evt){
        
        //Calculate Window Values on every scroll event.
        var bod = $('body')[0];
        pageHeight = bod.offsetHeight;
        bottomScroll = window.scrollY + bod.clientHeight;
        distanceToBottom = pageHeight - bottomScroll;

        //Load more posts as needed.
        if(distanceToBottom < 200){
          insta.load('after');
        }
        else if(window.scrollY <= 0){
          insta.load('before');
        }
      });
    }

    // Get our template file.
    $.get( 'templates/twitter-feed.rac').then( function ( template ) {

      //Create New Instagram Feed
      insta = new instagramFeed({
        el: 'template-target',
        template: template,
        clientID: 'Your Instagram Client ID',
        hashtag: 'webdesign',
        complete: infiniteScrollBinding
      });

    });
    </script>


Function Reference

    insta.load('replace'); // Replace the current data (Reload)
    insta.load('before');  // Check for newer posts
    insta.load('after');   // Load Older Posts
    insta.set('search', 'yolo'); //Set Value of Search
    insta.get() //Inspect the Data


TODO:

1. Minify JS
2. Finish Documentation
3. Develop Testing Framework

# [Instagram Infinite Scroll](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

[Demo](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

Instagram Infinite Feed

Sample Usage:

    <script src="js/ractive/Ractive-legacy.0.3.9.min.js"></script><!-- Get Ractive-->
    <script src="js/instagram.js"></script> <!-- Get Instagram extension -->
    <script id='template' type='text/ractive' src='templates/twitter-feed.rac'></script>


    /** This code is just for the infinite scroll.  You don't have to use this. */
    var infiniteScrollBinding = function(){
        //Infinite Scroll Window Bindings
        $(window).scroll(function(evt){
          var bod = $('body')[0];
          pageHeight = bod.offsetHeight;
          bottomScroll = window.scrollY + bod.clientHeight;
          if(pageHeight - bottomScroll < 200){
              insta.load('after');
          }
        });
    }

    //Create New Instagram Feed
    insta = new instagramFeed({
      el: 'template-target',
      template: template,
      clientID: 'Your Instagram Client ID',
      hashtag: 'webdesign',
      complete: infiniteScrollBinding
    });


Function Reference

    insta.load('replace'); // Replace the current data (Reload)
    insta.load('before');  // Check for newer posts
    insta.load('after');   // Load Older Posts
    insta.set('search', 'yolo'); //Set Value of Search
    insta.get() //Inspect the Data


TODO:

1. Minify JS
2. Finish Documentation

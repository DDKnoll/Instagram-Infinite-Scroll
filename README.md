# [Instagram Infinite Scroll](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

[Demo](http://ddknoll.github.io/Instagram-Infinite-Scroll/)

Instagram Infinite Feed

Sample Usage:

    //Load a Ractive Template
    $.get( 'templates/twitter-feed.rac').then( function ( template ) {
      //Create New Instagram Feed
      insta = new instagramFeed({
        el: 'template-target',
        template: template,
        clientID: 'Your Instagram Client ID',
        hashtag: 'webdesign'
      });
    });
    
Function Reference

    insta.load('replace'); // Replace the current data (Reload)
    insta.load('before');  // Check for newer posts
    insta.load('after');   // Load Older Posts
    insta.set('hashtag', 'yolo'); //New Hashtag


TODO:

1. Minify JS
2. Finish Documentation



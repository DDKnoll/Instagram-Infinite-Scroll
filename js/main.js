
var instafeed = {};

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

/**
 * Get the Ractive Template
 */
$.get( 'templates/twitter-feed.rac').then( function ( template ) {
  /**
   * Initialize our Template
   */
    insta = new instagramFeed({
      el: 'template-target',
      template: template,
      clientID: 'fd88310566744275a3d68092d9c175d1',
      search: query,
      complete: infiniteScrollBinding
    });//Ractive init
});//Get Template

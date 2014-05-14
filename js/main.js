
var instafeed = {};

//Check URL for search parameter
query = (window.location.search.length ? window.location.search.slice(1) : 'dribbble');

var infiniteScrollBinding = function(){
  //Infinite Scroll Window Bindings
  $(window).scroll(function(evt){
    var bod = $('body')[0];
    pageHeight = bod.offsetHeight;
    bottomScroll = window.scrollY + bod.clientHeight;
    if(pageHeight - bottomScroll < 200){
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

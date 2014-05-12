
var instafeed = {};

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
      clientID: '',
      hashtag: 'webdesign'
    });//Ractive init
});//Get Template

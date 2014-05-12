
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
      clientID: 'e609fbf975ae438db9206452bdc5fefc',
      hashtag: 'webdesign'
    });//Ractive init
});//Get Template

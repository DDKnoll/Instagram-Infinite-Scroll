
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
      clientID: 'fd88310566744275a3d68092d9c175d1',
      hashtag: 'webdesign'
    });//Ractive init
});//Get Template

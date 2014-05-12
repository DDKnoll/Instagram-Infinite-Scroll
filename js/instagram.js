/*******
 *
 * Instagram Infinite Scroll Loader
 *
 * by Dugan Knoll
 */

var instagramFeed = Ractive.extend({
  lazy:true,
  data: {
    instagramData: [],
    current: -1,
    min:0,
    max:0,
    lightbox:false,
    endOfFeed:false
  },

 /**
  * Load('replace' / 'before' / 'after')
  *
  * Loads more instagram data.  Either replaces current data, appends data before feed, or appends data after feed
  */
  load: function(method){
    //No more older data to load. stop now.
    if(method == 'after' && this.data.endOfFeed){
      return false;
    }
    if(this.data.loading == true){
      //We can only be loading one script at a time.
      return false;
    }
    else {
      this.set('loading', true);
    }
    var tag = document.createElement('script');
    tag.id = 'instagram-script-loader';
    if (method=='replace'){
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverReplace";
    }
    if (method=='before'){
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverFrontAppend&amp;min_id="+this.data.instagramData.pagination.min_tag_id;
    }
    if (method=='after'){
      if(this.data.endOfFeed == true){
        return false;
      }
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverRearAppend&amp;max_id="+this.data.instagramData.pagination.next_max_tag_id;
    }
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  /**
   * Endpoint for loading newer photos
   */
  getNewer: function(){
    this.load('before');
  },
  /**
   * Endpoint for loading older photos
   */
  getOlder: function(){
    this.load('after');
  },


  /********
   * INIT FUNCTION.
   *

   * Make sure ClientID and hashtag are provided.

   * Bind Instagram Data Callbacks to window
     - replaceData(data)
     - frontAppend(data)
     - rearAppend(data)

   */
  init: function(options){

    //Init Client ID
    if(options.clientID == undefined){
      console.log('No Client ID Provided');
      this.success = false;
      return false;
    } else{
      this.clientID = options.clientID;
    }
    //Init hashtag
    if(options.hashtag == undefined){
      console.log('No Hashtag Provided');
      this.success = false;
      return false;
    } else{
      this.data.hashtag = options.hashtag;
    }

    //Replace data.
    this.replaceData = function(newData){
      this.set('instagramData', newData);
      this.set('loading', false);
    }
    window.instagramReceiverReplace = (function(obj){
      return function (data) {
        obj.replaceData(data);
      }
    })(this);

    //Append data to rear and update data structure.
    this.frontAppend = function(newData){
      console.log('front Append');
      console.log(newData);
      this.set('instagramData.data', newData.data.concat(this.data.instagramData.data));
      this.data.instagramData.pagination.min_tag_id = newData.pagination.min_tag_id;
      this.set('loading', false);
    }
    window.instagramReceiverFrontAppend = (function(obj){
      return function (data) {
        obj.frontAppend(data);
      }
    })(this);

    //Append data to rear and update data structure.
    this.rearAppend = function(newData){
      console.log('rear Append');
      console.log(newData);
      this.set('instagramData.data', this.data.instagramData.data.concat(newData.data));
      //Set the pagination
      if(newData.pagination.next_max_tag_id === undefined){
        this.set('endOfFeed', true);
      } else{
        this.data.instagramData.pagination.next_max_tag_id = newData.pagination.next_max_tag_id;
      }
      this.set('loading', false);
    }
    window.instagramReceiverRearAppend = (function(obj){
      return function (data) {
        obj.rearAppend(data);
      }
    })(this);

    this.observe('hashtag', function(oldVal, newVal){this.load('replace');});
    this.load('replace');
  }

});

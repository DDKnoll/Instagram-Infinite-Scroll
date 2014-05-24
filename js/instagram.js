/*******
 *
 * Instagram Infinite Scroll Loader
 *
 * by Dugan Knoll
 */

var instagramFeed = Ractive.extend({
  lazy:true,

  makeQuery: function(method) {
    var base, endpoint, final, callback;
    base = "https://api.instagram.com/v1";
    switch (this.data.method) {
      case "popular":
        endpoint = "media/popular";
        break;
      case "tags":
        if (typeof this.data.search !== 'string') {
          throw new Error("No tag name specified. Use the 'tagName' option.");
        }
        endpoint = "tags/" + this.data.search + "/media/recent";
        break;
      case "location":
        if (typeof this.data.location !== 'number') {
          throw new Error("No location specified. Use the 'locationId' option.");
        }
        endpoint = "locations/" + this.data.search + "/media/recent";
        break;
      case "user":
        if (typeof this.data.userId !== 'number') {
          throw new Error("No user specified. Use the 'userId' option.");
        }
        if (typeof this.data.accessToken !== 'string') {
          throw new Error("No access token. Use the 'accessToken' option.");
        }
        endpoint = "users/" + this.data.search + "/media/recent";
        break;
      default:
        throw new Error("Invalid option for get: '" + this.data.get + "'.");
    }
    final = "" + base + "/" + endpoint;
    if (this.data.clientID != null) {
      final += "?client_id=" + this.data.clientID;
    }
    if (this.data.postsPerPage != null) {
      final += "&count=" + this.data.postsPerPage;
    }
    switch(method){
      case 'before':
        callback = "&amp;callback=instagramReceiverFrontAppend&amp;min_id="+this.data.instagramData.pagination.min_tag_id;
        break;
      case 'after':
        callback = "&amp;callback=instagramReceiverRearAppend&amp;max_id="+this.data.instagramData.pagination.next_max_tag_id;
        break;
      case 'replace':
        callback = "&amp;callback=instagramReceiverReplace";
        break;
    }
    console.log(final+callback);
    return final+callback;
  },

 /**
  * Load('replace' / 'before' / 'after')
  *
  * Loads more instagram data.  Either replaces current data, appends data before feed, or appends data after feed
  */
  load: function(method){
    //No older data to load. stop now.
    if(method == 'after' && this.data.endOfFeed){
      return false;
    }
    //We're already searching for something... Patience
    if(this.data.loading == true) {
      return false;
    }
    else {
      this.set('loading', true);
    }
    console.log('calling IG API');
    
    var tag = document.createElement('script');
    tag.id = 'instagram-script-loader';
    tag.onerror = function(){console.log('unable to reach IG API');};
    tag.src = this.makeQuery(method);
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


    // Initialize Parameters
    this.data.instagramData = [];
    this.data.current = -1;
    this.data.min = 0;
    this.data.max = 0,
    this.data.lightbox = false;
    this.data.endOfFeed = false;
    this.data.postsPerPage = 6;
    this.data.method = 'tags';
    this.data.message = '';


    //Init Client ID
    if(options.clientID == undefined){
      console.log('No Client ID Provided');
      this.success = false;
      return false;
    } else{
      this.data.clientID = options.clientID;
    }
    if(options.dataCallback != undefined){
      this.dataCallback = options.dataCallback;
    } else {
      this.dataCallback = function(){};
    }

    //Init search
    if(options.search == undefined){
      console.log('No Hashtag Provided');
      this.success = false;
      return false;
    } else{
      this.data.search = this.data.searched  = options.search;
    }

    this.validateData = function(data){
      this.set('loading', false);
      if(data.meta.code == 400){
        this.error = true;
        this.set('message', 'Invalid Client ID');
        this.dataCallback(data);
        return false;
      } else if(data.meta.code == 200){
        this.error = false;
        return true;
      } else {
        this.error = true;
        this.set('message', 'Error retrieving IG data.');
        this.dataCallback(data);
        console.log(data);
        return false;
      }
    }

    //Replace data.
    this.replaceData = function(newData){
      //console.log(newData);
      if(newData.data == undefined){
        this.set('message', 'Sorry no results for #'+this.data.search+" :[");
      } else{
        this.set('instagramData', newData);
        this.set('searched', this.data.search);
        this.set('message', '');
        this.set('endOfFeed', false);
      }
      this.dataCallback(newData);
    }
    window.instagramReceiverReplace = (function(obj){
      return function (data) {
        if(obj.validateData(data)){
          obj.replaceData(data);
        }
      }
    })(this);

    //Append data to front of array and update data structure.
    this.frontAppend = function(newData){
      //console.log(newData);
      if(newData.data.length==0){
        console.log('Nothing to append');
      } else{
        console.log('front Append');
        this.set('instagramData.data', newData.data.concat(this.data.instagramData.data));
        this.data.instagramData.pagination.min_tag_id = newData.pagination.min_tag_id;
      }
      this.dataCallback(newData);
    }
    window.instagramReceiverFrontAppend = (function(obj){
      return function (data) {
        if(obj.validateData(data)){
          obj.frontAppend(data);
        }
      }
    })(this);

    //Append data to rear and update data structure.
    this.rearAppend = function(newData){
      console.log('rear Append');
      //console.log(newData);
      this.set('instagramData.data', this.data.instagramData.data.concat(newData.data));
      //Set the pagination
      if(newData.pagination.next_max_tag_id === undefined){
        this.set('endOfFeed', true);
      } else{
        this.data.instagramData.pagination.next_max_tag_id = newData.pagination.next_max_tag_id;
      }
      this.dataCallback(newData);
    }
    window.instagramReceiverRearAppend = (function(obj){
      return function (data) {
        if(obj.validateData(data)){
          obj.rearAppend(data);
        }
      }
    })(this);

    this.observe('search', function(oldVal, newVal){this.load('replace');});
    this.load('replace');
  }

});

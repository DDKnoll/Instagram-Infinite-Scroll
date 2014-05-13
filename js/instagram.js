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
    endOfFeed:false,
    postsPerPage:6,
    method: 'tags',
    message: ''
  },

  makeQuery: function(method){
    var query = '';
    var callback = '';
    switch(method){
    case 'before':
      callback = "&amp;callback=instagramReceiverFrontAppend&amp;min_id="+this.data.instagramData.pagination.min_tag_id;
      break;
    case 'after':
      callback = "&amp;callback=instagramReceiverRearAppend&amp;max_id="+this.data.instagramData.pagination.next_max_tag_id;
      break;
    case 'replace':
      callback = "&amp;callback=instagramReceiverReplace";
      return "https://api.instagram.com/v1/"+this.data.method+"/"+this.data.search+"/media/recent?client_id="+this.data.clientID+"&amp;count="+this.data.postsPerPage+callback;
      break;
    }
    return "https://api.instagram.com/v1/"+this.data.method+"/"+this.data.searched+"/media/recent?client_id="+this.data.clientID+"&amp;count="+this.data.postsPerPage+callback;
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

    var tag = document.createElement('script');
    tag.id = 'instagram-script-loader';
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

    //Init Client ID
    if(options.clientID == undefined){
      console.log('No Client ID Provided');
      this.success = false;
      return false;
    } else{
      this.data.clientID = options.clientID;
    }
    //Init hashtag
    if(options.search == undefined){
      console.log('No Hashtag Provided');
      this.success = false;
      return false;
    } else{
      this.data.search = options.search;
      this.data.searched = options.search;
    }

    //Replace data.
    this.replaceData = function(newData){
      console.log(newData);
      if(newData.data == undefined){
        this.set('message', 'Sorry no results for #'+this.data.search+" :[");
      } else{
        this.set('instagramData', newData);
        this.set('searched', this.data.search);
        this.set('message', '');
      }
      this.set('loading', false);
    }
    window.instagramReceiverReplace = (function(obj){
      return function (data) {
        obj.replaceData(data);
      }
    })(this);

    //Append data to front of array and update data structure.
    this.frontAppend = function(newData){
      console.log(newData);
      if(newData.data.length==0){
        console.log('Nothing to append');
      } else{
        console.log('front Append');
        this.set('instagramData.data', newData.data.concat(this.data.instagramData.data));
        this.data.instagramData.pagination.min_tag_id = newData.pagination.min_tag_id;
      }
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

    this.observe('search', function(oldVal, newVal){this.load('replace');});
    this.load('replace');
  }

});

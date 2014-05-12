/*******
 *
 * Instagram Infinite Scroll Loader
 *
 *
 */

var instagramFeed = Ractive.extend({
  lazy:true,
  data: {
    instagramData: [],
    current: -1,
    min:0,
    max:0
  },

 /**
  * Load('')
  */
  load: function(method){
    var tag = document.createElement('script');
    tag.id = 'instagram-script-loader';
    if (method=='replace'){
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverReplace";
    }
    if (method=='before'){
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverFrontAppend&amp;min_id="+this.data.instagramData.pagination.min_tag_id;
    }
    if (method=='after'){
      tag.src = "https://api.instagram.com/v1/tags/"+this.data.hashtag+"/media/recent?client_id="+this.clientID+"&amp;count=15&amp;callback=instagramReceiverRearAppend&amp;max_id="+this.data.instagramData.pagination.next_max_tag_id;
    }
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },
  getOlder: function(){
    this.load('after');
  },
  getNewer: function(){
    this.load('before');
  },

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

    //An Anonymous function generates functions for replacing, and appending to front and back of the current data.
    this.replaceData = function(data){
      this.set('instagramData', data);
    }
    window.instagramReceiverReplace = (function(obj){
      return function (data) {
        obj.replaceData(data);
      }
    })(this);

    this.frontAppend = function(instaData){
      console.log('front Append');
      console.log(instaData);
      this.set('instagramData.data', instaData.data.concat(this.data.instagramData.data));
      this.data.instagramData.pagination.min_tag_id = instaData.pagination.min_tag_id;
    }
    window.instagramReceiverFrontAppend = (function(obj){
      return function (data) {
        obj.frontAppend(data);
      }
    })(this);

    this.rearAppend = function(instaData){
      console.log('rear Append');
      console.log(instaData);
      this.set('instagramData.data', this.data.instagramData.data.concat(instaData.data));
      this.data.instagramData.pagination.next_max_tag_id = instaData.pagination.next_max_tag_id;
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

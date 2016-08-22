!(function(){
  var localJsonBase = {};

  var JSONBASE = {};
  window.JSONBASE = JSONBASE;
  JSONBASE.Reference = function(location){
    var invisible_char = '\032';
    var keys = location.replace(/([^\/]|^)\/([^\/]|$)/g,'$1'+invisible_char+'$2').split(invisible_char);
    console.log(keys);
    return new Reference(location);
  }

  function Reference(pathname){
    this.DataNode = new DataNode();
    console.log(pathname);
  }

  Reference.prototype = {
    on: function(event_type,callback){
      console.log(event_type);
    },
    set: function(newValue, onComplete){
      var newValue_type = Object.prototype.toString.call(newValue);
      if('[object Undefined]'==newValue_type || '[object Null]'==newValue_type){
        return this.remove(onComplete);
      }

      // this.
    },
    push: function(){

    },
    update: function(){

    },
    remove: function(){

    },
    transaction: function(func){

    }
  }

  function SnapShot(){

  }

  SnapShot.prototype = {

  }
})();

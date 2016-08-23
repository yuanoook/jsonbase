!(function(){
  var JSONBASE = {};
  JSONBASE.Reference = function(location){
    return new Reference(location);
  }

  function Reference(location){
    var invisible_char = '\032';
    var keys = location.replace(/([^\/]|^)\/([^\/]|$)/g,'$1'+invisible_char+'$2').split(invisible_char);
    var host = keys.shift();
    var pathname = keys.join('/');

    var storageIO = new StorageIO(localStorage,host);
    var dataCenter = new DataCenter(storageIO);

    this.dataCenter = dataCenter;
    this.coreDataNode = dataCenter.pullNode(pathname);
  }

  Reference.prototype = {
    on: function(event_type,callback){
      var me = this;
      switch (event_type) {
        case 'value':
          this.coreDataNode.on('value_changed',function(event){
            var node = event.target;
            var value = node.get();
            callback(value);
          });
          break;
        default:

      }
    },
    set: function(newValue, onComplete){
      var newValue_type = Object.prototype.toString.call(newValue);
      if('[object Undefined]'==newValue_type || '[object Null]'==newValue_type){
        return this.remove(onComplete);
      }

      this.coreDataNode.set(newValue);
      onComplete && onComplete();

      return this;
    },
    push: function(){

    },
    update: function(){

    },
    remove: function(){

    },
    transaction: function(func){

    },
    randomKey: function(prefix){
      return  (prefix||"")+((new Date).valueOf().toString(36)+Math.random().toString(36)).split("0.").join("_").substr(0,20)
    }
  }

  function SnapShot(){

  }

  SnapShot.prototype = {

  }

  window.JSONBASE = JSONBASE;
})();

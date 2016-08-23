!(function(){
  var JSONBASE = {
    Singletons: {

    },
    Reference: function(location){
      return new Reference(location);
    },
    ServerValue: {
      TIMESTAMP: {
        ".sv": "timestamp"
      }
    }
  };

  function Reference(location){
    var invisible_char = '\032';
    var keys = location.replace(/([^\/]|^)\/([^\/]|$)/g,'$1'+invisible_char+'$2').split(invisible_char);
    var host = keys.shift();
    var pathname = keys.join('/');

    if( !JSONBASE.Singletons[host] ){
      var storageIO = new StorageIO(localStorage,host);
      var dataCenter = new DataCenter(storageIO).on('child_added child_removed child_changed',logEvent);
      JSONBASE.Singletons[host] = {
        storageIO: storageIO,
        dataCenter: dataCenter
      }
    }

    var storageIO = JSONBASE.Singletons[host]['storageIO'];
    var dataCenter = JSONBASE.Singletons[host]['dataCenter'];

    this.location = location;
    this.pathname = pathname;
    this.coreDataNode = dataCenter.pullNode(pathname);
  }

  function logEvent(event){
    console.log(event.type,event.ums,event.target);
  }

  Reference.prototype = {
    on: function(event_type,callback){
      var me = this;
      switch (event_type) {
        case 'value':
          this.coreDataNode.on('value_changed',function(event){
            var node = event.target;
            callback( new SnapShot(me) );
          });
          callback( new SnapShot(me) );
          break;
        case 'child_added':
          this.coreDataNode.on('child_added',function(event){
            var node = event.target;
            console.log(event.ums,node);
          });
          break;
        case 'child_removed':
          this.coreDataNode.on('child_removed',function(event){
            var node = event.target;
            console.log(event.ums,node);
          });
          break;
        case 'child_changed':
          this.coreDataNode.on('child_changed',function(event){
            var node = event.target;
            console.log(event.ums,node);
          });
          break;
        default:
        break;
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
    child: function(pathname){
      var location = this.location.replace(/^\/*|\/*$/g,'') + '/' + pathname.replace(/^\/*|\/*$/g,'');
      // console.log('child',pathname,location);
      var ref = new Reference(location);
      // console.log(ref);
      return ref;
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

  function SnapShot(ref){
    var node = ref.coreDataNode;
    this.ref = ref;
    this.value = node.get();
    console.log(this.value);
  }

  SnapShot.prototype = {
    val: function(){
      return this.value;
    },
    reference: function(){
      return this.ref
    }
  }

  window.JSONBASE = JSONBASE;
})();

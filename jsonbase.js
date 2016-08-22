!(function(){
  var JSONBASE = {};
  window.JSONBASE = JSONBASE;
  JSONBASE.Reference = function(pathname){
    return new Reference(pathname);
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

  function DataNode(value){
    this.protodata = {
      value: null,
      node: null,
      type: 'value'//value|node
    };
    this.set(value);
  }

  DataNode.prototype = {
    set: function(newValue,onComplete){
      this.protodata.value = newValue;
      // onComplete(null);
    },
    get: function(onComplete){
      onComplete(this.protodata.value);
    },
    export: function(onComplete){
      //导出静态数据
      onComplete( JSON.stringify(this.protodata) );
    },
    import: function(str, onComplete){
      //导入静态数据
      var err = null;
      try{
        this.protodata = JSON.parse(str);
      }catch(e){
        err = e;
      }
      onComplete(err);
    }
  }
})();

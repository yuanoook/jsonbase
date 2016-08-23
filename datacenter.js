!function(){
  function DataCenter(storageIO){
    var me = this;
    this.RootDataNode = new DataNode();

    storageIO.get(function(str){
      //import trigger value_changed, please caution recursive calling.
      str && me.import(str);
    });
    storageIO.change(function(str){
      me.synchronize(str);
    });
    this.change(function(){
      storageIO.set( me.export() );
    });
  }

  DataCenter.prototype = {
    on: function(){
      this.RootDataNode.on.apply(this.RootDataNode,arguments);
      return this;
    },
    import: function(str){
      this.RootDataNode.import(str);
      return this;
    },
    export: function(){
      return this.RootDataNode.export();
    },
    change: function(callback){
      this.RootDataNode.on('value_changed',callback);
      return this;
    },
    synchronize: function(){
      //only change with difference
      console.log('request for synchronizing!');
      return this;
    },
    getNode(pathname){
      return this.RootDataNode.getChild(pathname);
    },
    setValue(pathname,value){
      //todo: force add child node in the pathname
    }
  }

  window.DataCenter = DataCenter;
}();

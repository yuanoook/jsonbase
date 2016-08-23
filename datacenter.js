!function(){
  function DataCenter(storageIO){
    this.RootDataNode = new DataNode();

    storageIO.get(function(str){
      //import trigger value_changed, please caution recursive calling.
      this.import(str);
    });
    storageIO.change(function(str){
      this.synchronize(str);
    });
    this.change(function(){
      storageIO.set( this.export() );
    });
  }

  DataCenter.prototype = {
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
    }
  }

  window.DataCenter = DataCenter;
}();

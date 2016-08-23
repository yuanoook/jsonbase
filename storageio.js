!function(){
  function StorageIO(obj,key){
    this.obj = obj;
    this.key = key;
    this.old_value = obj[key];
    this.changecallbacks = [];
  }

  StorageIO.prototype = {
    get: function(callback){
      callback( this.obj[this.key] );
    },
    set: function(str){
      if(str != this.old_value){
        this.old_value = this.obj[this.key] = str;
        this.changecallbacks.forEach(function(callback){
          callback(str);
        });
      }
    },
    change: function(callback){
      this.changecallbacks.push(callback);
    }
  }

  window.StorageIO = StorageIO;
}();

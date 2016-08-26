!function(){
  function RealTimeServer(storageIO){
    //TODO: storageIO load and save data staticly
    this.data = {};
  }

  RealTimeServer.prototype = {
    set: function(pathname,setter){
      return this.pushValue(
        pathname,
        isFunction(setter) ? setter(this.pullValue(pathname)) : setter
      )
    },
    get: function(pathname){
      return this.pullValue(pathname);
    },
    pushValue: function(pathname,value){
      var subkey,
      subobj = this.data,
      keys_arr = pathname.split('/');

      while(keys_arr.length>1)(
        subkey = keys_arr.shift(),
        subobj = subobj[subkey] = (
          isNode(subobj[subkey])
          ? subobj[subkey]
          : {}
        )
      )

      subobj[ keys_arr.shift() ] = value;

      return this;
    },
    pullValue: function(pathname,default_value){
      var keys_arr = pathname.split('/');
      var subobj = this.data;
      try{
        while(keys_arr.length)
        subobj = subobj[ keys_arr.shift() ];
        return !isNull(subobj) ? subobj : default_value;
      }catch(e){
        return default_value;
      }
    }
  }

  function isFunction(obj){
    return /Function/.test(Object.prototype.toString.call(obj));
  }

  function isNode(obj){
    return !/Number|String|Null|Undefined|Boolean/.test(Object.prototype.toString.call(obj));
  }

  function isValue(obj){
    return /Number|String|Boolean/.test(Object.prototype.toString.call(obj));
  }

  function isNull(obj){
    return /Null|Undefined/.test(Object.prototype.toString.call(obj));
  }

  window.RealTimeServer = RealTimeServer;
}();

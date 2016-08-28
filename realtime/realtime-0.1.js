!function(){
  var references = {};
  var RAMHost = new Host();//host in the RAM

  window.JSONBASE = {
    references: references,
    Reference: getReference,
    Host: Host
  }

  function getReference(pathname){
    //make sure that the pathname is correct;
    //i.e: / /pathname /pathname/subpathname
    pathname = (pathname || '/').replace(/\/\/+/g,'/').replace(/\/$/,'') || '/';
    references[pathname] = references[pathname] || new Reference(pathname);
  }

  function Reference(pathname){
    this.id = uniqueMillisecond();
    this.Host = RAMHost;
    this.pathname = pathname;
  }

  Reference.prototype = {
    set: function(setter,callback){
      this.Host.set(this.id,this.pathname,setter,callback);
      return this;
    },
    get: function(callback){
      this.Host.get(this.id,this.pathname,callback);
      return this;
    },
    on: function(event_type,callback){
      this.Host.addEventListener(this.id,this.pathname,event_type,callback);
      return this;
    },
    child: function(pathname){
      var childPahtname = this.pathname+'/'+pathname;
      return getReference(childPahtname);
    },
    parent: function(){
      var parentPathname = getParentPathname(this.pathname);
      return parentPathname==this.pathname ? undefined : getReference(parentPathname);
    },
    root: function(){
      return getReference('/');
    }
  }

  function Host(){
    this.data = {};
    this.set_log = [
      // [who,when,pathname,value,old_value]
    ];
    this.event_log = [
      // [when,pathname,+/-,+/-,N/V,value]
    ];
  }

  Host.prototype = {
    pushValue: function(pathname,value){//private method
      value = copyValue(value);//prevent overwrite obj;
      if(pathname=='/'){
        this.data = value;
        return this;
      }
      pathname = pathname.replace(/^\//,'');//for split
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
    pullValue: function(pathname){//private method
      var keys_arr = pathname.split('/');
      var subobj = this.data;
      try{
        while(keys_arr.length)
        subobj = subobj[ keys_arr.shift() ];
        return subobj;
      }catch(e){
        return;
      }
    },
    set: function(who,pathname,setter,callback){
      if( !this.isSetable(pathname) ){
        callback && callback('Error: Parent node cannot be found!')//prevent to set new value under not-a-node that may overwrite existed-value
        return this;
      }
      var old_value = this.pullValue(pathname);
      var value = isFunction(setter) ? setter(old_value) : setter;
      //new value can be null( means remove subpathname ), but cannot be undefined, if it's undefined, ignore it;
      if(value===undefined){
        callback && callback('Error: Cannot set undefined as new value!');
        return this;
      }
      try{
        this.pushValue(pathname,value);
      }catch(e){
        callback && callback(e.toString());
      }
  
      this.logSet(who,pathname,value,old_value);
      callback() && callback();
      return this;
    },
    isSetable: function(pathname){
      return pathname=='/' || isNode(this.pullValue(getParentPathname(pathname)))
    },
    get: function(who,pathname,callback){

    },
    logSet: function(who,pathname,new_value,old_value){

    },
    logEvent: function(set_log){

    },
    deliverEvents: function(Events){

    },
    addEventListener: function(who,pathname,event_type){

    }
  }

  function copyValue(obj){
    try{
      obj = isNode(obj) ? JSON.parse(JSON.stringify(obj)) : obj;
    }catch(e){
      throw new Error('New value cannot be parsed!');
    }
    return obj;
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

  function getParentPathname(pathname){
    return pathname.replace(/\/[^\/?]\/?$/,'');
  }

}();

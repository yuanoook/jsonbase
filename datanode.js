!function(){
  function DataNode(value){
    this.type = 'value';//value|node
    this.key = '';
    this.pathname = '/';
    this.created_at = uniqueMillisecond();
    this.updated_at = uniqueMillisecond();
    this.set(value);
  }

  DataNode.prototype = {
    //##########################  set , get --START #######################
    set: function(newValue){
      //设置新值
      if( Object.prototype.toString.call(newValue)=='[object Object]' ){
        this.type = 'node';
        this.children = {};
        for(var key in newValue){
          if( newValue.hasOwnProperty(key) ){
            this.addChild(key, new DataNode(newValue[key]));
          }
        }
      }else{
        this.type = 'value';
        this.value = newValue;
        this.removeChildren();
      }
      delete this[this.type=='node' ? 'value': 'children'];
      this.updated_at = uniqueMillisecond();
      return this;
    },
    get: function(){
      //获取值
      if(this.type=='value'){
        return this.value;
      }
      if(this.type=='node'){
        var resObj = {};
        for(var key in this.children){
          if(this.children.hasOwnProperty(key)){
            resObj[key] = this.children[key].get();
          }
        }
        return resObj;
      }
    },
    //##########################  set , get --END #######################

    //##########################  export , import --START #######################
    export: function(){
      //导出静态数据
      var exportObj = {};
      extend(exportObj,{
        type: this.type,
        value: this.value,
        children: {},
        created_at: this.created_at,
        updated_at: this.updated_at
      });
      if(exportObj.type=='node'){
        for(var key in this.children){
          if(this.children.hasOwnProperty(key)){
            exportObj.children[key] = this.children[key].export();
          }
        }
      }
      delete exportObj[exportObj.type=='node' ? 'value': 'children'];
      return JSON.stringify(exportObj);
    },
    import: function(str){
      //导入静态数据
      var importNode = new DataNode();
      extend(importNode,JSON.parse(str));
      if(importNode.type=='node'){
        for(var key in importNode.children){
          if( importNode.children.hasOwnProperty(key) ){
            importNode.addChild(key, new DataNode().import(importNode.children[key]));
          }
        }
      }
      extend(this,{
        type: importNode.type,
        value: importNode.value,
        children: importNode.children,
        created_at: importNode.created_at,
        updated_at: importNode.updated_at
      });
      delete this[this.type=='node' ? 'value': 'children'];
      return this;
    },
    //##########################  export , import --END #######################

    //##########################  addChild , removeChild, removeChildren, getChild, setChild, getChildren --START #######################
    addChild: function(key,node){
      this.children[key] = node;
      node.key = key;
      node.parent = this;
      return this;
    },
    removeChild: function(key){
      var node = this.children[key];
      delete this.children[key];
      node.key = '';
      delete node.parent;
      return this;
    },
    remove: function(){
      this.parent && this.parent.removeChild(this.key);
    },
    removeChildren: function(){
      for(var key in this.children){
        if(this.children.hasOwnProperty(key)){
          this.removeChild(key);
        }
      }
      return this;
    },
    getChild: function(pathname){
      var keys = pathname.split('/');
      var subnode = this;
      var existed = true;
      keys.forEach(function(key){
        if(key.length){
          if(subnode.children && subnode.children[key]){
            subnode = subnode.children[key];
          }else{
            existed = false;
          }
        }
      });
      return existed ? subnode : undefined;
    },
    setChild: function(pathname,node){
      var childnode = this.getChild(pathname);
      if(childnode){
        childnode.import(node.export());
      }else{
        throw new Error('Node of '+pathname+' cannot be found!');
      }
      return this;
    },
    getChildren: function(){
      var result = [];
      for(var key in this.children){
        if(this.children.hasOwnProperty(key)){
          result.push(this.children[key]);
        }
      }
      return result;
    },
    //##########################  addChild , removeChild, removeChildren, getChild, getChildren --END #######################

    //##########################  pathname --END #######################
    getPathname: function(){
      var pathname = this.key;
      var node = this;
      while(node = node.parent){
          pathname = node.key + '/' + pathname;
      }
      return pathname;
    }
  }

  function extend(object){
    Array.prototype.forEach.call(arguments,function(obj,index){
      if(!index){return;}
      for(var key in obj){
        obj.hasOwnProperty(key) , (object[key] = obj[key]);
      }
    });
  }

  function combineSrcWithDirectory(src,directory){
    if(!/^\./.test(src)){return src;}

    var result = directory+src;
    var ruined_indexs = [];

    result = result.split('/');

    result.map(function(x,i,a){
      var prev_index = getUnRuinedPrevIndex(i);
      if(x=='.'){
        ruined_indexs.push(i);
      }
      if(x=='..'){
        ruined_indexs.push(i);
        ruined_indexs.push(prev_index);
      }
    });

    result = result.filter(function(x,i,a){
      return ruined_indexs.indexOf(i)<0;
    }).join('/');

    return result;

    function getUnRuinedPrevIndex(i){
      while( (i-- > -1) && (ruined_indexs.indexOf(i)>-1) ){}
      return i;
    }
  }

  window.DataNode = DataNode;
}();



//TEST
// var d1 = new DataNode();
//
// d1.set({a:1,b:{c:2}});
//
// var export_str1 = d1.export();
// console.log('e1',export_str1);
//
// var d2 = new DataNode();
// d2.import(export_str1);
//
// console.log('d1',d1,d1.export());
// console.log('d2',d2,d2.export());

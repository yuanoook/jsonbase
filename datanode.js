!function(){
  function DataNode(value){
    this.type = 'value';//value|node
    this.created_at = uniqueMillisecond();
    this.updated_at = uniqueMillisecond();
    this.set(value);
  }

  DataNode.prototype = {
    set: function(newValue){
      if( Object.prototype.toString.call(newValue)=='[object Object]' ){
        this.type = 'node';
        this.children = {};
        for(var key in newValue){
          if( newValue.hasOwnProperty(key) ){
            this.children[key] = new DataNode(newValue[key]);
          }
        }
      }else{
        this.type = 'value';
        this.value = newValue;
      }
      this.updated_at = uniqueMillisecond();
      return this;
    },
    get: function(onComplete){
      onComplete(this.value);
    },
    export: function(){
      //导出静态数据
      var exportObj = {};
      extend(exportObj,this,{children:{}});
      if(exportObj.type=='node'){
        for(var key in this.children){
          if(this.children.hasOwnProperty(key)){
            exportObj.children[key] = this.children[key].export();
          }
        }
      }else{
        delete exportObj.children;
      }
      return JSON.stringify(exportObj);
    },
    import: function(str, onComplete){
      //导入静态数据
      var err = null;
      var importObj = {}
      extend(importObj,JSON.parse(str));
      if(importObj.type=='node'){
        for(var key in importObj.children){
          if( importObj.children.hasOwnProperty(key) ){
            importObj.children[key] = new DataNode().import( importObj.children[key] );
          }
        }
      }
      extend(this,importObj);
      return this;
    }
  }

  function extend(object){
    Array.prototype.forEach.call(arguments,function(obj,index){
      if(!index){return;}
      for(var key in obj){
        obj.hasOwnProperty(key) && (object[key] = obj[key]);
      }
    });
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

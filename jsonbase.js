!(function(){
  var JSONBASE = {};
  window.JSONBASE = JSONBASE;
  JSONBASE.Reference = function(pathname){
    return new Reference(pathname);
  }

  function Reference(pathname){
    console.log(pathname);
  }

  Reference.prototype = {
    on: function(event_type,callback){
      console.log(event_type);
    }
  }
})();

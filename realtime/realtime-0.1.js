!function(){
  window.JSONBASE = {
    Reference: Reference,
    Host: Host
  }

  function Reference(){
    this.id = uniqueMillisecond();
    this.Host = new Host();
  }

  Reference.prototype = {
    set: function(setter){

    },
    get: function(callback){

    },
    on: function(event_type,callback){

    },
    child: function(){

    }
  }

  function Host(){
    this.jsontree = {};
    this.set_log = [
      // [who,when,pathname,value,old_value,✓/⨉]
    ];
    this.event_log = [
      // [when,pathname,+/-,+/-,N/V,value]
    ];
  }

  Host.prototype = {
    set: function(who,pathname,setter){

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

}();

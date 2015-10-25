(function(root){
  var _params = { minSeating: 1, maxSeating: 10 };
  var CHANGE_EVENT = "change";

  var FilterParamsStore = root.FilterParamsStore = $.extend({}, EventEmitter.prototype, {
    params: function(){
        return $.extend({}, _params);
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeChangeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case APP_CONSTANTS.UPDATE_MAX_SEATING:
          _params.maxSeating = payload.maxSeating;
          FilterParamsStore.emit(CHANGE_EVENT);
          break;
        case APP_CONSTANTS.UPDATE_MIN_SEATING:
          _params.minSeating = payload.minSeating;
          FilterParamsStore.emit(CHANGE_EVENT);
          break;
        case APP_CONSTANTS.UPDATE_BOUNDS:
          _params.bounds = payload.bounds;
          FilterParamsStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

})(this);
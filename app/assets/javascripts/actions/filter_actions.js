FilterActions = {
  updateBounds: function (bounds) {
    AppDispatcher.dispatch({
      actionType: APP_CONSTANTS.UPDATE_BOUNDS,
      bounds: bounds
    });
  }
};
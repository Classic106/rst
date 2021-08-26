const InitialState = {
  open: false,
  images: [],
  initSlide: 0,
};

const reducer = function(state = InitialState, action) {
  //console.log(action.payload)
  switch (action.type) {
    case "OPEN_FULLSCREEN":
      return {
        ...state,
        open: true,
        ...action.payload
      };
      
    case "CLOSE_FULLSCREEN":
      return {
        initSlide: 0,
        images: [],
        open: false
      };

    default:
      return state;
  }
}

export default reducer;
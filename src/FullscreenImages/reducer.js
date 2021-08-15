const InitialState = {
  open: false,
  images: [],
};

const reducer = function(state = InitialState, action) {
  //console.log(action)
  switch (action.type) {
    case "OPEN_FULLSCREEN":
      return {...state, images: action.payload, open: true};
      
    case "CLOSE_FULLSCREEN":
      return {...state, images: [], open: false};

    default:
      return state;
  }
}

export default reducer;
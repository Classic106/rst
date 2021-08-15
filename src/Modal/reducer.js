const InitialState = {
  modal: false,
};

const reducer = function(state = InitialState, action) {
  
  switch (action.type) {
    case "OPEN_MODAL":
      return {...state, modal: action.payload};
      
    case "CLOSE_MODAL":
      return {...state, modal: false};

    default:
      return state;
  }
}

export default reducer;
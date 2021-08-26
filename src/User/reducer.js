const InitialState = {
  user: false,
};

const reducer = function(state = InitialState, action) {
///console.log(action)
  switch (action.type) {
    case "SET_USER":
      return {...state, user: action.payload};
      
    case "REMOVE_USER":
      return {...state, user: false};

    default:
      return state;
  }
}

export default reducer;
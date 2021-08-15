const InitialState = {
  searchItems: [],
  userChoise: {
    engineTo: '-1',
    engineFrom: '-1',
    yearFrom: '-1',
    yearTo: '-1',
    manufacturer: '-1',
    model: '-1',
    price: '0-0',
    exchange: '-1',
    withPhoto: '-1',
    fuel: '-1',
    condition: '-1',
    transmission: '-1',
    drive: '-1',
    city: '',
  },
  searchResult: [],
};

const reducer = function(state = InitialState, action) {

  switch (action.type) {
    case "SET_SEARCH_ITEMS":
      return {...state, searchItems: action.payload}
      
    case "REMOVE_SEARCH_ITEMS":
      return {...state, searchItems: []}
      
    case "SET_USER_CHOISE":
      return {...state, userChoise: action.payload}
      
    case "REMOVE_USER_CHOISE":
      return {...state, userChoise: {}}
    
    case "SET_SEARCH_RESULT":
      return {...state, searchResult: action.payload}
      
    case "REMOVE_SEARCH_RESULT":
      return {...state, searchResult: []}

    default:
      return state;
  }
}

export default reducer;

/*
{
  "engineTo": "-1",
  "engineFrom": "-1",
  "yearFrom": "-1",
  "yearTo": "-1",
  "manufacturer": "-1",
  "model": "-1",
  "price": "0-0",
  "exchange": "on",
  "withPhoto": "on",
  "fuel": "-1",
  "condition": "-1",
  "transmission": "-1",
  "drive": "-1",
  "city": ""
}​
*/
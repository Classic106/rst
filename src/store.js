//import { createStore } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import user from './User/reducer';
import modal from './Modal/reducer';
import search from './Search/reducer';
import fullscreen from './FullscreenImages/reducer';

const rootReducer = combineReducers({
    user, modal, search, fullscreen,
});

const store = createStore(rootReducer);
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
//store.subscribe(() => console.log(store.getState()));
export default store;
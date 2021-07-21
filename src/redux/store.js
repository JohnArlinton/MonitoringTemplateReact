import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import mapReducer from "./mapDucks";

const rootReducer = combineReducers({
  map: mapReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generatorStore(){
  const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ))
  return store;
}
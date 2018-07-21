import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import filtersReducer from "../reducers/filters";
import articlesReducer from "../reducers/articles";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default() => {

    const store = createStore( 
        combineReducers({
            filters : filtersReducer,
            articles : articlesReducer 
        }),
        composeEnhancers( applyMiddleware( thunk ))
    );
    
    return store;
};
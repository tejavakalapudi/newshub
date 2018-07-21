import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import { startSetArticles } from "./actions/articles";
import { Provider } from "react-redux";

import NewsApp from "./components/Template";
import LoadingScreen from "./components/LoadingPage";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

//const state = store.getState();

store.dispatch( startSetArticles() ).then(() => {

    ReactDOM.render( <NewsApp store = { store } />, document.getElementById("app") );
    
});

ReactDOM.render( <LoadingScreen /> , document.getElementById("app") );



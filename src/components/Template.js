import React from "react";
import AppRouter from "../routers/AppRouter";
import { Provider } from "react-redux";

class NewApp extends React.Component {

    render(){

        return(
            <div>
                <Provider store = { this.props.store } >
                    <AppRouter/>
                </Provider>
            </div>
        );
    }

};

export default NewApp; 
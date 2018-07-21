import React from "react";

//https://reacttraining.com/react-router/web/guides/philosophy
import { BrowserRouter } from "react-router-dom"; 
import SwitchComponent from "../components/Switch";

class AppRouter extends React.Component {

    render(){
        return(
            <BrowserRouter>
                <SwitchComponent />
            </BrowserRouter>
        );
    }
}

export default AppRouter;

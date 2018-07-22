import React from "react";
import { BrowserRouter } from "react-router-dom"; 
import Switch from "./Switch";

class AppRouter extends React.Component {

    render(){
        return(
            <BrowserRouter>
                <Switch />
            </BrowserRouter>
        );
    }
}

export default AppRouter;

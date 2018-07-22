import React from "react";

//https://reacttraining.com/react-router/web/guides/philosophy
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

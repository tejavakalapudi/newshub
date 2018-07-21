import React from "react";

//https://reacttraining.com/react-router/web/guides/philosophy
import { Route, Switch, withRouter } from "react-router-dom"; 

import Header from "./Header";
import HomePage from "./HomePage";
import NotFound from "./NotFoundPage";

class SwitchComponent extends React.Component {

    render(){

        return(
            <div id = "bodyDiv">
                <Header/>
                <Switch>
                    <Route path = "/" component = { HomePage } exact={true}/>
                    <Route path = "/home" component = { HomePage }/>
                    <Route component = { NotFound } />
                </Switch>
            </div>
        );
    }
}

export default withRouter( SwitchComponent );

import React from "react";

//https://reacttraining.com/react-router/web/guides/philosophy
import { Route, Switch, withRouter } from "react-router-dom"; 

import Header from "../components/Header";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFoundPage";

class SwitchComponent extends React.Component {

    render(){

        return(
            <div>
                <Switch>
                    <Route path = "/" component = { HomePage } exact={true}/>
                    <Route path = "/home" component = { HomePage }/>
                    <Route path = "/liked" component = { HomePage }/>
                    <Route component = { NotFound } />
                </Switch>
            </div>
        );
    }
}

export default withRouter( SwitchComponent );

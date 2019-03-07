import React, { Component } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';

import Main from '../route2/Main';
import About from '../route2/About';
import Topic from '../route2/Topic';
import Home from './Home';
// import A from './A';
// import B from './B';
import Info from './info';
import NotFound from './NotFound';

export default class IRouter extends Component{
    render(){
        return(
            <HashRouter>
                <Home>
                    <Switch>
                        <Route path="/home" render={() =>{
                                return (
                                    <Main>
                                        <Route path="/home/:id" component={Info}/>
                                    </Main>
                                )
                            }
                            } />
                        <Route path="/about" component={About}/>
                        <Route path="/topic" component={Topic}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Home>
            </HashRouter>
        )
    }
}
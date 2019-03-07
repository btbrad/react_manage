import React, { Component } from 'react';
import {HashRouter,Route} from 'react-router-dom';

import Main from '../route2/Main';
import About from '../route2/About';
import Topic from '../route2/Topic';
import Home from './Home';
import A from './A';
import B from './B';

export default class IRouter extends Component{
    render(){
        return(
            <HashRouter>
                <Home>
                        <Route path="/home" render={() =>{
                            return (
                                <Main>
                                    <Route path="/home/a" component={A}/>
                                    <Route path="/home/b" component={B}/>
                                </Main>
                            )
                        }
                        } />
                        <Route path="/about" component={About}/>
                        <Route path="/topic" component={Topic}/>
                </Home>
            </HashRouter>
        )
    }
}
import React, { Component } from 'react'
import { HashRouter,Route,Switch } from "react-router-dom";

import App from './App';
import Login from './pages/Login';
import Admin from './admin'
import Home from './pages/Home';
import Common from './common';

//404
import NoMatch from './pages/nomatch';


import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notification from './pages/ui/notification';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import LoginForm from './pages/form/login';
import RegisterForm from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import AdvancedTable from './pages/table/advancedTable';
import City from './pages/city/index';
import FilterForm from './pages/order/index';
import Detail from './pages/order/detail';


export default class IRouter extends Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>(
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route path="/admin/ui/loadings" component={Loadings}/>
                                <Route path="/admin/ui/notification" component={Notification}/>
                                <Route path="/admin/ui/messages" component={Messages}/>
                                <Route path="/admin/ui/tabs" component={Tabs}/>
                                <Route path="/admin/ui/gallery" component={Gallery}/>
                                <Route path="/admin/ui/carousel" component={Carousel}/>
                                <Route path="/admin/form/login" component={LoginForm}/>
                                <Route path="/admin/form/reg" component={RegisterForm}/>
                                <Route path="/admin/table/basic" component={BasicTable}/>
                                <Route path="/admin/table/advanced" component={AdvancedTable}/>
                                <Route path="/admin/city" component={City}/>
                                <Route path="/admin/order" component={FilterForm}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    )}/>
                    <Route path="/common" render={
                        ()=>(                            
                            <Common>
                                <Route path='/common/order/detail/:orderId' component={Detail} />>
                            </Common>
                        )
                    }/>
                </App>
            </HashRouter>
        )
    }
}
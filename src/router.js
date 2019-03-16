import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

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
import User from './pages/user/index';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar/index';
import Pie from './pages/echarts/pie/index';
import Line from './pages/echarts/line/index';
import Rich from './pages/rich/index';
import Permission from './pages/permission/index';


export default class IRouter extends Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={
                            ()=>(                            
                                <Common>
                                    <Route path='/common/order/detail/:orderId' exact component={Detail} />>
                                </Common>
                            )
                        }/>
                        <Route path="/" render={()=>(
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/ui/buttons" component={Buttons}/>
                                    <Route path="/ui/modals" component={Modals}/>
                                    <Route path="/ui/loadings" component={Loadings}/>
                                    <Route path="/ui/notification" component={Notification}/>
                                    <Route path="/ui/messages" component={Messages}/>
                                    <Route path="/ui/tabs" component={Tabs}/>
                                    <Route path="/ui/gallery" component={Gallery}/>
                                    <Route path="/ui/carousel" component={Carousel}/>
                                    <Route path="/form/login" component={LoginForm}/>
                                    <Route path="/form/reg" component={RegisterForm}/>
                                    <Route path="/table/basic" component={BasicTable}/>
                                    <Route path="/table/advanced" component={AdvancedTable}/>
                                    <Route path="/city" component={City}/>
                                    <Route path="/order" component={FilterForm}/>
                                    <Route path="/user" component={User}/>
                                    <Route path="/bikeMap" component={BikeMap}/>
                                    <Route path="/charts/bar" component={Bar}/>
                                    <Route path="/charts/pie" component={Pie}/>
                                    <Route path="/charts/line" component={Line}/>
                                    <Route path="/rich" component={Rich}/>
                                    <Route path="/permission" component={Permission}/>
                                    <Redirect to="/home" />
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        )}/>
                    </Switch>    
                </App>
            </HashRouter>
        )
    }
}
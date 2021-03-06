import React, { Component } from 'react'
import { HashRouter,Route,Switch,Router } from 'react-router-dom'
import App from './App';
import Login from './pages/login'
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HeightTable from './pages/table/heightTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail'
     
export default class IRouter extends Component{
    render (){
        return(
            // 使用hash路由
            <HashRouter>
                <App>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' render={()=>
                        <Admin>
                            <Switch> {/* 优先匹配匹配到的第一个，不会再向下执行 */}
                                <Route path='/admin/ui/buttons' component={Buttons}/>
                                <Route path='/admin/ui/modals' component={Modals}/>
                                <Route path='/admin/ui/loadings' component={Loadings}/>
                                <Route path='/admin/ui/notification' component={Notice}/>
                                <Route path='/admin/ui/messages' component={Messages}/>
                                <Route path='/admin/ui/tabs' component={Tab}/>
                                <Route path='/admin/ui/gallery' component={Gallery}/>
                                <Route path='/admin/ui/carousel' component={Carousels}/>
                                <Route path='/admin/form/login' component={FormLogin}/>
                                <Route path='/admin/form/reg' component={FormRegister}/>
                                <Route path='/admin/table/basic' component={BasicTable}/>
                                <Route path='/admin/table/high' component={HeightTable}/>
                                <Route path='/admin/city' component={City}/>
                                <Route path='/admin/order' component={Order}/>

                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/common" render={()=>
                         <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                         </Common>
                        }
                    />
                    <Route path='/order/detail' component={Login}/>
                </App>
            </HashRouter>
        );
    }
}
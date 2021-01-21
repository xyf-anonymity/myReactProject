import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
// import { Button,Input} from 'antd'
import 'antd/dist/antd.less'
import './App.css'
import Login from './containers/Login/Login.jsx'
import Admin from './containers/Admin/Admin.jsx'
export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Redirect to='/login' />
        </Switch>
      </div>
    )
  }
}


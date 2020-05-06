import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import AdminHome from './AdminHome';
import EditTicket from './EditTicket';
import UserHome from './UserHome';
import AuthProtect from './AuthProtect';

export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
    
    }



  }


  render()
  {


    return(
      <BrowserRouter>
         
         
          <Route path="/login" component={Login}/>         
          <Switch>             
          <Route exact path="/editarTicket/:id" component={AuthProtect(EditTicket)}/>  
          <Route path="/home" component={AuthProtect(UserHome)}/>
          <Route path="/admin" component={AuthProtect(AdminHome)}/>                  
          </Switch>
           {/* Force Redirect to login */}
          <Route path="/" component={AuthProtect(Login)}/> 
                                     
        </BrowserRouter>
   
    )
  }

}


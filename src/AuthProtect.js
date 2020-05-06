import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        reactDefault:false,
        default:'',
      };
    }
    componentDidMount() {
      
      var route = this.props.location.pathname;     
      console.log(route) ;
      let config = {
        method: 'POST',
        credentials: 'include',  
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body:JSON.stringify({route:route})                                            
      }
      fetch('http://127.0.0.1:9000/checkToken',config)
        .then( async (res) => {
          if (res.status === 200) {            
            this.setState({ loading: false });
          } 
          else if (res.status===201)
          {
             let data = await res.json();
             this.setState({default:data.route,redirectDefault:true,loading:false});
             
          }
          else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect, redirectDefault } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      if (redirectDefault) {
        return <Redirect to={this.state.default} />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}
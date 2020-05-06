import React from 'react';
import './logintemplate/css/main.css';
import './logintemplate/css/util.css';
import Cookies from 'js-cookie';


export default class Login extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={

    //   users:[],
    //   email:'admin@example.com',
    //   password:'123456'

        email:'',
        password:'',
        showError:false,
        messageError:'',
        
    



    }

    this._LoginButton = this._LoginButton.bind(this);
    this._handleEmail = this._handleEmail.bind(this);
    this._handlePassword = this._handlePassword.bind(this);

  }

  async componentDidMount(){



//    try {
//     let config = {
//         method:'POST',
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({email:this.state.email,password:this.state.password})
//       }
//         let response = await fetch('http://127.0.0.1:9000/auth',config) 
//         const status = response.status;
//         let data = await response.json()
//         console.log(data)
//       } catch (error) {
//         console.log("ErrorAuth",error)
    
//     }


  }

  _handleEmail(event)
  {
    this.setState({email:event.target.value});
    
  }
  _handlePassword(event)
  {
    this.setState({password:event.target.value});
    
  }
  async _LoginButton(e){
    e.preventDefault();
    this.setState({showError:false,messageError:''})
   try {
    let config = {
        method:'POST',    
        credentials: 'include',      
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
                     
        }, 
               
        body:JSON.stringify({email:this.state.email,password:this.state.password})
      }
       fetch('http://127.0.0.1:9000/auth',config).then(async (res)=>{

      
        console.log(res);

          if (res.status === 200) {
            this.props.history.push('/admin');
            console.log(res)
              
          } else {
            const error = new Error(res.error);
            throw error;
          }


        })
        



      } catch (error) {
        console.log("ErrorAuth",error)
    
    }


  }


  render()
  {
    return(	
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-33">
                           Gestion de Tickets - ReactJS + NodeJS
                        </span>
    
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" onChange={this._handleEmail} name="email" placeholder="Email" required />
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>
    
                        <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" onChange={this._handlePassword} name="pass" placeholder="Password" required/>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>
                        {this.state && this.state.showError ?<div className="text-center p-t-25">
                            <label>{this.state.messageError}</label>
                        </div> :  
                        
                        <div/>
                        }


                       
    
                        <div className="container-login100-form-btn m-t-20">
                            <button className="login100-form-btn" onClick ={this._LoginButton}  >
                                Iniciar Sesion
                            </button>
                        </div>
        
                    </form>
                </div>
            </div>            
        </div>
        
    )
  }

}


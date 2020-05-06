import React from 'react';
import './logintemplate/css/main.css';
import './logintemplate/css/util.css';
import './dashboard/app.css';


export default class UserHome extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
        nombre:'',
        tickets:[],   
        userId:0,     
    }

    
    this.fetchTickets = this.fetchTickets.bind(this);
    this.logout = this.logout.bind(this);
    this.adquirir = this.adquirir.bind(this);

  }

  async fetchTickets()
  {

    try {
        let response = await fetch('http://127.0.0.1:9000/fetchTickets')
        let data = await response.json()
        this.setState({tickets:data})        
        } catch (error) {
        console.log("Error get all ticket info",error)        
    }  

  }

  

  async componentDidMount(){


   // OBTENER TICKETS
    this.fetchTickets();

    let config = {
        method: 'GET',
        credentials: 'include',  
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
      }
    let resp =await fetch('http://127.0.0.1:9000/getUserInfo',config);
    let data = await resp.json();
    this.setState({userId:data.id});


  }

  async logout(e){
    e.preventDefault();

    let config = {
        method: 'GET',
        credentials: 'include',                                              
      }
      fetch('http://127.0.0.1:9000/logout',config)
        .then(res => {
          if (res.status === 200) {
             this.props.history.push('/login');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);          
    });

}

 async adquirir(id,e)
 {
     e.preventDefault();

     
    let config = {
        method: 'PUT',
        credentials: 'include',  
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body:JSON.stringify({id:id,id_user:this.state.userId})                                            
      }
    let resp =await fetch('http://127.0.0.1:9000/setTicket',config);
    let data = await resp.json();
    this.fetchTickets();
    console.log(data);
    
 }



  render()
  {
    return(	
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                <a className="form-group row" href="#" onClick={this.logout}>Logout</a>
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-33">
                           User Panel
                        </span>    
                            <div className="form-group">
                                <label>Lista de tickets</label>
                                <table className ="form-group table">                                 
                                    <tbody>
                                        <tr>
                                            <td><b>Ticket Pedido</b></td>
                                            <td><b>Usuario</b></td>
                                            <td><b>Accion</b></td>
                                        </tr>    
                                        {
                                        this.state.tickets && this.state.tickets.map(value =>{
                                            
                                            if (value.nombre==="no asignado")
                                            {
                                                return (<tr key={value.id}>                                            
                                                    <td>{value.ticket_pedido}</td>   
                                                    <td>{value.nombre}</td>                                                                         
                                                    <td>
                                                    <div className="input-group-prepend">
                                                    <button type="button" className="btn btn-primary btn-sm"
                                                    onClick={(e)=>this.adquirir(value.id,e)}>  
                                                      Adquirir                                              
                                                    </button>                                            
                                                    </div>
                                                    </td> 
                                                </tr>)
                                            }
                                            else
                                            {
                                                return (<tr key={value.id}>                                            
                                                    <td>{value.ticket_pedido}</td>   
                                                    <td>{value.nombre}</td>                                                                         
                                                    <td>
                                                    <div className="input-group-prepend">
                                                    <p>No disponible</p>                                          
                                                    </div>
                                                    </td> 
                                                </tr>)
                                            }



                                       })
                                        }                                                                    
                                     
                                    </tbody>                                    
                                 </table> 
                            </div>            
                    </form>
                </div>
            </div>
            
        </div>
        
    )
  }

}


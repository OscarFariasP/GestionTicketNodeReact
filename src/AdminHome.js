import React from 'react';
import './logintemplate/css/main.css';
import './logintemplate/css/util.css';
import './dashboard/app.css';
//import './dashboard/app';
import Dropdown from 'react-bootstrap/Dropdown';

export default class AdminHome extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
        nombre:'',
        tickets:[],
        ticket_pedido:'',
        selectedUser:0,
        users:[]
    }

    this.createTicket = this.createTicket.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);    
    this.handleSelectOnChange = this.handleSelectOnChange.bind(this);
    
    this.eliminarTicket = this.eliminarTicket.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);
    this.logout = this.logout.bind(this);

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

    // OBTENER USUARIOS
    try {
        let response = await fetch('http://127.0.0.1:9000/users')
        let data = await response.json()
        this.setState({users:data})        
    } catch (error) {
        console.log("Error get all users info",error)
        
    }     
   // OBTENER TICKETS
    this.fetchTickets();


  }
  handleOnChange(event)
  {
      this.setState({ticket_pedido:event.target.value});
  }
  handleSelectOnChange(event)
  {
      this.setState({selectedUser:event.target.value});
      //console.log(event.target.value);
  }
  async createTicket(e)
    {
        e.preventDefault();
        // POST TICKET
         try {
               let config = {
                   method:'POST',
                   headers:{
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   },
                   body:JSON.stringify({ticket_pedido:this.state.ticket_pedido,
                                        id_user:this.state.selectedUser })
               }
               //console.log(config)
                let response = await fetch('http://127.0.0.1:9000/createTicket',config)
                let data = await response.json()                
                this.setState({tickets:this.state.tickets.concat(data),ticket_pedido:''})
        } catch (error) {
                console.log("ErrorPost",error)    
        }
    }

    async eliminarTicket(id,e)
    {
        e.preventDefault();
        
        // DELETE TICKET

         try {
               let config = {
                   method:'DELETE',
                   headers:{
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                   },
                   body:JSON.stringify({id:id})
               }
              // console.log(config)
                let response = await fetch('http://127.0.0.1:9000/deleteTicket',config)
                if (response.status==200)
                {
                    this.fetchTickets();
                }                
        } catch (error) {
                console.log("ErrorDelete",error)
             
        }
        
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


  render()
  {
    return(	
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                    <a className="form-group row" href="#" onClick={this.logout}>Logout</a>
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-33">
                           AdminPanel
                        </span>
    
                        <div className="form-group row">
                                <p  className="col-form-label text-md-right">Crear un Ticket:</p>
                                <div className="col-md-5">
                                    <input id="ticketName" type="text" className="form-control"
                                        value={this.state.ticket_pedido}
                                        onChange = {this.handleOnChange}
                                        name="ticketName" required/>                                 
                                </div>    
                                                                                   
                        </div>  
                        <div className="form-group row">
                                <p  className="col-form-label text-md-right">Lista Usuarios:</p>
                                <div className="col-md-5">
                                    <select name="userList" onChange={this.handleSelectOnChange} className="form-control">
                                        <option value="0">no asignado</option>
                                        {
                                            this.state.users && this.state.users.map(item=>(
                                            <option value={item.id} key={item.id} >{item.nombre}</option>
                                            ))
                                        }
                                    </select>                                  
                                </div>
                                <button className="btn btn-primary" onClick={this.createTicket} >Crear</button>                        
                            </div>  

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
                                        this.state.tickets && this.state.tickets.map(value => 
                                        (<tr key={value.id}>                                            
                                            <td>{value.ticket_pedido}</td>   
                                            <td>{value.nombre}</td>                                                                         
                                            <td>
                                            <div className="input-group-prepend">
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic-button">
                                                    
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item  href={"/editarTicket/"+value.id} >Editar</Dropdown.Item>
                                                    <Dropdown.Item as="button" onClick={(e)=>this.eliminarTicket(value.id,e)}>Eliminar</Dropdown.Item>                                                    
                                                </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            </td> 
                                        </tr>))
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


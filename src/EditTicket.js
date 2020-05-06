import React from 'react';
import './logintemplate/css/main.css';
import './logintemplate/css/util.css';
import './dashboard/app.css';
//import './dashboard/app';


export default class EditTicket extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
        
        id:0,
        ticket_pedido:'',
                
    }

    
    this.handleOnChange = this.handleOnChange.bind(this);    
    
    this.editarTicket = this.editarTicket.bind(this);
    


  }



  async componentDidMount(){

    

    try {
        let config = {
            method:'POST',
            credentials: 'include',   
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:this.props.match.params.id})
        }
        //console.log(config)
                let response = await fetch('http://127.0.0.1:9000/getTicket',config)
                let data = await response.json()
                this.setState({ticket_pedido:data.ticket_pedido,id:data.id})     
                                            
        } catch (error) {
                console.log("Error GET TICKET INFO",error)    
        }


  }


  handleOnChange(event)
  {
      this.setState({ticket_pedido:event.target.value});
  }
  
  
    async editarTicket(e)
    {
       e.preventDefault();
       
       
    try {
        let config = {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:this.props.match.params.id,ticket_pedido:this.state.ticket_pedido})
        }
        //console.log(config)
                let response = await fetch('http://127.0.0.1:9000/editTicket',config)
                let data = await response.json()
                //console.log(data)
                if ((response.status==200) && (data.message==='sucess') )
                {
                    document.getElementById('goBack').click();
                }
                else
                {
                    alert(data.message);
                }
              
        } catch (error) {
                console.log("Error EDIT TICKET INFO",error)    
        }
       
    }
    


  render()
  {
    return(	
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-25">
                           Admin Panel
                        </span>
    
                        <div className="form-group row">
                                <p  className="col-form-label text-md-right">Editar Ticket:</p>
                                <div className="col-md-5">
                                    <input id="ticketName" type="text" className="form-control"
                                        value={this.state.ticket_pedido}
                                        onChange = {this.handleOnChange}
                                        name="ticketName" required />                                 
                                </div>    
                                <button className="btn btn-primary" onClick={this.editarTicket} >Editar</button>                                                   
                                <a id="goBack" type="hidden" href="/admin"></a>
                        </div>             
                    </form>
                </div>
            </div>
            
        </div>
        
    )
  }

}


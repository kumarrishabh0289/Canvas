import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Announcement extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
            content:"",
            authFlag : false
        }
        //Bind the handlers to this class
        this.contentChangeHandler = this.contentChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
  
    contentChangeHandler = (e) => {
        this.setState({
            content : e.target.value
        })
    }
 
  
    //submit Login handler to send a request to the node backend
    submitCreate = (e) => {
        
        const params = {

        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,

            },
        };
        //prevent page from refresh
        e.preventDefault();
        const data = {
            course_id:localStorage.course,
            content:this.state.content,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/announcement',data, options)
            .then(response => {
                console.log("Status Code : ",response.status); 
                if(response.status === 201){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });        
    }
    render()
    {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag){
            redirectVar = <Redirect to= "/teacherdashboard"/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                <h1>Create New Announcement.</h1>
                        <div style={{width: '30%'}} class="form-group">
                            <textarea onChange = {this.contentChangeHandler} type="textarea" rows="8" cols="50" class="form-control" name="Content" placeholder="Course Content"/>
                        </div>
                        <br/>
                       
                        
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate} class="btn btn-success">Create new Announcement</button>
                        </div> 
                </div> 
            </div>
        )
    }
}

export default Announcement;
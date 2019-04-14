import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import url from '../Url/Url';

class Delete extends Component{

        //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
           
            authFlag : false,
            status:"",

        }
        //Bind the handlers to this class
        this.bookidChangeHandler = this.bookidChangeHandler.bind(this);
   
        this.submitButton = this.submitButton.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
 
    bookidChangeHandler = (e) => {
        this.setState({
            bookid : e.target.value
        })
    }
 

    //submit Login handler to send a request to the node backend
    submitButton = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            bookid : this.state.bookid,
        
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.delete(url.url+'delete',{data})
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        status:response.data,
                    })
                }
                else{
                    console.log("Status Code : ",response.status);
                    this.setState({
                        
                        status:response.data
                    })
                }
                    

               
            });
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.authFlag){

            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
           
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text"  onChange = {this.bookidChangeHandler} class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success"   onClick = {this.submitButton} type="submit">Delete</button>

                    </div> 
                </form>
                <br/>
                <div style={{width: "50%",float: "left"}} >
                        <font color='red'><b>{this.state.status}</b></font>
                    </div>
                
                           
            </div>
            </div>
        )
    }
}

export default Delete;
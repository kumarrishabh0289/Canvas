import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            user:"",
            email:"",
            role:"",
            books :[],
            student_course:[],
            

        }
    }  
   
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    render(){
            //if not logged in go to login page
        let redirectVar = null;
        if( !cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        
        if(localStorage.role == 'teacher'){
            redirectVar = <Redirect to= "/course"/>
          
        return(
            <div>
                {redirectVar}
                <p>Welcome {this.state.user}</p><br />

                <div class="container">
                    <h2>This is a Teacher View</h2>
                        
                </div> 
            </div> 
        )
    }
    if(localStorage.role == 'student'){
        redirectVar = <Redirect to= "/student"/>
        return(
            <div>
            {redirectVar}
            <p>Welcome {this.state.user}</p><br />

            <div class="container">
                <h2>This is a student View</h2>
                    
            </div> 
        </div> 
        )
    }
        else {
            
            return(
                <div class="container">
                <p>Login Again</p>
                

                </div>
               
            )
    }

    }
}
//export Home Component
export default Home;
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from "react-redux";

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {  
            user:"",
            email:"",
            role:"",
            

        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        axios.get('http://localhost:3001/session')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    user : response.data.user,
                    email: response.data.email,
                    role: response.data.role
                });
                console.log(this.state.user)
                console.log(this.state.email)
                console.log(this.state.role)
            });
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        this.props.onLogout();
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout} class="nav-link"><span class="glyphicon glyphicon-user" ></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login" class="nav-link"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }


        var path = window.location.origin + '/logo.png';
       
        
        return(
            <div>
                {redirectVar}
                <nav class="navbar  navbar-fixed-top bg-dark navbar-dark">
                    <div class="container-fluid">
                        <div class="navbar-header">

                            <Link to="/home" class="navbar-brand"><img src={path} height='40' width='170' alt="Profile Pic"  /> </Link>
                        </div>
                        <ul class="navbar-nav">
                           


                        </ul>
                        {navLogin}
                    </div>
                    </nav>

                <div class="sidebar">

                    <div class="s-layout__sidebar">
                        <a class="s-sidebar__trigger" href="#0">
                            <i class="fa fa-bars"></i>
                        </a>

                        <nav class="s-sidebar__nav">
                            
                            <Link to="/home" class="nav-link">Home</Link>
                           <Link to="/create" class="nav-link">Sign Up</Link>
                          <Link to="/profile" class="nav-link">Profile</Link>
                               
                           
                        </nav>
                    </div>
                </div>
               
            </div>
        )
         



    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispachToProps = dispatch => {
    return {
        onLogout: () => dispatch({
            type: "LOGOUT",
            
        }),

    };
};

//export Home Component
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Navbar);
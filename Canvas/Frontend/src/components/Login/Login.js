import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
axios.defaults.withCredentials = true;
//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            role: "student",
            user: "",
            
        }
        
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        axios.get('http://localhost:3001/session')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    
                    user: response.data.user,

                });
                console.log("in component will mount");
                console.log(this.state.user)

            });
        this.setState({
            authFlag: false
        });
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    roleChangeHandler = (e) => {
        this.setState({
            role: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/user/login', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('jwt', response.data.jwt);
                    localStorage.setItem('name', response.data.name);
                    console.log((localStorage.email))
                    this.props.onLogin(data);
                    console.log(response.data);
                    this.setState({
                        authFlag: true,
                        user: response.data,
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

//Check Login handler to send a request to the node backend
checkLogin = (e) => {
    var headers = new Headers();
    const params = {
        secret_token : localStorage.jwt,
      };
    const options = {
        params,
        headers: {
          
          
        },
       };
    //prevent page from refresh
    e.preventDefault();
    axios.get('http://localhost:3001/secret',options).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      }); //experiment
}

    render() {
        //redirect based on successful login
        let redirectVar = null;

        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
            console.log("cookie is defined");
            

        }
       
        return (
            <div>

                {redirectVar}

                <div class="container">


                    <div class="main-div">
                        <div class="panel">
                            <h2>Login To System</h2>
                            <br />

                        </div>

                        <div class="form-group">
                            <input onChange={this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                        </div>
                        <div class="form-group">
                            <select onChange={this.roleChangeHandler} class="form-control">
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <button onClick={this.submitLogin} class="btn btn-primary">Login</button> <t/>
                        <button onClick={this.checkLogin} class="btn btn-primary">Test </button>
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
        onLogin: (data) => dispatch({
            type: "LOG_IN",
            username: data.username,
            password: data.password,
            role: data.role,
        }),

    };
};
//export Login Component
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Login);


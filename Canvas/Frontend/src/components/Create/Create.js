import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

class Create extends Component {

    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            name: "",
            type: "student",
            password: "",
            authFlag: false,
            status: "",

        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitButton = this.submitButton.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    typeChangeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitButton = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            name: this.state.name,
            role: this.state.type,
            password: this.state.password,
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/user', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {

                    this.props.onNewUserCreatation(data);

                    this.setState({
                        authFlag: true,
                        status: response.data,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);
                    this.setState({

                        status: response.data
                    })
                }



            });
    }
    render() {
        //redirect based on successful login
        //let redirectVar = null;

        if (this.state.authFlag) {
            console.log("inside render auth state");
            //redirectVar = <Redirect to="/home" />
        }


        return (

            <div>

                <div class="container">

                    <div class="body-div">
                        <div>
                            <div>
                                <br/>
                                <h2>User SignUp</h2>
                                <p>Please Enter Your Detail</p>
                            </div>

                            <div class="form-group">
                                <input onChange={this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.emailChangeHandler} type="email" class="form-control" name="Email" placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="Password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <select onChange={this.typeChangeHandler} class="form-control">
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                            <button onClick={this.submitButton} class="btn btn-primary">Create User</button>
                            <br />
                            <font color='red'><b><p>{this.state.status}</p></b></font>

                        </div>

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

        onNewUserCreatation: (data) => dispatch({
            type: "NEW_USER",
            email: data.email,
            name: data.name,
            type_role: data.role,
            password: data.password,

        }),

    };
};


export default connect(
    mapStateToProps,
    mapDispachToProps
)(Create);

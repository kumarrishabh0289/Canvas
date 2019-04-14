import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import url from '../Url/Url';

class Mail extends Component {
    constructor() {
        super();
        this.state = {
            mail: [],
            user: [],
            from: [],
            to: "",
            content: "",
            message:""


        }
        //Bind the handlers to this class

        this.toChangeHandler = this.toChangeHandler.bind(this);
        this.contentChangeHandler = this.contentChangeHandler.bind(this);


    }


    //get the books data from backend  
   
    componentDidMount() {
       
        const params = {

            to: localStorage.email,
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,

            },
        };
        axios.get(url.url+'mail', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    mail: this.state.mail.concat(response.data),

                });

            });
        axios.get(url.url+'user')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    user: this.state.user.concat(response.data),

                });

            });
            axios.get(url.url+'mail/from', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    from: this.state.from.concat(response.data),

                });

            });

    }



    toChangeHandler = (e) => {
        this.setState({
            to: e.target.value
        })
    }
    contentChangeHandler = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            to:this.state.to,
            from:localStorage.email,
            content:this.state.content

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(url.url+'mail', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 201) {
                    
                    this.setState({
                        authFlag: true,
                        message: response.data.message,
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    render() {
        return (
            <div class="container">
                <br />
                <p>Welcome, {localStorage.name}</p><br />
                <h4>Your Messages Inbox</h4>
                <table class="table">
                    <tr>
                        <th>Date and time</th>
                        <th>From</th>
                        <th>Content</th>
                    </tr>

                    {
                        this.state.mail.map(item => {
                            return (

                                <tr>
                                    <td>{item.time}</td>
                                    <td>{item.from}</td>
                                    <td>{item.content}</td>
                                </tr>

                            )
                        })
                    }
                </table>
                    <br/>
                <hr />
                <h4>Your Messages Outbox</h4>
                <table class="table">
                    <tr>
                        <th>Date and time</th>
                        <th>To</th>
                        <th>Content</th>
                    </tr>

                    {
                        this.state.from.map(item => {
                            return (

                                <tr>
                                    <td>{item.time}</td>
                                    <td>{item.to}</td>
                                    <td>{item.content}</td>
                                </tr>

                            )
                        })
                    }
                </table>
                <br/>
                <hr/>
                <h4>Send Message to other Users</h4>
                <div class="form-group">
                    <table>
                        <tr>
                            <th>To</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    <tr>
                    <td>
                        <select onChange={this.toChangeHandler} class="form-control" required>
                        <option value="">Select Recepient</option>
                            {
                                this.state.user.map(item => {
                                    return (
                                       
                                           
                                                <option value={item.email}>{item.name}, {item.role}</option>
                                            

                                            
                                    )
                                })
                            }
                        </select>
                        </td>
                        <td>

                        <input onChange={this.contentChangeHandler} type="text" class="form-control" />
                    </td>
                    <td>
                    <button onClick={this.submitLogin} class="btn btn-primary">Send Message</button>
                    </td>
                </tr>




                    </table>
                    <p>{this.state.message}</p>
                </div>

            </div>
        )
    }

}

//export Mail Component
export default Mail;
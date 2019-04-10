import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            books: [],
            student_course: [],
            url: "",


        }
    }
    //get the books data from backend  
    componentWillMount() {

    }

    componentDidMount() {
        var headers = new Headers();
        const params = {
            secret_token: localStorage.jwt,
            email: localStorage.email,
        };
        const options = {
            params,
            headers: {


            },
        };
        axios.get('http://localhost:3001/enroll', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_course: response.data
                });

            });
    }
    submitButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            course_id: course.course_id,


        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/dropcourse', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        status: response.data,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);

                }



            });
    }

    ProgressButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            course_id: course.course_id,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/setcourse', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        status: response.data,
                        url: 1,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);

                }



            });
    }

    render() {

        //iterate over student_course to create a table row

        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        if (this.state.url == 1) {
            redirectVar = <Redirect to="/studentdashboard" />


        }



        return (
            <div class="container">
                {redirectVar}



                <div class="body-div">
                    <p>Welcome {localStorage.name}</p><br />





                    <h2>Course Cart</h2>
                    <div class="card-columns">



                        {
                            this.state.student_course.map(course => {
                                var stat = "";
                                var color = "card bg-info text-white";
                                if (course.status == 'waitlist') {
                                    stat = course.number;
                                    color = "card bg-warning text-white";

                                }
                                return (

                                    <Draggable>
                                        <div>

                                            <div class={color}>
                                                <div class="card-header">
                                                    {course.course_id}
                                                </div>
                                                <div class="card-body text-center">
                                                    <p class="card-text">
                                                        {course.status}  {stat}

                                                    </p>
                                                </div>
                                                <div class="card-footer">
                                                    <button onClick={() => this.ProgressButton(course)} class="btn btn-light"> Course Progress </button>
                                                    <div class="divider" />
                                                    <button onClick={() => this.submitButton(course)} class="btn btn-outline-dark"> Drop Course </button>
                                                </div>

                                            </div>
                                        </div>
                                    </Draggable>

                                )
                            })
                        }
                    </div>
                    <Link to="/enroll"><button class="btn btn-primary">+ Enroll For Course</button></Link>

                </div>

            </div>
        )



    }
}
//export Home Component
export default Student;
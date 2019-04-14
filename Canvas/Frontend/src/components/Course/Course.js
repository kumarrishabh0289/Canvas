import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

import url from '../Url/Url';


class Courses extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            name: "",
            role: "",
            email: "",
            courses: [],
            url: "",

        }
    }

    ProgressButton = (course) => {
        localStorage.setItem('course', course.course_id);
        this.setState({
            authFlag: true,
            url: 1,
        })
    }


    componentDidMount() {

        const params = {

            email: localStorage.email
        };
        const options = {
            params,
            headers: {


            },
        };
        axios.get(url.url+'course/email', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    courses: this.state.courses.concat(response.data)
                });
            });
    }


    render() {
        //iterate over books to create a table row

        //if not logged in go to login page
        let redirectVar = null;

        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        if (this.state.url === 1) {
            redirectVar = <Redirect to="/teacherdashboard" />


        }
        if (localStorage.role === 'teacher') {
            return (
                <div class="container">
                    {redirectVar}

                    <div class="body-div">
                        <br />
                        <h2>Faculty Dashboard</h2><br />
                        <p>Welcome, {localStorage.name}</p>
                        <div class="card-columns">
                            {
                                this.state.courses.map(course => {

                                    return (

                                        <Draggable>
                                            <div>

                                                <div class="card bg-info text-white">
                                                    <div class="card-header">
                                                        {course.course_id}
                                                    </div>
                                                    <div class="card-body ">
                                                        <p class="card-text">
                                                            <table>
                                                                <tr>
                                                                    <th>Course Name</th><td>{course.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Department</th>
                                                                    <td>{course.department}</td>
                                                                </tr>


                                                                <tr>
                                                                    <th>Room No.</th><td>{course.room}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Capacity</th> <td>{course.capacity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Permited Waiting</th><td>{course.waiting}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Term</th><td>{course.term}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Enrolled</th><td>{course.total_enroll}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Waiting</th><td>{course.current_wait}</td>
                                                                </tr>

                                                            </table>

                                                        </p>
                                                    </div>
                                                    <div class="card-footer">
                                                        <button onClick={() => this.ProgressButton(course)} class="btn btn-primary">Goto Course</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </Draggable>

                                    )
                                })
                            }


                        </div>
                    </div>

                    <Link to="/createcourse"><button class="btn btn-success">Create new course</button></Link>
                </div>
            )
        }
        else {
            return (
                <div class="container">
                    <div class="body-div">
                        <h3>You are not authorized to view this page.</h3>
                    </div>
                </div>
            )
        }
    }
}
//export Home Component
export default Courses;
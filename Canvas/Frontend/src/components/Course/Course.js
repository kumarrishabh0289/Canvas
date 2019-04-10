import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

var role;
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
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            course_id: course.course_id,
        }

        axios.defaults.withCredentials = true;

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


    componentDidMount() {
        var headers = new Headers();
        const params = {

            email: localStorage.email
        };
        const options = {
            params,
            headers: {


            },
        };
        axios.get('http://localhost:3001/course/email', options)
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
        var cretebutton = <Redirect to="/create" />
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        if (this.state.url == 1) {
            redirectVar = <Redirect to="/teacherdashboard" />


        }
        if (localStorage.role == 'teacher') {
            return (
                <div class="container">
                    {redirectVar}

                    <div class="body-div">
                        <br />
                        <h2>List of All Courses</h2>
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
                                                                    <th>Faculty Email</th><td>{course.faculty_email}</td>
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
                                                                    <th>TA's Email</th><td>{course.ta_email}</td>
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
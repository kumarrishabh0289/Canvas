import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class StudentDashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            books: [],
            student_course: [],
            url: "",
            announcement: [],
            lecture: [],
            quiz: [],
            student_assign: [],


        }
    }
    componentWillMount() {
        const params = {

            student: localStorage.email,

        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,

            },
        };
        axios.get('http://localhost:3001/submission/assignment', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_assign: response.data,

                });


            });

        axios.get('http://localhost:3001/submission/quiz', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    quiz: response.data,

                });


            });

    }

    componentDidMount() {
        const params = {

            course: localStorage.course,
            status: "enrolled"
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,

            },
        };

        axios.get('http://localhost:3001/enroll/status', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_course: response.data
                });

            });

        axios.get('http://localhost:3001/announcement/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    announcement: response.data
                });

            });

        axios.get('http://localhost:3001/lecture/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    lecture: response.data
                });

            });

    }

    render() {

        return (
            <div class="container">
                <br />
                <h4>Course Dashboard for {localStorage.course}</h4><br />
                <p>Welcome, {localStorage.name}</p>

                <ul class="nav nav-tabs">
                    <li class="nav-item active"><a data-toggle="tab" href="#home" class="nav-link">Announcemets</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu1" class="nav-link">Lecture Files</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu2" class="nav-link">Students in your Class</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu3" class="nav-link">Assignments And Quizzes</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu4" class="nav-link">Grades</a></li>
                </ul>

                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active">
                        <h3>Announcemets</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Announcement Id</th>
                                    <th>Content</th>



                                </tr>
                            </thead>
                            {
                                this.state.announcement.map(announce => {


                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{announce._id}</td>
                                                <td>{announce.content}</td>



                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                    <div id="menu1" class="tab-pane fade"><br />
                        <h4>Lecture Files</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Content</th>
                                    <th>URL</th>



                                </tr>
                            </thead>
                            {
                                this.state.lecture.map(lect => {
                                    var ref = "#";
                                    ref = ref + lect._id;
                                    var path = "http://localhost:3000/uploads/";
                                    if (lect.url) {
                                        path = path + lect.url;

                                    }
                                    else path = path + "nodocs.png";

                                    return (
                                        <tbody>
                                            <tr>







                                                <td> {lect.content}</td>
                                                <td>
                                                    <div id={lect._id} class="modalDialog">
                                                        <div>

                                                            <a href="#close" title="Close" class="close">X</a>
                                                            <embed src={path} height="800" width="800"></embed>



                                                        </div>
                                                    </div>
                                                    <a href={ref}>Open Document</a>

                                                </td>




                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                    <div id="menu2" class="tab-pane fade">
                        <h3>Students in your Class:</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Student's Email</th>

                                    <th>Status</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    this.state.student_course.map(course => {


                                        return (

                                            <tr>
                                                <td>{course.student}</td>

                                                <td>{course.status}</td>
                                                <td></td>


                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div id="menu3" class="tab-pane fade">
                        <br />
                        <h4>Assignments And Quizzes</h4>
                        <table>
                            <tr>
                                <th><Link to="/studentassignment"><button class="btn btn-primary">List of Assignments </button></Link></th>
                                <th><Link to="/SubmissionView"><button class="btn btn-primary">You Submitted Assignment </button></Link></th>
                                <th><Link to="/studentquiz"><button class="btn btn-primary"> List of Quiz </button></Link></th>
                                <th><Link to="/studentquizView"><button class="btn btn-primary"> You Submitted Quiz </button></Link></th>
                            </tr>
                            <tr>

                            </tr>




                        </table>
                    </div>
                    <div id="menu4" class="tab-pane fade">
                        <br />
                        <h4>Grades</h4>
                        <br />
                        <h4>Quiz Grade</h4>
                        <table class="table">
                            <tr>
                            <th>Quiz Ref #</th>
                                <th>Quiz Status</th>
                                <th>Total Marks</th>
                                <th>Obtained Marks</th>
                            </tr>
                            {
                                this.state.quiz.map(qui => {
                                    return (
                                        <tr>
                                            <td>
                                                {qui.quiz_id}
                                            </td>
                                            <td>
                                                {qui.status}
                                            </td>
                                            <td>
                                                {qui.marks}
                                            </td>
                                            <td>
                                                {qui.grade}
                                            </td>
                                        </tr>





                                    )
                                })
                            }
                        </table>
                        <h4>Assignment Grade</h4>
                        <table class="table">
                            <tr>
                            <th>Assignment Ref #</th>
                                <th>Assignment Status</th>
                                <th>Total Marks</th>
                                <th>Obtained Marks</th>
                            </tr>
                            {
                                this.state.student_assign.map(assign => {
                                    return (
                                        <tr>
                                            <td>
                                                {assign.assignment_id}
                                            </td>
                                            <td>
                                                {assign.status}
                                            </td>
                                            <td>
                                                {assign.marks}
                                            </td>
                                            <td>
                                                {assign.grade}
                                            </td>
                                        </tr>





                                    )
                                })
                            }
                        </table>

                    </div>





                    </div>


                </div>
                )
            }
        
        }
        
        //export Home Component
export default StudentDashboard;
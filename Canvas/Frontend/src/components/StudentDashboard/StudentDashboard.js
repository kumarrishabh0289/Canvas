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


        }
    }
    componentWillMount() {
        axios.get('http://localhost:3001/session')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    user: response.data.user,
                    email: response.data.email,
                    role: response.data.role,
                    course: response.data.course,
                });
                console.log(this.state.user)
                console.log(this.state.email)
                console.log(this.state.role)
            });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/studentincourse')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_course: response.data
                });

            });

        axios.get('http://localhost:3001/announcementview')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    announcement: response.data
                });

            });

        axios.get('http://localhost:3001/lectureview')
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
                <h3>{this.state.user}'s Course Dashboard for {this.state.course}</h3><br /><br />

                <ul class="nav nav-tabs">
                    <li class="nav-item active"><a data-toggle="tab" href="#home" class="nav-link">Announcemets</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu1" class="nav-link">Lecture Files</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu2" class="nav-link">Students in your Class</a></li>
                    <li class="nav-item"><a data-toggle="tab" href="#menu3" class="nav-link">Assignments And Quizzes</a></li>
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
                                                <td>{announce.id}</td>
                                                <td>{announce.content}</td>



                                            </tr>
                                        </tbody>
                                    )
                                })
                            }

                        </table>
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        <h3>Lecture Files</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>URL</th>



                                </tr>
                            </thead>
                            {
                                this.state.lecture.map(lect => {
                                    var ref = "#";
                                        ref = ref + lect.time;
                                        var path = "http://localhost:3000/uploads/";
                                        if(lect.url){
                                            path = path + lect.url;

                                        }
                                        else path = path + "nodocs.png";

                                    return (
                                        <tbody>
                                                <tr>







                                                    <td> {lect.time}</td>
                                                    <td>
                                                        <div id={lect.time} class="modalDialog">
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
                        <h3>Assignments And Quizzes</h3>
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
                </div>








            </div>
        )
    }

}

//export Home Component
export default StudentDashboard;
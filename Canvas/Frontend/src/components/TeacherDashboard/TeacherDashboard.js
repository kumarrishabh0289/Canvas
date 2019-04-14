import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import url from '../Url/Url';

class TeacherDashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            course: "",
            student_course: [],
            assign: [],
            url: "",
            file: null,
            file_status: [],
            announcement: [],
            quiz: [],
            lecture: [],
            status_drop: "",
            permission_number: [],
            number: 5,


        }
        this.onChange = this.onChange.bind(this);
        this.numberChangeHandler = this.numberChangeHandler.bind(this);
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
        axios.get(url.url+'enroll/status', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_course: response.data
                });

            });
        axios.get(url.url+'assignment/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    assign: response.data
                });

            });

        axios.get(url.url+'announcement/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    announcement: response.data
                });

            });

        axios.get(url.url+'quiz/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    quiz: response.data
                });

            });

        axios.get(url.url+'lecture/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    lecture: response.data
                });

            });

        axios.get(url.url+'permission/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    permission_number: response.data
                });

            });


    }

    submitButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            email: course.student,
            course_id: course.course_id,



        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put(url.url+'enroll', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({

                        status_drop: response.data.message,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);

                }



            });
    }

    numberChangeHandler = (e) => {
        this.setState({
            number: e.target.value
        })
    }
    permissionButton = () => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            number: this.state.number,
            course_id: localStorage.course,


        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(url.url+'permission', data)
            .then(response => {
                alert("Codes are Generated successfully");



            });
    }



    ProgressButton = (course) => {

        localStorage.setItem('student', course.student);

        //set the with credentials to true

        this.setState({
            authFlag: true,
            
            url: 1,
        })

    }

    ProgressButtonQuiz = (course) => {
        localStorage.setItem('student', course.student);

        //set the with credentials to true

        this.setState({
            authFlag: true,
            
            url: 2,
        })


    }

    onFormSubmit(e, assign) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('id', assign._id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url.url+"assignment/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.setState({ file_status: response.data.message });
            }).catch((error) => {
            });
    }

    onSubmitLecture(e, lecture) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('id', lecture._id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url.url+"lecture/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.setState({ file_status: response.data.message });
            }).catch((error) => {
            });
    }

    onChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }



    render() {



        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }


        if (this.state.url == 1) {
            redirectVar = <Redirect to="/grade" />


        }
        if (this.state.url == 2) {
            redirectVar = <Redirect to="/quizgrade" />


        }

        return (
            <div class="container">
                {redirectVar}
                <br />
                <h3>Dashboard for Course {localStorage.course}</h3>
                <p>Welcome, {localStorage.name}</p>

                <div class="body-div">


                    <ul class="nav nav-tabs">
                        <li class="nav-item active"><a data-toggle="tab" href="#home" class="nav-link">Lecture Files</a></li>
                        <li class="nav-item"><a data-toggle="tab" href="#menu1" class="nav-link">Announcements</a></li>
                        <li class="nav-item"><a data-toggle="tab" href="#menu2" class="nav-link">Assignment List</a></li>
                        <li class="nav-item"><a data-toggle="tab" href="#menu3" class="nav-link">Quiz List</a></li>
                        <li class="nav-item"><a data-toggle="tab" href="#menu4" class="nav-link">Enrolled Students</a></li>
                        <li class="nav-item"><a data-toggle="tab" href="#menu5" class="nav-link">Permission Number</a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="home" class="tab-pane fade in active">
                            <h3>Lecture Files</h3>
                            <h2><Link to="/createlecture"><button class="btn btn-primary">+ Upload Lecture File</button></Link></h2>
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th>Content</th>
                                        <th>URL</th>
                                        <th>Uploaded Docs</th>



                                    </tr>
                                </thead>
                                {
                                    this.state.lecture.map(lect => {
                                        var ref = "#";
                                        ref = ref + lect._id;
                                        var path = url.path+"uploads/";

                                        path = path + lect.url;
                                        return (
                                            <tbody>
                                                <tr>


                                                    <td>{lect.content}</td>
                                                    <td>
                                                        <div id={lect._id} class="modalDialog">
                                                            <div>

                                                                <a href="#close" title="Close" class="close">X</a>
                                                                <embed src={path} height="800" width="800"></embed>



                                                            </div>
                                                        </div>
                                                        <a href={ref}>Open Document</a>
                                                    </td>
                                                    <td>
                                                        <form onSubmit={(e) => this.onSubmitLecture(e, lect)}>

                                                            <input type="file" name="myImage" onChange={this.onChange} />

                                                            <button type="submit" class="btn btn-primary">Upload</button>

                                                        </form>

                                                    </td>


                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>
                        <div id="menu1" class="tab-pane fade">
                            <h3>Announcements</h3>

                            <h2><Link to="/announcement"><button class="btn btn-primary">+ Create Announcements</button></Link></h2>
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
                        <div id="menu2" class="tab-pane fade">
                            <br />
                            <h4>Assignment List</h4>
                            <h2><Link to="/createassign"><button class="btn btn-primary">+ Create Assignments</button></Link></h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Assignment Id</th>
                                        <th>Due Date</th>
                                        <th>Content</th>
                                        <th>Uploaded Docs</th>


                                        <th></th>
                                    </tr>
                                </thead>
                                {


                                    this.state.assign.map(assig => {
                                        var ref = "#";
                                        ref = ref + assig._id;
                                        var path = url.path+"uploads/";

                                        path = path + assig.url;
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td>{assig._id}</td>
                                                    <td>{assig.due}</td>
                                                    <td>{assig.content}</td>
                                                    <td>
                                                        <div id={assig._id} class="modalDialog">
                                                            <div>

                                                                <a href="#close" title="Close" class="close">X</a>
                                                                <embed src={path} height="800" width="800"></embed>



                                                            </div>
                                                        </div>
                                                        <a href={ref}>Open Document</a>
                                                    </td>
                                                    <td>
                                                        <form onSubmit={(e) => this.onFormSubmit(e, assig)}>

                                                            <input type="file" name="myImage" onChange={this.onChange} />

                                                            <button type="submit" class="btn btn-primary">Upload</button>

                                                        </form>
                                                        <p>{this.state.file_status}</p>
                                                    </td>


                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>
                        <div id="menu3" class="tab-pane fade">
                            <br />
                            <h4>Quiz List</h4>
                            <h2><Link to="/quiz"><button class="btn btn-primary">+ Create Quiz</button></Link></h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Quiz Id</th>
                                        <th>Due Date</th>
                                        <th>Content</th>


                                        <th></th>
                                    </tr>
                                </thead>
                                {
                                    this.state.quiz.map(qui => {


                                        return (
                                            <tbody>
                                                <tr>
                                                    <td>{qui._id}</td>
                                                    <td>{qui.due}</td>
                                                    <td>{qui.content}</td>



                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>
                        <div id="menu4" class="tab-pane fade">
                            <br />
                            <h4>Enrolled Students</h4>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student's Email</th>
                                        <th></th>
                                        <th></th>
                                        <th>Status</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*Display the Tbale row based on data recieved*/}
                                    {
                                        this.state.student_course.map(course => {
                                            var stat = "";

                                            return (

                                                <tr>
                                                    <td>{course.student}</td>
                                                    <td>
                                                        <button onClick={() => this.ProgressButton(course)} class="btn btn-primary">Check Assignments</button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => this.ProgressButtonQuiz(course)} class="btn btn-primary">Check Quiz</button>
                                                    </td>
                                                    <td>{course.status}</td>

                                                    <td>
                                                        <button onClick={() => this.submitButton(course)} class="btn btn-primary">Drop Student</button>

                                                    </td>


                                                </tr>


                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {this.state.status_drop}
                        </div>
                        <div id="menu5" class="tab-pane fade">
                            <h3>Permission Number</h3>

                            <input onChange={this.numberChangeHandler} type="text" class="form-control" placeholder="How Many Permission Numbers are required?" /><br />
                            <button onClick={() => this.permissionButton()} class="btn btn-primary">+Create Permission Number</button>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Permission Number</th>
                                        <th>Used</th>



                                    </tr>
                                </thead>
                                {
                                    this.state.permission_number.map(permission => {
                                        var color = "";
                                        if (permission.used == 'yes') {
                                            color = 'red';
                                        }
                                        else {
                                            color = 'green';
                                        }


                                        return (
                                            <tbody>
                                                <tr bgcolor={color}>
                                                    <td>{permission.permission_id}</td>
                                                    <td>{permission.used}</td>




                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>
                    </div>


                </div>
            </div>
        )



    }
}



//export Home Component
export default TeacherDashboard;
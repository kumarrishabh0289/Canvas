import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


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
        axios.get('http://localhost:3001/teacherassignmentview')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    assign: response.data
                });

            });

        axios.get('http://localhost:3001/announcementview')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    announcement: response.data
                });

            });

        axios.get('http://localhost:3001/quizview')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    quiz: response.data
                });

            });

        axios.get('http://localhost:3001/lectureview')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    lecture: response.data
                });

            });

        axios.get('http://localhost:3001/numberview')
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


        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/dropstudent', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({

                        status_drop: response.data,
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
            number: this.state.number


        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/createnumber', data)
            .then(response => {
                console.log("Status Code : ", response.status);



            });
    }



    ProgressButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            student: course.student,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/setstudent', data)
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

    ProgressButtonQuiz = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            student: course.student,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/setstudent', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        status: response.data,
                        url: 2,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);

                }



            });

    }

    onFormSubmit(e, assign) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('id', assign.id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/pdfupload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.setState({ file_status: this.state.file_status.concat(response.data) });
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
            <div>
                {redirectVar}

                <h2>{this.state.user}'s Dashboard for Course {this.state.course}</h2>






                <div class="container">


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
                                                    <td>{announce.id}</td>
                                                    <td>{announce.content}</td>



                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>
                        <div id="menu2" class="tab-pane fade">
                            <h3>Assignment List</h3>
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
                                        ref = ref + assig.id;
                                        var path = "http://localhost:3000/uploads/";
                                        if(assig.url){
                                            path = path + assig.url;

                                        }
                                        else path = path + "nodocs.png";
                                        
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td>{assig.id}</td>
                                                    <td>{assig.due}</td>
                                                    <td>{assig.content}</td>
                                                    <td>
                                                    <div id={assig.id} class="modalDialog">
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
                            <h3>Quiz List</h3>
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
                                                    <td>{qui.id}</td>
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
                            <h3>Enrolled Students</h3>
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
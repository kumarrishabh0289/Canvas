import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Document, Page } from "react-pdf";

class Grade extends Component {
    constructor() {
        super();
        this.state = {
            student: "",
            course: "",
            user: "",
            email: "",
            role: "",
            books: [],
            student_assign: [],
            student_quiz: [],
            url: "",
            numPages: null,
            pageNumber: 1,
            imagepath: '/uploads/',
            grade: 1,

        }
        this.gradeChangeHandler = this.gradeChangeHandler.bind(this);


    }

    gradeChangeHandler = (e) => {
        this.setState({
            grade: e.target.value
        })
    }


    //get the books data from backend  
    componentWillMount() {
    }

    componentDidMount() {

        const params = {

            student: localStorage.student,
            course_id: localStorage.course

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
    }


    giveGrade = (assign) => {
        var headers = new Headers();


        const data = {

            grade: this.state.grade,
            assignment_id: assign.assignment_id,
            student: localStorage.student
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.patch('http://localhost:3001/submission', data)
            .then(response => {
                alert("successfully graded");
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
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

    openAssignment(event, assname) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(assname).style.display = "block";
        event.currentTarget.className += " active";

    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));


    render() {
        const { pageNumber, numPages } = this.state;

        //iterate over student_course to create a table row

        //if not logged in go to login page


        return (
            <div class="container">
                <br />
                <h4>{localStorage.course}: Assignments Check </h4>
                <p>Viewing Assignment of student: {localStorage.student} </p><br />
                <h2><Link to="/teacherdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>



                <div class="tab">
                    {
                        this.state.student_assign.map(assign => {
                            return (
                                <button class="tablinks" onClick={(event) => this.openAssignment(event, assign._id)} ><font color='green'>[{assign.status}] Ref# {assign.assignment_id}</font></button>

                            )
                        })
                    }
                </div>

                <div>
                    {

                        this.state.student_assign.map(assign => {
                            var path = window.location.origin + this.state.imagepath.concat(assign.url);
                            return (
                                <div id={assign._id} class="tabcontent">
                                    <h3>{assign.course_id}</h3>
                                    <p>Submission Status: {assign.status}</p>
                                    <p>Total Marks: {assign.marks}</p>
                                    <p>Given Grade: {assign.grade}</p>
                                    <p>Total Grade:<input onChange={this.gradeChangeHandler} type="text" class="form-control" /></p>
                                    <p><button onClick={() => this.giveGrade(assign)} class="btn btn-primary">Give Grade</button></p>





                                    <div>
                                        <nav>
                                            <button onClick={this.goToPrevPage}>Prev</button>
                                            <button onClick={this.goToNextPage}>Next</button>
                                        </nav>

                                        <div style={{ width: 600 }}>
                                            <Document
                                                file={path}
                                                onLoadSuccess={this.onDocumentLoadSuccess} >
                                                <Page pageNumber={pageNumber} width={600} />
                                            </Document>
                                        </div>

                                        <p>
                                            Page {pageNumber} of {numPages}
                                        </p>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>





        )



    }
}
//export Home Component
export default Grade;
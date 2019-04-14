import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Document, Page } from "react-pdf";
import url from '../Url/Url';

class StudentAssignment extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            books: [],
            student_assign: [],
            url: "",
            numPages: null,
            pageNumber: 1,
            imagepath: '/uploads/',
            file: null,
            file_status: [],

        }
        this.onChange = this.onChange.bind(this);
    }
    //get the books data from backend  
    componentWillMount() {

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
        axios.get(url.url+'assignment/course', options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    student_assign: response.data,

                });


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

    onFormSubmit(e, assign) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('assignment_id', assign._id);
        formData.append('course_id', localStorage.course);
        formData.append('student', localStorage.email);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url.url+"submission/upload", formData, config)
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
        const { pageNumber, numPages } = this.state;

        //iterate over student_course to create a table row

        //if not logged in go to login page


        return (
            <div class="container">
                <div>
                    <br/>
                    <h4>{localStorage.course}: List of all Assignmnets of {localStorage.name}</h4>
                    <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2><br/>

                    <div class="tab">
                        {
                            this.state.student_assign.map(assign => {
                                return (
                                    <button class="tablinks" onClick={(event) => this.openAssignment(event, assign._id)} >{assign.due}</button>

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
                                    <br/>
                                        
                                        <p class="ridge">
                                            <h3>Assignment's Due date:{assign.due}</h3>
                                            <p>Ref Id: {assign._id}</p>
                                            <form onSubmit={(e) => this.onFormSubmit(e, assign)}>

                                                <input type="file" name="myImage" onChange={this.onChange} />

                                                <button type="submit" class="btn btn-primary">Submit Assignment</button>

                                            </form>
                                            <br/>
                                        </p>
                                        
                                        <p>{this.state.file_status} </p>
                                        <p>{assign.content}</p>



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
            </div>

        )

    }
}
//export Home Component
export default StudentAssignment;
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

var role;
class Courses extends Component {
    constructor() {
        super();
        this.state = {

            name: "",
            role: "",
            email: "",
            courses: [],
            authFlag: false,
            status: "",
            permission: "",


        }
        this.permissionChangeHandler = this.permissionChangeHandler.bind(this);
    }

    permissionChangeHandler = (e) => {
        this.setState({
            permission: e.target.value
        })
    }
    //get the books data from backend  
    componentWillMount() {
 

    }

    componentDidMount() {
        axios.get('http://localhost:3001/course')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    courses: this.state.courses.concat(response.data)
                });
            });
    }
    submitButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh

        const data = {
            course_id: course.course_id,
            permission: this.state.permission,
            student: localStorage.user,

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/enroll', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 201) {
                    this.setState({
                        authFlag: true,
                        status: response.data.message,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);

                }



            });
    }

    idSearch(e) {

        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    nameSearch(e) {

        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput1");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    greatSearch(e) {

        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput2");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    render() {

        let details = this.state.courses.map(course => {
            return (

                <tr>
                    <td>{course.course_id}</td>
                    <td>{course.name}</td>
                    <td>{course.department}</td>
                    <td>{course.ta_email}</td>
                    <td>{course.faculty_email}</td>
                    <td>{course.room}</td>
                    <td>{course.capacity}</td>
                    <td>{course.total_enroll}</td>
                    <td>{course.waiting}</td>
                    <td>{course.current_wait}</td>
                    <td>{course.term}</td>
                    <td><input onChange={this.permissionChangeHandler} type="text" class="form-control" name="permission" placeholder="Permission #" /></td>
                    <td>
                        <button onClick={() => this.submitButton(course)} class="btn btn-primary">Enroll</button>
                    </td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;

        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        if (localStorage.role == 'student') {

            return (
                <div>
                    <br/>
                    {redirectVar}
                    <div class="container">
                        <h2>List of All Available Courses To Enroll</h2>
                        <table class="table">
                            <tr>
                                <th><input type="text" class="form-control" id="myInput" onKeyUp={this.idSearch.bind(this)} placeholder="Search Course By ID" title="Type in a Course Id"></input></th>
                                <th><select class="form-control" id="myInput2" onChange={this.greatSearch.bind(this)} placeholder="Search Course By ID" >
                                    <option value="">In range Of</option>
                                    <option value='1'>100-199</option>
                                    <option value='2'>200-299</option>
                                    <option value='3'>300-399</option>
                                </select></th>
                                <th><input type="text" class="form-control" id="myInput1" onKeyUp={this.nameSearch.bind(this)} placeholder="Search Course By Name" title="Type in a Course Name"></input></th>

                            </tr>
                        </table>


                        <table class="table" id="myTable">
                            <thead>

                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Department</th>
                                    <th>TA's Email</th>
                                    <th>Faculty Email</th>
                                    <th>Room No.</th>
                                    <th>Total Capacity</th>
                                    <th>Total Enrolled</th>
                                    <th>Permited Waiting</th>
                                    <th>Current Waiting</th>
                                    <th>Term</th>
                                    <th>Permission #</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                        <p>{this.state.status}</p>
                    </div>


                </div>
            )
        }
        else {
            return (
                <h3>You are not authorized to view this page.</h3>
            )
        }
    }



}
//export Home Component
export default Courses;
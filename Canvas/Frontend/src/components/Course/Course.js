import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

var role;
class Courses extends Component {
    constructor(){
        super();
        this.state = {  
            books : [],
            name :"",
            role : "",
            email : "",
            courses : [],
            url:"",

        }
    }  

    ProgressButton = (course) => {
        var headers = new Headers();
        //prevent page from refresh
        
        const data = {
           course_id : course.course_id,
        }
        
        axios.defaults.withCredentials = true;
      
        axios.post('http://localhost:3001/setcourse',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        status:response.data,
                        url:1,
                    })
                }
                else{
                    console.log("Status Code : ",response.status);
                    
                }
                    

               
            });
    }
     
    componentWillMount(){
        axios.get('http://localhost:3001/session')
                .then((response) => {
                //update the state with the response data
                
                this.setState({
                    name : response.data.name,
                    email: response.data.email,
                    role: response.data.role
                });
               

            });
           
    }

    componentDidMount(){
        axios.get('http://localhost:3001/courses')
        .then((response) => {
        //update the state with the response data
        this.setState({
            courses : this.state.courses.concat(response.data) 
        });
        });
    }


    render(){
        //iterate over books to create a table row
        let details = this.state.courses.map(course => {
            return(
                <tr>
                    <td>{course.course_id}</td>
                    <td>
                    <button onClick={() => this.ProgressButton(course)} class="btn btn-primary">Goto Course</button>               
                    </td>
                    <td>{course.name}</td>
                    <td>{course.department}</td>
                    <td>{course.ta_email}</td>
                    <td>{course.faculty_email}</td>
                    <td>{course.room}</td>
                    <td>{course.capacity}</td>
                    <td>{course.waiting}</td>
                    <td>{course.term}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        var cretebutton = <Redirect to= "/create"/>
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.url==1){
            redirectVar = <Redirect to= "/teacherdashboard"/>
            
            
        }
        if(this.state.role == 'teacher'){
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Courses</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th></th>
                                    <th>Course Name</th>
                                    <th>Department</th>
                                    <th>TA's Email</th>
                                    <th>Faculty Email</th>
                                    <th>Room No.</th>
                                    <th>Total Capacity</th>
                                    <th>Permited Waiting</th>
                                    <th>Term</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
                 
            <Link to="/createcourse"><button class="btn btn-success">Create new course</button></Link>
            </div> 
        )
        }
        else{
            return(
                <h3>You are not authorized to view this page.</h3>
            )
        }
    }
}
//export Home Component
export default Courses;
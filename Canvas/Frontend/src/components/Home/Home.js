import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            user:"",
            email:"",
            role:"",
            books :[],
            student_course:[],
            

        }
    }  
    //get the books data from backend  
    componentWillMount(){
       
    }

    componentDidMount(){
        axios.get('http://localhost:3001/liststudentcourses')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    student_course : response.data
                });
                
            });
    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    render(){
        //iterate over student_course to create a table row
        let details = this.state.student_course.map(course => {
            return(

                <tr>
                    <td>{course.course_id}</td>
                    <td>{course.status}</td>
                    
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if( !cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        
        if(localStorage.role == 'teacher'){
            redirectVar = <Redirect to= "/course"/>
          
        return(
            <div>
                {redirectVar}
                <p>Welcome {this.state.user}</p><br />

                <div class="container">
                    <h2>This is a Teacher View</h2>
                        
                </div> 
            </div> 
        )
    }
    if(localStorage.role == 'student'){
        redirectVar = <Redirect to= "/student"/>
        return(
            <div>
                {redirectVar}
                <p>Welcome {this.state.user}</p><br />
               <Link to="/enroll"><button>Enroll For Course</button></Link>
               

                <div class="container">
                <h2>Course Cart</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                       

                </div> 
            </div> 
        )
    }
        else {
            
            return(
                <div class="container">
                <p>Login Again</p>
                

                </div>
               
            )
    }

    }
}
//export Home Component
export default Home;
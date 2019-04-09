import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { Document, Page } from "react-pdf";

class QuizGrade extends Component {
    constructor(){
        super();
        this.state = {  
            student:"",
            course:"",
            user:"",
            email:"",
            role:"",
            books :[],
            student_assign:[],
            student_quiz:[],
            url:"",
            numPages: null, 
            pageNumber: 1,
            imagepath:'/uploads/',
            grade:1,

        }
        this.gradeChangeHandler = this.gradeChangeHandler.bind(this);
        
        
    }
    
    gradeChangeHandler = (e) => {
        this.setState({
            grade : e.target.value
        })
    }


    //get the books data from backend  
    componentWillMount(){
        axios.get('http://localhost:3001/session')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    user : response.data.user,
                    email: response.data.email,
                    role: response.data.role,
                    student:response.data.student,
                    course:response.data.course,
                });
                console.log(this.state.user)
                console.log(this.state.email)
                console.log(this.state.role)
            });
    }

    componentDidMount(){
        axios.get('http://localhost:3001/teacherquizgrade')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    student_quiz : response.data,
                    
                });
                
                
            });
    }


    giveGrade = (quiz) => {
        var headers = new Headers();
        
        
        const data = {
            
            grade:this.state.grade,
            quiz_id: quiz.quiz_id,
           
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put('http://localhost:3001/quizgradeupdate',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        status:response.data,
                    })
                }
                else{
                    console.log("Status Code : ",response.status);
                    this.setState({
                        
                        status:response.data
                    })
                }
                    

               
            });
    }

    openAssignment(event,assname) {
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

     
    

    render(){
        
         
        //iterate over student_course to create a table row
    
        //if not logged in go to login page
        

        return(
            <div>
               <h2>{this.state.course}: Quizzes</h2>
                <h3>Viewing Quizzes of: {this.state.student}</h3><br />
                <h2><Link to="/teacherdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
               
                
                

                <div class="tab">
                    {
                        this.state.student_quiz.map(quiz => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,quiz.quiz_id)} ><font color='green'>[{quiz.status}] Quiz ID#{quiz.quiz_id}</font></button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.student_quiz.map(quiz => {
                            
                            return(
                            <div id={quiz.quiz_id} class="tabcontent">
                            <h3>{quiz.course_id}Quiz Id:{quiz.quiz_id}</h3>
                            <p>{quiz.answer}</p>
                            <p>Submission Status: {quiz.status}</p>
                            <p>Total Marks: {quiz.marks}</p>
                            <p>Given Grade: {quiz.grade}</p>
                            <p>Total Grade:<input onChange = {this.gradeChangeHandler} type="text" class="form-control"  /></p>
                            <p><button onClick={() => this.giveGrade(quiz)} class="btn btn-primary">Give Grade</button></p>
                            

                            


  <div>
   

    
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
export default QuizGrade;
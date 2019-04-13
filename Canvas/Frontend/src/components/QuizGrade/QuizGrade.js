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
       
    }

    componentDidMount(){
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
        axios.get('http://localhost:3001/submission/quiz', options)
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
            
            grade: this.state.grade,
            quiz_id: quiz.quiz_id,
            student: localStorage.student
           
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.patch('http://localhost:3001/submission/quizgrade', data)
            .then(response => {
                alert("successfully graded");
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
            <div class="container">
            <br/>
               <h4>{localStorage.course}: Quiz Check </h4>
                <p>Viewing Assignment of student: {localStorage.student} </p><br />
                <h2><Link to="/teacherdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
               
                
                

                <div class="tab">
                    {
                        this.state.student_quiz.map(quiz => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,quiz._id)} ><font color='green'>[{quiz.status}] Quiz </font></button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.student_quiz.map(quiz => {
                            
                            return(
                            <div id={quiz._id} class="tabcontent">
                            <p>{quiz.course_id}</p>
                            <p>reference Id:{quiz.quiz_id}</p>
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
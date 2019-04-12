import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { Document, Page } from "react-pdf";

class StudentQuiz extends Component {
    constructor(){
        super();
        this.state = {  
            user:"",
            email:"",
            role:"",
            books :[],
            quiz:[],
            url:"",
            answer:"",
       

        }
        
        this.answerChangeHandler = this.answerChangeHandler.bind(this);
    }  
    //get the books data from backend  
    componentWillMount(){
    
    }

    componentDidMount(){
        const params = {

            course: localStorage.course,
           
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,

            },
        };
        axios.get('http://localhost:3001/quiz/course', options)
        .then((response) => {
        //update the state with the response data
        this.setState({
            quiz : response.data
        });
        
    });
    }

    answerChangeHandler = (e) => {
        this.setState({
            answer : e.target.value
        })
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


        

      ProgressButton = (quiz) => {
        
        //prevent page from refresh
        
        const data = {
           quiz_id : quiz._id,
           answer: this.state.answer,
           course_id:localStorage.course,
           student:localStorage.email,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/submission',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 201){
                    alert("Submission Sucessfull");
                    this.setState({
                        authFlag : true,
                        status:response.data,
                        
                    })
                }
                else{
                    console.log("Status Code : ",response.status);
                    
                }
                    

               
            });

        }


    

    render(){
   

        return(
            <div class="container">
               <br/>
                <h4>{localStorage.course}: List of all Quizes of {localStorage.name}</h4>
                <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
            
                <div class="tab">
                    {
                        this.state.quiz.map(qui => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,qui._id)} >{qui.due}</button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.quiz.map(qui => {
                            
                            return(
                            <div id={qui._id} class="tabcontent">
                            <p>Due date: {qui.due}</p>
                            <p>refn id:{qui._id}</p>
                         
                            
                            <p>{qui.content}</p>
                            <p class='ridge'>
                            <textarea onChange = {this.answerChangeHandler} type="textarea" rows="6" cols="50" class="form-control"  placeholder="Answer Your Quiz"/>
                            <button onClick={() => this.ProgressButton(qui)} class="btn btn-primary">Submit Quiz</button>  
                            </p>


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
export default StudentQuiz;
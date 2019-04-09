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
        axios.get('http://localhost:3001/session')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    user : response.data.user,
                    email: response.data.email,
                    role: response.data.role,
                    course: response.data.course,
                });
                console.log(this.state.user)
                console.log(this.state.email)
                console.log(this.state.role)
            });
    }

    componentDidMount(){
        axios.get('http://localhost:3001/quizview')
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
        var headers = new Headers();
        //prevent page from refresh
        
        const data = {
           id : quiz.id,
           answer: this.state.answer,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/submitquiz',data)
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
                    
                }
                    

               
            });

        }


    

    render(){
   

        return(
            <div>
               
                <h3>{this.state.course}: List of all Quizes of {this.state.user}</h3>
                <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
            
                <div class="tab">
                    {
                        this.state.quiz.map(qui => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,qui.id)} >Quiz ID#{qui.id}</button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.quiz.map(qui => {
                            
                            return(
                            <div id={qui.id} class="tabcontent">
                            <h3>Due date: {qui.due}</h3>
                            <h3>{qui.course_id}Quiz Id:{qui.id}</h3>
                         
                            
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
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { Document, Page } from "react-pdf";

class SubmissionView extends Component {
    constructor(){
        super();
        this.state = {  
            user:"",
            email:"",
            role:"",
    
            quiz:[],
     

        }
        
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
        axios.get('http://localhost:3001/studentquizview')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    quiz : response.data,
                    
                });
                
                
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
        const { pageNumber, numPages } = this.state;
         
        //iterate over student_course to create a table row
    
        //if not logged in go to login page
        

        return(
            <div>
               
               <h3>{this.state.course}: Submitted Quiz of {this.state.user}</h3>
                <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
               
            
                
                

                <div class="tab">
                    {
                        this.state.quiz.map(qui => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,qui.quiz_id)} >[{qui.status}] Quiz ID#{qui.quiz_id}</button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.quiz.map(qui => {
                            
                            return(
                            <div id={qui.quiz_id} class="tabcontent">
                            <h3>{qui.course_id}Quiz Id:{qui.quiz_id}</h3>
                            <p>Status of your Quiz: {qui.status} || ({qui.grade} out of {qui.marks})</p>
                            <p>Answer<br /> {qui.answer} </p>
                            


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
export default SubmissionView;
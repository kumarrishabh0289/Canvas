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

    }

    componentDidMount(){
        const params = {

            student: localStorage.email,
      
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
            <div class="container"><br/>
               
               <h5>{localStorage.course}: Submitted Quiz of {localStorage.name}</h5>
                <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
               
            
                
                

                <div class="tab">
                    {
                        this.state.quiz.map(qui => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,qui._id)} >[{qui.status}] Quiz</button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                       this.state.quiz.map(qui => {
                            
                            return(
                            <div id={qui._id} class="tabcontent">
                            <p>{qui.course_id}</p>
                            <p>Refn ID: {qui._id}</p>
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
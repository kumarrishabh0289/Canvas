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
            books :[],
            student_assign:[],
            student_quiz:[],
            url:"",
            numPages: null, 
            pageNumber: 1,
            imagepath:'/uploads/',

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
        axios.get('http://localhost:3001/studentassignmentview')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    student_assign : response.data,
                    
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

      onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      };
    
      goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
      goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    

    render(){
        const { pageNumber, numPages } = this.state;
         
        //iterate over student_course to create a table row
    
        //if not logged in go to login page
        

        return(
            <div>
               
               <h3>{this.state.course}: Submitted Assignmnets of {this.state.user}</h3>
                <h2><Link to="/studentdashboard"><button class="btn btn-primary"> Dashboard </button></Link></h2>
               
            
                
                

                <div class="tab">
                    {
                        this.state.student_assign.map(assign => {
                            return(
                            <button class="tablinks"   onClick={(event)=>this.openAssignment(event,assign.assignment_id)} >[{assign.status}] Assignment ID#{assign.assignment_id}</button>
  
                            )
                        })
                    }
                </div>

                <div>
                    {
                       
                        this.state.student_assign.map(assign => {
                            var path = window.location.origin    + this.state.imagepath.concat(assign.url) ;
                            return(
                            <div id={assign.assignment_id} class="tabcontent">
                            <h3>{assign.course_id}Assignment Id:{assign.assignment_id}</h3>
                            <p>Status of your Assignment: {assign.status} || ({assign.grade} out of {assign.marks})</p>
                            


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




             
        )

 

    }
}
//export Home Component
export default SubmissionView;
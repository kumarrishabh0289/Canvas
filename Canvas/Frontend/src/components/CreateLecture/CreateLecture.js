import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class CreateLecture extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
            content:"",
            authFlag : false,
            date:"",
           
            status:[],
            imagepath:'/uploads/',
            file: null,
            file_status:[],
        }
        //Bind the handlers to this class
        
      
        this.onChange = this.onChange.bind(this);
    }
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
  
  
 

    

        
      onFormSubmit(e){
            e.preventDefault();
          const formData = new FormData();
          formData.append('myImage',this.state.file);
         
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
          axios.post("http://localhost:3001/createlecture",formData,config)
              .then((response) => {
                  alert("The file is successfully uploaded");
                  this.setState({file_status:this.state.file_status.concat(response.data),authFlag : true });
              }).catch((error) => {
          });
      }


      onChange(e) {
          this.setState({
              file:e.target.files[0],
          });
      }

    render()
    {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag){
            redirectVar = <Redirect to= "/teacherdashboard"/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                <h1>Upload Lecture File.</h1>
                        <div style={{width: '30%'}} class="form-group">
                        <form onSubmit={(e) => this.onFormSubmit(e)}>  
                        
                                 <input type="file" name="myImage" onChange= {this.onChange} />
                        
                                <button type="submit" class="btn btn-primary">Submit Lecture File</button>
                 
                                </form>
                       </div>
                        
                      
                </div> 
            </div>
        )
    }
}

export default CreateLecture;
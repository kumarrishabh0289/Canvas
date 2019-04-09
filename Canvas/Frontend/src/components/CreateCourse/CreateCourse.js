import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class CreateCourse extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : "",
            name : "",
            department : "",
            ta :"",
            room :"",
            capacity : "",
            waiting : "",
            term : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
        this.taChangeHandler = this.taChangeHandler.bind(this);
        this.roomChangeHandler = this.roomChangeHandler.bind(this);
        this.capacityChangeHandler = this.capacityChangeHandler.bind(this);
        this.waitingChangeHandler = this.waitingChangeHandler.bind(this);
        this.termChangeHandler = this.termChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    departmentChangeHandler = (e) => {
        this.setState({
            department : e.target.value
        })
    }
    taChangeHandler = (e) => {
        this.setState({
            ta : e.target.value
        })
    }
    roomChangeHandler = (e) => {
        this.setState({
            room : e.target.value
        })
    }
    capacityChangeHandler = (e) => {
        this.setState({
            capacity : e.target.value
        })
    }
    waitingChangeHandler = (e) => {
        this.setState({
            waiting : e.target.value
        })
    }
    termChangeHandler = (e) => {
        this.setState({
            term : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitCreate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            id : this.state.id,
            department : this.state.department,
            ta : this.state.ta,
            room : this.state.room,
            capacity : this.state.capacity,
            waiting : this.state.waiting,
            term : this.state.term
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put('http://localhost:3001/createcourse',data)
            .then(response => {
                console.log("Status Code : ",response.status); 
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });        
    }
    render()
    {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag){
            redirectVar = <Redirect to= "/course"/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Course Name"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.idChangeHandler} type="text" class="form-control" name="id" placeholder="Course ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.departmentChangeHandler} type="text" class="form-control" name="dept" placeholder="Department"/>
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.taChangeHandler} type="text" class="form-control" name="dest" placeholder="TA Email ID"/>
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.roomChangeHandler} type="text" class="form-control" name="room" placeholder="Room"/>
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.capacityChangeHandler} type="number" class="form-control" name="capacity" placeholder="Total Capacity"/>
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.waitingChangeHandler} type="number" class="form-control" name="waiting" placeholder="Total Waiting"/>
                        </div>
                        <div style={{width: '30%'}} class="form-group">
                            <input  onChange = {this.termChangeHandler} type="text" class="form-control" name="term" placeholder="Term"/>
                        </div>
                        <br/>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate} class="btn btn-success">Create new Course</button>
                        </div> 
                </div> 
            </div>
        )
    }
}

export default CreateCourse;
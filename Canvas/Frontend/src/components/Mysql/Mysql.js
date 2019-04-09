import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Mysql extends Component {
    constructor(){
        super();
        this.state = {  
            books : [],
            bookid: "",
            title : "",
            author: "",
            authFlag : false,
            status:"",
            
        }
         //Bind the handlers to this class
        this.bookidChangeHandler = this.bookidChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
        this.createButton = this.createButton.bind(this);
    }  
   
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/mysqlbook')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });
    }
    bookidChangeHandler = (e) => {
        this.setState({
            bookid : e.target.value
        })
    }
    titleChangeHandler = (e) => {
        this.setState({
            title : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    authorChangeHandler = (e) => {
        this.setState({
            author : e.target.value
        })
    }

    createButton = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            bookid : this.state.bookid,
            title : this.state.title,
            author : this.state.author,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put('http://localhost:3001/mysqlinsert',data)
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



    submitButton = (book) => {
        var headers = new Headers();
        //prevent page from refresh
        
        const data = {
           bookid : book.BookId,
        
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.delete('http://localhost:3001/mysqldelete',{data})
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
        //iterate over books to create a table row

        return(
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    
                                    <th>Author</th>
                                    <th>Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                        <tbody>
                        {this.state.books.map( book => {
                            return (
                                <tr>
                                    
                                    
                                    <td>{book.BookId}</td>
                                    <td>{book.Author}</td>
                                    <td>{book.Title}</td>
                                    <td>
                                    
                                    <button onClick={() => this.submitButton(book)} class="btn btn-primary">Delete</button>
                                    
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        
                           <td> <div class="form-group">
                                <input onChange = {this.bookidChangeHandler} type="text" class="form-control" name="bookid" placeholder="Book ID"/>
                            </div></td>
                            <td><div class="form-group">
                                <input onChange = {this.authorChangeHandler} type="text" class="form-control" name="author" placeholder="Author Name"/>
                            </div></td>
                             <td><div class="form-group">
                                <input onChange = {this.titleChangeHandler} type="text" class="form-control" name="title" placeholder="Book Title"/>
                            </div></td>
                            
                           
                            <td><button onClick = {this.createButton} class="btn btn-primary">Create Book</button>  </td>
                            <br/>
                            <font color='red'><b><p>{this.state.status}</p></b></font>
                                          
                           
                        </tr>
                        </tbody>
                        </table>
                </div> 
            )






        /*
        let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookId}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                    <td><button class="btn btn-success"   onClick = {this.submitButton} type="submit">Delete</button></td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                   <form >

                                   </form>
                                
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    */
    }
}
//export Home Component
export default Mysql;
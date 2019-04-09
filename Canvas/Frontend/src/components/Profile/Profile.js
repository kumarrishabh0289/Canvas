import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            file_status: "",
            profile: [],
            authFlag: false,
            status: "",
            imagepath: '/uploads/',
            email: "",
            mobile: "",
            about: "",
            city: "",
            country: "",
            company: "",

            school: "",
            hometown: "",
            languages: "",
            gender: "",


        }
        //Bind the handlers to this class

        this.mobileChangeHandler = this.mobileChangeHandler.bind(this);
        this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    //get the books data from backend  
    componentDidMount() {
        var headers = new Headers();
        const params = {
            secret_token : localStorage.jwt,
            email: localStorage.email,
          };
        const options = {
            params,
            headers: {
              
              
            },
           };
        axios.get('http://localhost:3001/secretprofile',options)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    profile: this.state.profile.concat(response.data),

                });




                this.state.profile.map(item => {
                    this.setState({
                        imagepath: this.state.imagepath.concat(item.image),
                        email: item.email,
                        mobile: item.mobile,
                        about: item.about,
                        city: item.city,
                        country: item.country,
                        company: item.company,

                        school: item.school,
                        hometown: item.hometown,
                        languages: item.languages,
                        gender: item.gender,
                    });

                });




            });
    }



    mobileChangeHandler = (e) => {
        this.setState({
            mobile: e.target.value
        })
    }

    aboutChangeHandler = (e) => {
        this.setState({
            about: e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    countryChangeHandler = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    companyChangeHandler = (e) => {
        this.setState({
            company: e.target.value
        })
    }

    schoolChangeHandler = (e) => {
        this.setState({
            school: e.target.value
        })
    }

    hometownChangeHandler = (e) => {
        this.setState({
            hometown: e.target.value
        })
    }

    languagesChangeHandler = (e) => {
        this.setState({
            languages: e.target.value
        })
    }

    genderChangeHandler = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        formData.append('email', localStorage.email );
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/profile/imgupload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.setState({ 
                    file_status: response.data.message
                });
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }


    createButton = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();

        const data = [
            
            {propName:"email" , value:localStorage.email},
            {propName:"mobile" , value:this.state.mobile},
            {propName:"about" , value:this.state.about},
            {propName:"city" , value:this.state.city},
            {propName:"country" , value:this.state.country},
            {propName:"company" , value:this.state.company},
            {propName:"school" , value:this.state.school},
            {propName:"hometown" , value:this.state.hometown},
            {propName:"languages" , value:this.state.languages},
            {propName:"gender" , value:this.state.gender},
        ]

        const data1 = {

            mobile: this.state.mobile,
            about: this.state.about,
            city: this.state.city,
            country: this.state.country,
            company: this.state.company,

            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
            gender: this.state.gender,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.patch('http://localhost:3001/profile', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {

                    this.props.onProfileLoad(data1);

                    this.setState({
                        authFlag: true,
                        status: response.data.message,
                    })
                }
                else {
                    console.log("Status Code : ", response.status);
                    this.setState({

                        status: response.data
                    })
                }



            });
    }




    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        console.log(this.state.imagepath)
        var path = window.location.origin + this.state.imagepath;
        console.log(path);

        return (

            <div class="container">
                <div class="body-div">
                    {redirectVar}


                    <p>Welcome {localStorage.name}</p>

                    <img src={path} height='150' width='150' alt="Profile Pic" class="img-thumbnail" />
                    <h2>User Profile</h2>


                    <div>


                        <form onSubmit={this.onFormSubmit}>
                            <div class="custom-file mb-3">
                                <input type="file" name="myImage" onChange={this.onChange} class="custom-file-input" />
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Upload</button>

                        </form>
                        <p>{this.state.file_status}</p>
                    </div>

                    <table class="table">


                        {this.state.profile.map(item => {
                            return (
                                <tbody>
                                    <tr>

                                        <th>Mobile</th>
                                        <td>{item.mobile}</td>
                                        <td><input onChange={this.mobileChangeHandler} type="text" class="form-control" /></td>
                                    </tr>

                                    <tr>
                                        <th>About</th>
                                        <td>{item.about}</td>
                                        <td><input onChange={this.aboutChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{item.city}</td>
                                        <td><input onChange={this.cityChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>{item.country}</td>
                                        <td><input onChange={this.countryChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>Company</th>
                                        <td>{item.company}</td>
                                        <td><input onChange={this.companyChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>School</th>
                                        <td>{item.school}</td>
                                        <td><input onChange={this.schoolChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>Home Town</th>
                                        <td>{item.hometown}</td>
                                        <td><input onChange={this.hometownChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>Languages</th>
                                        <td>{item.languages}</td>
                                        <td><input onChange={this.languagesChangeHandler} type="text" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td>{item.gender}</td>
                                        <td><input onChange={this.genderChangeHandler} type="text" class="form-control" /></td>


                                    </tr>
                                </tbody>
                            )
                        })}

                        <button onClick={this.createButton} class="btn btn-primary">Update Data</button>
                        <font color='red'><b><p>{this.state.status}</p></b></font>


                    </table>
                </div>
            </div>
        )







    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispachToProps = dispatch => {
    return {
        onProfileLoad: (data) => dispatch({
            type: "PROFILE_LOAD",
            email: data.email,
            mobile: data.mobile,
            about: data.about,
            city: data.city,
            country: data.country,
            company: data.company,

            school: data.school,
            hometown: data.hometown,
            languages: data.languages,
            gender: data.gender,
        }),

    };
};

//export Home Component
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Profile);

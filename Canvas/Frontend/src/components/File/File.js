import React from 'react'
const axios = require("axios");

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            status:[]
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
        axios.post("http://localhost:3001/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.setState({status:this.state.status.concat(response.data) });
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                
                <button type="submit">Upload</button>
            </form>
            <p>{this.state.status}</p>
            </div>
        )
    }
}

export default File
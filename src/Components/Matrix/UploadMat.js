import React from 'react'
import axios from 'axios';
import {HOST_URL} from "../../settings";

class FileUpload extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault()
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    submit(){
        const data = new FormData()
        data.append('File', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = HOST_URL+"/api/users/MatFile/";

        axios.post(url, data, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(HOST_URL+(res.data).File);
                console.log(res);
            })
    }

    render(){
        return(
            <div>
                <br />
                <label className="text-white">Select Mat File :</label>
                <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />

                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent
                 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 my-4" onClick={(e)=>{
                    e.preventDefault()
                    this.submit()
                }}>Save</button>

            </div>
        )
    }
}

export default FileUpload;
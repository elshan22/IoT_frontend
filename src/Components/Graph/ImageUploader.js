import React from 'react'
import axios from 'axios';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {HOST_URL} from "../../settings";
import {imageGallery} from "./FileUpload";

class ImageUploader extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    submit(){
        const data = new FormData()
        data.append('image', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = HOST_URL+"/api/users/Floor/";

        axios.post(url, data, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(HOST_URL+(res.data).image);
                imageGallery.push(HOST_URL+(res.data).image)
            })

    }

    render(){
        return(

            // <div>
            //     <div className="row">
            //         <div className="col-md-6 offset-md-3">
            //             <br /><br />
            //             <br />
            //             <div className="form-row">
            //                 <div className="form-group col-md-6">
            //                     <label className="text-white">Select File :</label>
            //                     <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
            //                 </div>
            //             </div>
            //
            //             <div className="form-row">
            //                 <div className="col-md-6">
            //                     <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div>
                <div >
                    <label className="text-white">Select File :</label>
                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                </div>
                <div >
                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                </div>
            </div>
        )
    }
}

export default ImageUploader;
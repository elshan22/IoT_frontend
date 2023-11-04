
import React, {useState} from 'react';
import ReactFileReader from 'react-file-reader';
import Papa  from 'papaparse';
import FileUpload from "./UploadMat";


function CsvReader(props) {
    const handleFiles = (files) => {
        Array.from(files).forEach(async (file) =>{
            const text = await file.text();
            const result = Papa.parse(text)
            console.log(result)
        })
    }


    function handleClickUpload(event) {
        event.preventDefault();
    }

    return (
            // <ReactFileReader fileTypes={[".csv"]} multipleFiles={false} handleFiles={handleFiles}>
            // </ReactFileReader>
        <FileUpload />
    );
}

export default CsvReader;
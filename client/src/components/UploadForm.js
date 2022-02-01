import React, { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import './UploadForm.css'
import ProgressBar from './ProgressBar'
import CloseButton from "./CloseButton"


// file upload form
function UploadForm() {
    const [files, setFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [percent, setPercent] = useState([])

    const imageSelectHandler = (event) => {
        console.log("image selecte handler 실행");
        const imageFiles = event.target.files

        console.log("imageFiles : ", imageFiles);

        setFiles(imageFiles)

        const fileNames = [...imageFiles];
        console.log(typeof fileNames);
        setFileNames(fileNames);
    };

    // set file data to form Object and axios request to file upload to server
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('submit 함수 실행 check')
        const formData = new FormData()

        // if (files != null) {
        //     console.log("files : ", files);
        //     for (let file of files) {
        //         formData.append("image", file);
                
        //     }
        // } else {
        //     alert("파일을 선택해 주세요");
        //     return;
        // }

        try {

            await Promise.all(
                [...files].map((file, index) => {
                    formData.delete('image');
                    formData.append("image", file);

                    const res = axios.post("/upload", formData, {
                        headers: { 'Content-Type': 'multi/form-data' },
                        onUploadProgress: (e) => {
                            setPercent((prevData) => {
                                const newData = [...prevData];
                                newData[index] = Math.round((100 * e.loaded) / e.total);
                                return newData;
                            })
                        }
                    })
                    console.log({ res })
                })
            )

            await toast.success('success!!')

            setTimeout(() => {
                setPercent([]);
                setFileNames([]);
            }, 2000)

        } catch (err) {
            toast.error('fail!')
            console.log(err)
        }
    }

    const deleteRow = (i) => {
        console.log('delete row 클릭');
    }

    const FileNamesTemplate = fileNames.map((file,i) => {
        console.log("file : ", file);
        return (
            <span className="fileInfoRow">
                <span>1</span>
                <span>{file.name}</span>
                <span>
                    <ProgressBar percent={percent[i]} />
                </span>
                <span>
                    <a onClick = {() => deleteRow(i)}>
                        <CloseButton/>
                    </a>
                </span>
            </span>
        )
    })

    return (
        <div>
        <br />
        <br />
            <div className="fileDropperContainer">

                <form onSubmit={onSubmit}>
                        <div className="file-dropper" >
                            {fileNames.length != 0 ? FileNamesTemplate : <div className="file_upload__message">파일을 선택해 주세요</div>}
                            <input id="image" type="file" onChange={imageSelectHandler} id="file-drozone" onClick="" multiple />
                        </div>
                        <button
                            className="fileUploadButton"
                            type="submit"
                            style={{
                            }}
                        >
                            제출
                        </button>
                </form>
            </div>
        </div>
    );
}

export default UploadForm;

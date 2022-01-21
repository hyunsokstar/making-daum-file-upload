import React, { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import './UploadForm.css'
import ProgressBar from './ProgressBar'
import CloseButton from "./CloseButton"



function UploadForm() {
    // const [file, setFile] = useState(null);
    const [files, setFiles] = useState([])
    // const [fileName, setFileName] = useState()
    const [fileNames, setFileNames] = useState([])
    const [percent, setPercent] = useState(0)

    const imageSelectHandler = (event) => {
        console.log("image selecte handler 실행");
        // const imageFile = event.target.files[0]
        const imageFiles = event.target.files
        // setFile(imageFile)
        setFiles(imageFiles)
        // if (imageFiles != undefined) {
        //     setFileName(imageFile.name)
        // }

        // 파일 이름 여러개로 설정 하기
        // const imageFiles = event.target.files;
        const fileNames = [...imageFiles];
        console.log(typeof fileNames);
        setFileNames(fileNames);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('submit 함수 실행 check')
        const formData = new FormData()

        // formData.append('image', file)
        if (files != null) {
            console.log("files : ", files);
            for (let file of files) {
                formData.append("image", file);
            }
        } else {
            alert("파일을 선택해 주세요");
            return;
        }

        try {
            const res = await axios.post("/upload", formData, {
                headers: { 'Content-Type': 'multi/form-data' },
                onUploadProgress: (e) => {
                    console.log(ProgressEvent);
                    setPercent(Math.round((100 * e.loaded) / e.total))
                }
            })

            console.log({ res })
            toast.success('success!!')

            setTimeout(() => {
                setPercent(0);
                setFileNames([]);
            }, 2000)

        } catch (err) {
            toast.error('fail!')
            console.log(err)
        }
    }

    // const deleteRow = (e) => {
    //     e.preventDefault();
    //     alert("row 삭제");
    //     setFileName("")
    // }

    // const fileNameRow = (fileName) => {
    //     return (
    //         <span className="fileInfoRow">
    //             <span>1</span>
    //             <span>{fileName}</span>
    //             <span>
    //                 <ProgressBar percent={percent} />
    //             </span>
    //             <span>
    //                 <a onClick={(e) => deleteRow(e)}>
    //                     <CloseButton />
    //                 </a>
    //             </span>
    //         </span>
    //     )
    // }

    const FileNamedTemplate = fileNames.map((file) => {
        console.log("file : ", file);
        return (
            // <div key={file.name}>{file.name}</div>
            <span className="fileInfoRow">
                <span>1</span>
                <span>{file.name}</span>
                <span>
                    <ProgressBar percent={percent} />
                </span>
                <span>
                    <a>
                        <CloseButton />
                    </a>
                </span>
            </span>

        )
    })

    return (
        <div>
            <div className="fileDropperContainer">
                <form onSubmit={onSubmit}>
                    <label className="fileDropArea" htmlFor="fileDropArea">
                        <div className="file-dropper" >
                            {fileNames.length != 0 ? FileNamedTemplate : <div className="file_upload__message">파일을 선택해 주세요</div>}
                            {/* <input id="image" type="file" onChange={imageSelectHandler} id="fileDropArea" /> */}
                            <input id="image" type="file" onChange={imageSelectHandler} id="fileDropArea" multiple />
                        </div>
                        <button
                            className="fileUploadButton"
                            type="submit"
                            style={{
                            }}
                        >
                            제출
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default UploadForm;
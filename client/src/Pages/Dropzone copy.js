import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "./Dropzone.css";


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function Dropzone(props) {
    const [files, setFiles] = useState([]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        noClick: true,
        onDrop: acceptedFiles => {
            console.log("acceptedFiles : ", acceptedFiles);
            setFiles(acceptedFiles);
            console.log("files : ", files);
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const deleteRow = (file_name) => {
        console.log("file_name : ", file_name);
        const result = files.filter((file) => {
            return (
                file.name != file_name
            )
        })
        setFiles(result)
    }

    // 2. 파일 정보 출력 수정
    const filesTemplate = files.map((file, i) => (
        <div key={file.path} className='fileRow'>
            <div>{i+1}</div>
            <div>{file.name}</div>
            <div>{file.size}</div>
            <div className='deleteButton'><button onClick={() => deleteRow(file.name)}>삭제</button></div>
        </div>
    ));

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {/* 1. 파일 정보 출력을 여기로 옮겨 */}
                {filesTemplate}
            </div>

        </div>
    );
}


export default Dropzone
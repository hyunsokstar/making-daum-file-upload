// 1. useState 추가
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
    // 2. 드래그앤 드롭한 파일정보를 담을 스테이트 변수 선언
    const [files, setFiles] = useState([]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
        // 3. orDrop 함수를 설정해서 파일 드래그앤 드롭한 파일 정보가 setFiles 되도록 하기
        onDrop: acceptedFiles => {
            // 파일 정보 로그로 출력1
            console.log("acceptedFiles : ", acceptedFiles);
            setFiles(acceptedFiles);
            // state 에 담은 파일 정보 출력
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

    // 4. state 배열 변수에 저장된 파일 정보가 출력 되도록 하기 
    const filesTemplate = files.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <aside>
                <h4>Files</h4>
                <ul>{filesTemplate}</ul>
            </aside>

        </div>
    );
}


export default Dropzone
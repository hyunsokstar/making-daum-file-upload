import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "./Dropzone.css";

// 55 axios , toast 모듈 임포트
import axios from 'axios'
import { toast } from 'react-toastify'

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
    transition: 'border .24s ease-in-out',
    height: "100px"
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
        // 11. onDrop 함수 밖으로 빼기
        onDrop: acceptedFiles => onDrop(acceptedFiles)
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

    // 22. 여기로 옮기기 
    const onDrop = async (acceptedFiles) => {
        
        console.log("acceptedFiles : ", acceptedFiles);
        setFiles(acceptedFiles);
        console.log("files : ", files);

        // 33. files가 null 이 아닐 경우 파일 업로드 데이터 FormData 에 설정 되도록 하기 + axios로 파일 업로드 요청 하도록 하기
        const formData = new FormData()
        console.log("current files : ", files);

        if (files != null) {
            console.log("files 는 null 이 아닙니다 : ", files);
            for (let file of files) {
                formData.append("image", file);
            }

            alert("files : ", files)

            // 44 axios로 서버에 파일 업로드 요청 날리기
            try {
                const res = await axios.post("/upload", formData, {
                    headers: { 'Content-Type': 'multi/form-data' },
                })
                console.log("res : ", res)
                toast.success('success!!')

            } catch (err) {
                toast.error('fail!')
                console.log(err)
            }
        } else {
            console.log("files는 null 입니다");
        }
    }

        const deleteRow = (file_name) => {
            console.log("file_name : ", file_name);
            const result = files.filter((file) => {
                return (
                    file.name != file_name
                )
            })
            setFiles(result)
        }

        const filesTemplate = files.map((file, i) => (
            <div key={file.path} className='fileRow'>
                <div>{i + 1}</div>
                <div>{file.name}</div>
                <div>{file.size}</div>
                <div className='deleteButton'><button onClick={() => deleteRow(file.name)}>삭제</button></div>
            </div>
        ));

        return (
            <div className="container">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    {filesTemplate}
                </div>

            </div>
        );
    }


    export default Dropzone
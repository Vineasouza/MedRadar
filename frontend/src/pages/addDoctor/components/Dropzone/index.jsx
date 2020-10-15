
import React, { useCallback , useState} from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from 'react-icons/fi'

import './styles.css';

const Dropzone = ({onFileUploaded}) => {
    
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    // Receiving the Image
    const onDrop = useCallback((acceptedFiles) => {
        
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpg, image/jpeg, image/png',
    });

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept='image/*'/>
        {
            selectedFileUrl 
            ? <img src={selectedFileUrl} alt="PointImage"/> 
            :    <p>
                    <FiUpload/>
                    Selecione um avatar
                </p>
        }
        </div>
    );
}

export default Dropzone;

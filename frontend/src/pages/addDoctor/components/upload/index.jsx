import React from 'react';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';


const dropzone = ({onUpload, length}) => {
    
    function renderDragMessage (isDragActive, isDragReject) {
        if (!isDragActive) {
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        } 

        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
    };

    return (
        <Dropzone 
            accept="image/jpg, image/jpeg, image/png" onDropAccepted={onUpload}  multiple={false}>
            { ( {getRootProps, getInputProps, isDragActive, isDragReject} ) => (
                <>
                    {
                        length === 0 &&
                    <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}>
                
                    <input { ...getInputProps() } />

                    { renderDragMessage(isDragActive, isDragReject) }
                    
                    </DropContainer>
                    }
                </>
            ) }
        </Dropzone>
    );
}

export default dropzone;
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles';

const filelist = ( { files }) => {

    return (
        <Container>
           { files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <FileInfo>
                        <Preview src={uploadedFile.preview}/>
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>{uploadedFile.readableSize}
                                { !!uploadedFile.url && (
                                    <button onClick={() => {}}> Excluir </button>  
                                )}            
                            </span>
                        </div>
                    </FileInfo>

                    <div>
                        { !uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#08082D' },
                                }}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                            />
                        )}

                        { uploadedFile.url  && (
                            <a
                                href="https://avatars0.githubusercontent.com/u/32264094?v=4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdLink 
                                    style={ {marginRight: 8} } 
                                    size={24} 
                                    color="#222" 
                                />
                            </a>
                        )}

                        { uploadedFile.uploaded && (
                            <MdCheckCircle
                                size={24}
                                color="#43FF0F"
                            />
                        ) }
                        
                        { uploadedFile.error && (
                            <MdError
                                size={24}
                                color="#E57878"
                            />
                        ) }
                    </div>
                </li>
           )) }
        </Container>
    );
}

export default filelist;
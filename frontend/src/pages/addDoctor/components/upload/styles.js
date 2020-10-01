import styled, { css } from 'styled-components';

const dragActive = css`
    // border-color: #78e5d5;
    border-color: #43ff0f;
`;

const dragReject = css`
    border-color: #E57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed #08082D;
    border-radius: 4px;
    cursor: pointer;
    background-color: #F4F4F4;

    transition: height 0.2s ease;

    ${ props => props.isDragActive && dragActive};
    ${ props => props.isDragReject && dragReject};
`;

const messageColors = {
    default: '#08082D',
    error: '#e57878',
    success: '#43ff0f',
}

export const UploadMessage = styled.p`
    display: flex;
    color: ${ props => messageColors[props.type || 'default' ]};
    justify-content: center;
    align-items: center;
    padding: 15px;
`;
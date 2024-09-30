import React from 'react';
import './MyButton.css';

const MyButton = (props) => {
    return (
        <button {...props} className={'button ' + props.className}>
            
        </button>
    );
};

export default MyButton;
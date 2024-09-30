import React from 'react';
import MyButton from "../button/MyButton";
import {useTelegram} from "../../hooks/UseTelegram";


const Header = () => {
    const {user, onClose} = useTelegram()
    return (
        <div className={'header'}>
            <MyButton onClick={onClose}>Закрыть</MyButton>
            <span className={'username'}>{user?.username}</span>
        </div>
    );
};

export default Header;
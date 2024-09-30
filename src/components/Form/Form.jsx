import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/UseTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить'
        })
    }, [])

    useEffect(() => {
        if(!country || !city){
            tg.MainButton.hide()
        } else{
            tg.MainButton.show()
        }
    }, [country, city])

    const [debugInfo, setDebugInfo] = useState('');

    const onSendData = useCallback(async () => {
        const data = {
            country: country || '',
            city: city || '',
            subject: subject || '',
        };
        const jsonData = JSON.stringify(data);

        alert(`Attempting to send data: ${jsonData}`); // Отладочная информация

        try {
            await tg.sendData(jsonData);
            setDebugInfo(`Data sent: ${jsonData}`);
        } catch (error) {
            setDebugInfo(`Error: ${error.message}`);
        }
    }, [country, city, subject]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked',onSendData)
        return () => {
            tg.offEvent('mainButtonClicked',onSendData)
        }
    }, [onSendData])

    return (
        <form className={'form'}>
            <h3>Введите ваши данные</h3>
            <p>Debug Info: {debugInfo}</p>
            <input className={'input'} type="text" placeholder="Страна" value={country} onChange={e => setCountry(e.target.value)} />
            <input className={'input'} type="text" placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
            <select className={'select'} value={subject} onChange={e => setSubject(e.target.value)}>
                <option value={'legal'}>Юр. лицо</option>
                <option value={'physical'}>Физ. лицо</option>
            </select>
        </form>
    );
};

export default Form;
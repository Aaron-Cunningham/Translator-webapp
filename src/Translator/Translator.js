import React, {useEffect, useState} from "react";
import axios from 'axios';
import './Translator.css'

const Translator = () => {
    const [inputText, setInputText] = useState('');
    const [outputLang, setOutputLang] = useState('de');
    const [outputText, setOutPutText] = useState('');
    const [supportedLangs, setSupportedLangs] = useState([]);


    const languages = async () => {
        const axios = require('axios');

        const options = {
            method: 'GET',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Lang_Key,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setSupportedLangs(response.data.data.languages.language);

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        languages();
    }, []);

    const translate = async () => {
        console.log(outputLang)
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', `${inputText}`);
        encodedParams.set('target', `${outputLang}`);
        encodedParams.set('source', 'en');

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': process.env.REACT_APP_RapidAPI_Key,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios(options);
            const trans = response.data.data.translations[0].translatedText;
            setOutPutText(trans)
            console.log(trans);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <section className="translator">
            <div className="row-wrapper">
                <div className="translator-container input-lang">
                    <div className="top-row">
                        <button onClick={translate} className="btn btn-primary btn-translate">Translate</button>
                    </div>
                    <form action="" className="input-form">
                        <textarea
                            className={"text-box"}
                            placeholder={"Enter some text in any language"}
                            onChange={e => setInputText(e.target.value)}>

                        </textarea>
                    </form>
                </div>

                <div className="translator-container output-lang">
                    <div className="top-row">
                        <select name="languages" id="languages" className={"form-select form-select-sm"} onChange={e => setOutputLang(e.target.value)}>
                            <option value=''>Select Language</option>
                            {supportedLangs.map(lang => (
                                <option key={lang.language} value={lang.language}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="text-box output-box">
                        {outputText}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Translator;

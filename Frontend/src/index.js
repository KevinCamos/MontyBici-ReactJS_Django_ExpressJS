import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { I18nextProvider } from "react-i18next"
import i18next from "i18next"
import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"
import global_kl from "./translations/kl/global.json"
// https://www.youtube.com/watch?v=C6PtKxW4rvk&ab_channel=AgustinNavarroGaldon
i18next.init({
    interpolation: { escapeValue: false },
    lng:"es",
    resources:{
        es:{
            global:global_es,
        },
        en:{
            global:global_en
        },
        kl:{
            global:global_kl
        }
    }
})

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

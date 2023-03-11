import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {router} from './router'; // router js를 전달 한다.
import {RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // ## React.StrictMode 개발 모드에서 데이터를 2번 호출 하는 문제로인해 주석 처리
    // <React.StrictMode>
        <RouterProvider router={router} />  // router js를 전달 한다.
    // </React.StrictMode>
);

reportWebVitals();
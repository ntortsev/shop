import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.min.css";
import App from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
      <Routes>
        <Route path="*" element={<App />}/>
      </Routes>
    </HashRouter>,
  document.getElementById('root')
);


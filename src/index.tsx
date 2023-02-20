import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from "react-router-dom";

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <HashRouter >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter >
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

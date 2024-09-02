import React from 'react';
import './App.css';
import "@ingka/core/dist/style.min.css";
import { Routes, Route } from 'react-router-dom';
import HeaderPage from './Components/Shared/Header/headerPage';
import SearchPage from './Components/SearchPage/searchPage';
const App = () => {
  return (
    <div className="App">
      <HeaderPage />
      <Routes>
      <Route path="/" element={<SearchPage />} />
      </Routes>
    </div>
  );
}
export default App;

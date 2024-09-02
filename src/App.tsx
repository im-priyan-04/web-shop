import React from 'react';
import './App.css';
import "@ingka/core/dist/style.min.css";
import { Routes, Route } from 'react-router-dom';
import HeaderPage from './Components/Shared/Header/headerPage';
import SearchPage from './Components/SearchPage/searchPage';
import ProductDetails from './Components/Shared/ProductDetails/productDetails';
import ItemList from './Components/ItemList/itemList';
const App = () => {
  return (
    <div className="App">
      <HeaderPage />
      <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/productdetails/:category" element={<ProductDetails />} />
      <Route path="/itemList" element={<ItemList />} />
      </Routes>
    </div>
  );
}
export default App;

import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './screens/header';
import Home from './screens/home';
import ProductDetails from './screens/productDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;

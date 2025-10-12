import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/client/LoginPage'
import SignupPage from './page/client/SignupPage'
import HomePage from './page/client/Homepage';
import AboutUsPage from "./page/client/AboutUsPage";
import ProductPage from "./page/client/ProductPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />      
        <Route path="/product" element={<ProductPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

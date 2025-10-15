import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/client/LoginPage'
import SignupPage from './page/client/SignupPage'
import HomePage from './page/client/Homepage';
import AboutUsPage from "./page/client/AboutUsPage";
import ProductPage from "./page/client/ProductPage";
import ProductDetailPage from "./page/client/ProductDetailPage";
import ScrollToTop from './component/ScrollToTop';
import DeliverInfoPage from './page/client/DeliveryInfoPage';
import PrivacyPolicyPage from './page/client/PrivacyPolicyPage';
import TermsConditionsPage from './page/client/TermsConditionsPage';
import ContactusPage from './page/client/ContactusPage';

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />      
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/delivery-information" element={<DeliverInfoPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/contact-us" element={<ContactusPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

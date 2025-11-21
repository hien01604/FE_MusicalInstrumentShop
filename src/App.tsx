import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/client/LoginPage';
import SignupPage from './page/client/SignupPage';
import HomePage from './page/client/Homepage';
import AboutUsPage from './page/client/AboutUsPage';
import ProductPage from './page/client/ProductPage';
import ProductDetailPage from './page/client/ProductDetailPage';
import DeliveryInfoPage from './page/client/DeliveryInfoPage';
import PrivacyPolicyPage from './page/client/PrivacyPolicyPage';
import TermsConditionsPage from './page/client/TermsConditionsPage';
import ContactUsPage from './page/client/ContactUsPage';
import CartPage from './page/client/CartPage';
import ScrollToTop from './component/ScrollToTop';
import { CartProvider } from './context/CartContext';
import ForgotPasswordPage from './page/client/ForgotPasswordPage';
import ResetPasswordPage from './page/client/ResetPasswordPage';
import CheckoutPage from './page/client/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/products/brands/:slug" element={<ProductPage />} />
          <Route path="/products/categories/:slug" element={<ProductPage />}/>
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/delivery-information" element={<DeliveryInfoPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />


        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

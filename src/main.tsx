import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
            <CartProvider>
          <App />
            </CartProvider>
  </AuthProvider>
 </GoogleOAuthProvider>
</StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { PAYPAL_CONFIG } from './lib/paypal'
import App from './App.tsx'
import './index.css'

const paypalOptions = {
  clientId: PAYPAL_CONFIG.clientId,
  currency: PAYPAL_CONFIG.currency,
  // intent는 Provider 레벨에서 제거 — createOrder/createSubscription이 각각 처리
  components: 'buttons',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PayPalScriptProvider options={paypalOptions}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PayPalScriptProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

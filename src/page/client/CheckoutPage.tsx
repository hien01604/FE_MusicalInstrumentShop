import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { useCart } from "../../context/CartContext"; 
import CheckoutSummary from "../../component/Checkout/Summary";
import DeliveryMethod from "../../component/Checkout/DeliveryMethod";
import PaymentMethod from "../../component/Checkout/PaymentMethod";
import BillingForm from "../../component/Checkout/BillingDetails";
import Breadcrumb from "../../component/Breadcrumb";
import Layout from "../../component/Layout";
import useCheckout from "../../hooks/useCheckout"; 

export default function CheckoutPage() {
  const { cart } = useCart();
  
  // Use custom hook to handle checkout logic
  const {
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    billingInfo,
    setBillingInfo,
    subTotal,
    deliveryCost,
    totalAmount,
    handlePlaceOrder
  } = useCheckout(cart);

  return (
    <>
      <Header />
      <Breadcrumb />
      <Layout>
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 space-y-6">
              <CheckoutSummary 
                  cart={cart} 
                  subTotal={subTotal} 
                  deliveryCost={deliveryCost} 
                  totalAmount={totalAmount} 
              />
              
              <DeliveryMethod 
                  method={deliveryMethod} 
                  setMethod={setDeliveryMethod} 
              />
              
              <PaymentMethod 
                  method={paymentMethod} 
                  setMethod={setPaymentMethod} 
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2">
              <BillingForm 
                  billingInfo={billingInfo} 
                  setBillingInfo={setBillingInfo}
                  onPlaceOrder={handlePlaceOrder}
              />
            </div>

          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

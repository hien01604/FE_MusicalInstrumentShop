import type { CartItem } from "../../types/cart.type";

interface Props {
  cart: CartItem[];
  subTotal: number;
  deliveryCost: number;
  totalAmount: number;
}

export default function CheckoutSummary({ cart, subTotal, deliveryCost, totalAmount }: Props) {
  // Helper format tiền
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Summary</h3>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Sub-Total</span>
        <span>{formatCurrency(subTotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mb-4 border-b pb-4">
        <span>Delivery Charges</span>
        <span>{formatCurrency(deliveryCost)}</span>
      </div>
      <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
        <span>Total Amount</span>
        <span className="text-red-600">{formatCurrency(totalAmount)}</span>
      </div>

      {/* List Items */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {cart.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="w-16 h-16 flex-shrink-0 border rounded-md overflow-hidden">
              <img
                src={item.product?.main_image?.image_url || "https://via.placeholder.com/80"}
                alt={item.product?.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                {item.product?.product_name}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                <span className="font-bold text-sm text-green-600">
                  {item.product?.price_display}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
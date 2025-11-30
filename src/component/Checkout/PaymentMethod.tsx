interface Props {
  method: "cod" | "banking";
  setMethod: (val: "cod" | "banking") => void;
}

export default function PaymentMethod({ method, setMethod }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
      <div className="space-y-3">
        {/* Cash On Delivery */}
        <label
          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${method === 'cod' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              checked={method === 'cod'}
              onChange={() => setMethod('cod')}
              className="text-red-500 focus:ring-red-500 accent-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Cash On Delivery (COD)</span>
          </div>
          <span className="text-sm font-bold text-gray-600">Free</span>
        </label>

        {/* Bank Transfer (QR Code) */}
        <label
          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${method === 'banking' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              checked={method === 'banking'}
              onChange={() => setMethod('banking')}
              className="text-red-500 focus:ring-red-500 accent-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Bank Transfer (QR Code)</span>
          </div>
        </label>
      </div>
    </div>
  );
}

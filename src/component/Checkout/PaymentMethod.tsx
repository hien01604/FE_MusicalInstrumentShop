import React from "react";

interface Props {
  method: "cod" | "banking";
  setMethod: (val: "cod" | "banking") => void;
}

export default function PaymentMethod({ method, setMethod }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer py-2">
          <input
            type="radio" name="payment"
            checked={method === 'cod'}
            onChange={() => setMethod('cod')}
            className="text-red-500 focus:ring-red-500 accent-red-500"
          />
          <span className="text-sm text-gray-700">Cash On Delivery (COD)</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer py-2">
          <input
            type="radio" name="payment"
            checked={method === 'banking'}
            onChange={() => setMethod('banking')}
            className="text-red-500 focus:ring-red-500 accent-red-500"
          />
          <span className="text-sm text-gray-700">Bank Transfer (QR Code)</span>
        </label>
      </div>
    </div>
  );
}
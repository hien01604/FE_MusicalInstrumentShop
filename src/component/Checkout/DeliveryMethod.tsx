import React from "react";

interface Props {
  method: "free" | "flat";
  setMethod: (val: "free" | "flat") => void;
}

export default function DeliveryMethod({ method, setMethod }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Method</h3>

      <div className="space-y-3">
        <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${method === 'free' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio" name="delivery"
              checked={method === 'free'}
              onChange={() => setMethod('free')}
              className="text-red-500 focus:ring-red-500 accent-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Standard Shipping</span>
          </div>
          <span className="text-sm font-bold text-gray-600">Free</span>
        </label>

        <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${method === 'flat' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <input
              type="radio" name="delivery"
              checked={method === 'flat'}
              onChange={() => setMethod('flat')}
              className="text-red-500 focus:ring-red-500 accent-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
          </div>
          <span className="text-sm font-bold text-gray-600">50.000 ₫</span>
        </label>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Add Comments About Your Order</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-red-500 focus:border-red-500 outline-none"
          rows={2}
          placeholder="Note for delivery..."
        ></textarea>
      </div>
    </div>
  );
}
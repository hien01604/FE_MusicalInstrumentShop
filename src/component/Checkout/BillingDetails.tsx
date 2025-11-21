import React from "react";

// Định nghĩa kiểu dữ liệu cho form
export interface BillingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
}

interface Props {
  billingInfo: BillingInfo;
  setBillingInfo: (info: BillingInfo) => void;
  onPlaceOrder: () => void;
}

export default function BillingForm({ billingInfo, setBillingInfo, onPlaceOrder }: Props) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Billing Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">First Name*</label>
          <input
            type="text" name="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
            placeholder="Enter first name"
            value={billingInfo.firstName} onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name*</label>
          <input
            type="text" name="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
            placeholder="Enter last name"
            value={billingInfo.lastName} onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address*</label>
          <input
            type="text" name="address"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
            placeholder="Address Line 1"
            value={billingInfo.address} onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">City / Province *</label>
          <input
            type="text" name="city"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
            placeholder="City"
            value={billingInfo.city} onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-gray-100" disabled>
            <option>Vietnam</option>
          </select>
        </div>
      </div>

      {/* Nút Place Order */}
      <div className="mt-auto pt-10 flex justify-end">
        <button
          onClick={onPlaceOrder}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded shadow-lg transition duration-200 transform hover:-translate-y-0.5"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
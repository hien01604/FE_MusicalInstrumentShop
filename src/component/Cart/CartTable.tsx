import React from "react";
import CartItemRow from "./CartItemRow";
import type { CartItem } from "../../types/cart.type";


interface Props {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartTable: React.FC<Props> = ({ items, onIncrease, onDecrease, onRemove }) => (
  <table className="w-full text-left border-collapse bg-[#FAF8F3] border border-[#E7D7A7] rounded-2xl overflow-hidden">
    <thead>
      <tr className="bg-[#E8D3A3]/50">
        <th className="p-4">Product</th>
        <th className="p-4">Price</th>
        <th className="p-4">Quantity</th>
        <th className="p-4">Total</th>
        <th className="p-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <CartItemRow
          key={item.productId}
          item={item}
          onIncrease={() => onIncrease(item.productId)}
          onDecrease={() => onDecrease(item.productId)}
          onRemove={() => onRemove(item.productId)}
        />
      ))}
    </tbody>
  </table>
);

export default CartTable;

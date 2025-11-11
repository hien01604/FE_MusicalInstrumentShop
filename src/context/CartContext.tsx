import React, { createContext, useContext, useState, type ReactNode, useEffect, type Dispatch, type SetStateAction } from "react";
import type { CartItem } from "../types/cart.type"; 

interface CartContextType {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>; // 🔥 Thêm setCart để cho LoginForm cập nhật giỏ hàng sau khi sync
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getInitialCart = (): CartItem[] => {
    const cartJson = localStorage.getItem('guest_cart');
    if (cartJson) {
        try {
            return JSON.parse(cartJson) as CartItem[];
        } catch (e) {
            console.error("Lỗi khi phân tích Giỏ hàng Khách từ Local Storage:", e);
            return [];
        }
    }
    return [];
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 🔥 Khởi tạo state bằng dữ liệu từ Local Storage
  const [cart, setCart] = useState<CartItem[]>(getInitialCart());

    // 🔥 2. Effect để lưu Giỏ hàng vào Local Storage (Guest Cart) mỗi khi state 'cart' thay đổi
    useEffect(() => {
        // Lưu trữ Giỏ hàng hiện tại vào Local Storage (guest_cart)
        // Logic này đảm bảo giỏ hàng được lưu khi người dùng là khách,
        // hoặc khi họ đăng xuất.
        localStorage.setItem('guest_cart', JSON.stringify(cart));
    }, [cart]);


  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === item.productId);
      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((p) => p.productId !== id));

  const updateQuantity = (id: number, quantity: number) =>
    setCart((prev) =>
      prev.map((p) => (p.productId === id ? { ...p, quantity: Math.max(1, quantity) } : p))
    );

  const clearCart = () => setCart([]);

  return (
    // 🔥 Truyền cả hàm setCart ra ngoài để LoginForm có thể cập nhật
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
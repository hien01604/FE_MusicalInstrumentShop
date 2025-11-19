import React, { createContext, useContext, useState, type ReactNode, useEffect, type Dispatch, type SetStateAction } from "react";
import type { CartItem } from "../types/cart.type"; 
import { useAuth } from "./AuthContext";
import { addOrUpdateCartItemAPI, clearAllCartItemsAPI, getCartAPI, removeCartItemAPI, updateCartItemQuantityAPI } from "../services/client/cart.api";

interface CartContextType {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>; // Thêm setCart để cho LoginForm cập nhật giỏ hàng sau khi sync
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
  //  Khởi tạo state bằng dữ liệu từ Local Storage
  const [cart, setCart] = useState<CartItem[]>(getInitialCart());
  const { isLoggedIn } = useAuth();

    useEffect(() => {
        const loadServerCart = async () => {
            try {
                const response = await getCartAPI();
                if (response.data) {
                    setCart(response.data.cart_items);
                    console.log("Chay ne")
                    console.log(response.data.cart_items)
                    // Xóa giỏ hàng khách cũ sau khi đã sync hoặc load thành công
                    localStorage.removeItem('guest_cart');
                } else {
                    setCart([]);
                }
            } catch (err) {
                console.error("Lỗi tải giỏ hàng từ Server:", err);
                // Nếu lỗi 401/Network, giữ lại cart hiện tại hoặc set rỗng
                setCart([]);
            }
        };

        if (isLoggedIn) {
            loadServerCart();
        }
    }, [isLoggedIn, setCart]); //Chỉ chạy khi isLoggedIn thay đổi

    useEffect(() => {
        if (!isLoggedIn) {
            // Nếu là khách, lưu cart hiện tại vào Local Storage
            localStorage.setItem('guest_cart', JSON.stringify(cart));
        }
    }, [cart, isLoggedIn]);


  const addToCart = async (item: CartItem) => {
    if (isLoggedIn) {
            // Đã đăng nhập: Gửi request đến Backend (sẽ tương tác Redis)
            const { productId, quantity } = item;
            try {
                const response = await addOrUpdateCartItemAPI({ productId, quantity });
                if (response.data) {
                    setCart(response.data.cart_items); // Cập nhật state bằng dữ liệu trả về từ Server
                }
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm vào Server Cart:", error);
            }
        } else {
            // Khách: Logic cũ (cập nhật Local Storage)
            setCart((prev) => {
            const existing = prev.find((p) => p.productId === item.productId);
                        
            if (existing) {
                    return prev.map((p) =>
                        p.productId === item.productId 
                        // Lưu ý: cộng quantity
                        ? { ...p, quantity: p.quantity + item.quantity } 
                        : p
                    );
            }
            
            // Nếu chưa tồn tại, thêm item MỚI (đầy đủ) vào mảng
            // Vì 'item' đã chứa 'product' bên trong, chúng ta chỉ cần thêm nó vào
            return [...prev, item]; 
            });
        }
  };

  const removeFromCart = async (id: number) => {
    if (isLoggedIn) {
            // Đã đăng nhập: Gửi request đến Backend
            try {
                // Giả định removeCartItemAPI dùng DELETE /v1/cart/:id
                const response = await removeCartItemAPI(id);
                if (response.data) {
                    setCart(response.data.cart_items); // Cập nhật state bằng dữ liệu trả về từ Server
                }
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm khỏi Server Cart:", error);
            }
        } else {
            // Khách: Logic cũ
            setCart((prev) => prev.filter((p) => p.productId !== id));
        }
  }

  const updateQuantity = async (id: number, quantity: number) => {
    const safeQuantity = Math.max(1, quantity);

        if (isLoggedIn) {
            try {
                const response = await updateCartItemQuantityAPI(id, safeQuantity);
                if (response) {
                    setCart(response.data.cart_items); 
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật số lượng Server Cart:", error);
            }
        } else {
            // Khách: Logic cũ
            setCart((prev) =>
                prev.map((p) => (p.productId === id ? { ...p, quantity: safeQuantity } : p))
            );
        }
  }

  const clearCart = async () => {
    if (isLoggedIn) {
             try {
                const response = await clearAllCartItemsAPI();
                if (response.data) {
                    // Backend trả về giỏ hàng rỗng (items: [])
                    setCart(response.data.cart_items); 
                }
            } catch (error) {
                console.error("Lỗi khi xóa toàn bộ giỏ hàng Server:", error);
                // Vẫn xóa state Frontend để người dùng có thể thử lại
                setCart([]);
            }
        }
    else {
      setCart([])
    }
  }

  return (
    // Truyền cả hàm setCart ra ngoài để LoginForm có thể cập nhật
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
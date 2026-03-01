import { create } from 'zustand';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface Store {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  total: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}));

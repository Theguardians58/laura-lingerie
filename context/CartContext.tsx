"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of a single item in the cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional image URL
}

// Define the shape of the context's value
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  clearCart: () => void;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook for easy access to the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// The CartProvider component that will wrap our application
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // On initial load, try to get the cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem('laura_cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Whenever the cart items change, save the new state to local storage
  useEffect(() => {
    // We check for items > -1 to handle the initial empty state correctly
    if (items.length >= 0) {
      localStorage.setItem('laura_cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      // If item is new, add it to the cart
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeItem(itemId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


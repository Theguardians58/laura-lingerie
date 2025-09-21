"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string; // CHANGE HERE: The unique ID for the cart item itself (was number)
  productId: number; // The ID from the database products table
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('laura_cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('laura_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (itemToAdd: Omit<CartItem, 'quantity' | 'id'>) => {
    setItems((prevItems) => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find(item => item.productId === itemToAdd.productId);
      if (existingItem) {
        // If it exists, just increase the quantity
        return prevItems.map(item =>
          item.productId === itemToAdd.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new product, add it with quantity 1 and a unique ID
        return [...prevItems, { ...itemToAdd, id: crypto.randomUUID(), quantity: 1 }];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems((prevItems) =>
        prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

        

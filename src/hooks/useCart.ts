/**
 * useCart Hook
 * Custom hook for managing shopping cart state
 */

import { useState, useCallback } from "react";
import { CartItem } from "@/components/Cart";

interface UseCartReturn {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...prevItems, newItem];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
  };
}

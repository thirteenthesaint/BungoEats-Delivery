import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(  
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
        
        // Update total
        const newItems = get().items;
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        
        // Update total
        const newItems = get().items;
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
        
        // Update total
        const newItems = get().items;
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ total });
      },
      
      clearCart: () => {
        set({ items: [], total: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

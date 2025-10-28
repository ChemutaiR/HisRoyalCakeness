import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import { Order, OrderStatus } from '@/types/orders/order';
import { orderService } from '@/services/admin/orders';

export interface OrdersState {
  // Persistent data (localStorage)
  orders: Order[];
  orderHistory: Order[];
  
  // Session data (sessionStorage)
  currentOrder: Order | null;
  checkoutSession: any | null;
  
  // UI state (memory only)
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  setCurrentOrder: (order: Order) => void;
  clearCurrentOrder: () => void;
  fetchOrders: () => Promise<void>;
  clearCheckoutSession: () => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  clearError: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // Initial state
          orders: [],
          orderHistory: [],
          currentOrder: null,
          checkoutSession: null,
          isLoading: false,
          error: null,
          lastUpdated: null,
          
          // Actions
          addOrder: (order) => {
            set(state => ({
              orders: [...state.orders, order],
              currentOrder: order,
              lastUpdated: new Date()
            }));
          },
          
          updateOrder: (id, updates) => {
            set(state => ({
              orders: state.orders.map(order => 
                order.id === id ? { ...order, ...updates, updatedAt: new Date() } : order
              ),
              currentOrder: state.currentOrder?.id === id 
                ? { ...state.currentOrder, ...updates, updatedAt: new Date() }
                : state.currentOrder,
              lastUpdated: new Date()
            }));
          },
          
          setCurrentOrder: (order) => {
            set({ currentOrder: order });
          },
          
          clearCurrentOrder: () => {
            set({ currentOrder: null });
          },
          
          fetchOrders: async () => {
            set({ isLoading: true, error: null });
            try {
              const orders = await orderService.getOrders();
              set({ orders, isLoading: false, lastUpdated: new Date() });
            } catch (error: any) {
              set({ 
                error: error.message || 'Failed to fetch orders', 
                isLoading: false 
              });
            }
          },
          
          clearCheckoutSession: () => {
            set({ checkoutSession: null });
          },
          
          getOrderById: (id) => {
            const state = get();
            return state.orders.find(order => order.id === id);
          },
          
          getOrdersByStatus: (status) => {
            const state = get();
            return state.orders.filter(order => order.status === status);
          },
          
          clearError: () => {
            set({ error: null });
          }
        }),
        {
          name: 'orders-storage',
          storage: createJSONStorage(() => ({
            getItem: (name: string) => {
              const str = localStorage.getItem(name);
              if (!str) return null;
              try {
                const data = JSON.parse(str);
                // Convert date strings back to Date objects
                if (data.state?.orders) {
                  data.state.orders = data.state.orders.map((order: any) => ({
                    ...order,
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt),
                    estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
                    actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
                  }));
                }
                if (data.state?.orderHistory) {
                  data.state.orderHistory = data.state.orderHistory.map((order: any) => ({
                    ...order,
                    createdAt: new Date(order.createdAt),
                    updatedAt: new Date(order.updatedAt),
                    estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
                    actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
                  }));
                }
                if (data.state?.currentOrder) {
                  data.state.currentOrder = {
                    ...data.state.currentOrder,
                    createdAt: new Date(data.state.currentOrder.createdAt),
                    updatedAt: new Date(data.state.currentOrder.updatedAt),
                    estimatedDelivery: data.state.currentOrder.estimatedDelivery ? new Date(data.state.currentOrder.estimatedDelivery) : undefined,
                    actualDelivery: data.state.currentOrder.actualDelivery ? new Date(data.state.currentOrder.actualDelivery) : undefined,
                  };
                }
                return data;
              } catch (error) {
                // console.error('Error parsing stored orders:', error);
                return null;
              }
            },
            setItem: (name: string, value: any) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name: string) => {
              localStorage.removeItem(name);
            }
          })),
          partialize: (state) => ({
            orders: state.orders,
            orderHistory: state.orderHistory,
            currentOrder: state.currentOrder
          })
        }
      )
    ),
    { name: 'orders-store' }
  )
);

// Selectors for better performance
export const selectOrders = (state: OrdersState) => state.orders;
export const selectCurrentOrder = (state: OrdersState) => state.currentOrder;
export const selectOrdersByStatus = (status: OrderStatus) => (state: OrdersState) => 
  state.orders.filter(order => order.status === status);
export const selectIsLoading = (state: OrdersState) => state.isLoading;
export const selectError = (state: OrdersState) => state.error;

"use client";

import { AdminOrder } from '@/types/admin';
import { OrderStatus } from '@/types/orders/order';
import { StatusColumn } from '@/utils/orders/statusColors';
import OrderCard from './OrderCard';
import { useOrderDates } from '@/hooks/admin/orders/useOrderDates';

interface KanbanColumnProps {
  column: StatusColumn;
  orders: AdminOrder[];
  isHydrated: boolean;
  getEffectiveStatus: (orderId: string, actualStatus: OrderStatus) => OrderStatus;
  isOrderUpdating: (orderId: string) => boolean;
  onOrderClick: (order: AdminOrder) => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function KanbanColumn({
  column,
  orders,
  isHydrated,
  getEffectiveStatus,
  isOrderUpdating,
  onOrderClick,
  onStatusChange,
}: KanbanColumnProps) {
  const { isOverdue, isUrgent, getDateStatus } = useOrderDates();

  return (
    <div className={`${column.color} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold ${column.textColor}`}>
          {column.title}
        </h3>
        <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
          {isHydrated ? orders.length : 0}
        </span>
      </div>
      
      <div className="space-y-3">
        {orders.map((order, index) => {
          const effectiveStatus = getEffectiveStatus(order.id, order.status);
          const dateStatus = getDateStatus(order.dueDate);
          const overdue = isOverdue(order.dueDate);
          const urgent = isUrgent(order.dueDate);
          const updating = isOrderUpdating(order.id);
          
          return (
            <OrderCard
              key={`${order.id}-${column.key}-${index}`}
              order={order}
              dateStatus={dateStatus}
              isOverdue={overdue}
              isUrgent={urgent}
              effectiveStatus={effectiveStatus}
              isUpdating={updating}
              hasSpecialInstructions={!!order.specialInstructions}
              currentColumnStatus={column.key}
              onCardClick={() => onOrderClick(order)}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
}


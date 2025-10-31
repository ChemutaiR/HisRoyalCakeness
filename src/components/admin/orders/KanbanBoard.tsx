"use client";

import { AdminOrder } from '@/types/admin';
import { OrderStatus } from '@/types/orders/order';
import { getStatusColumnConfig } from '@/utils/orders/statusColors';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  orders: AdminOrder[];
  isHydrated: boolean;
  getOrdersByStatus: (status: string) => AdminOrder[];
  getEffectiveStatus: (orderId: string, actualStatus: OrderStatus) => OrderStatus;
  isOrderUpdating: (orderId: string) => boolean;
  onOrderClick: (order: AdminOrder) => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function KanbanBoard({
  orders,
  isHydrated,
  getOrdersByStatus,
  getEffectiveStatus,
  isOrderUpdating,
  onOrderClick,
  onStatusChange,
}: KanbanBoardProps) {
  const statusColumns = getStatusColumnConfig();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {statusColumns.map(column => (
        <KanbanColumn
          key={column.key}
          column={column}
          orders={getOrdersByStatus(column.key)}
          isHydrated={isHydrated}
          getEffectiveStatus={getEffectiveStatus}
          isOrderUpdating={isOrderUpdating}
          onOrderClick={onOrderClick}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}


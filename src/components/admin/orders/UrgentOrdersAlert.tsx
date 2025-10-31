"use client";

import { X, AlertTriangle } from 'lucide-react';
import { AdminOrder } from '@/types/admin';
import { getDaysUntilDue, isOverdue } from '@/utils/orders/dateCalculations';

interface UrgentOrdersAlertProps {
  urgentOrders: AdminOrder[];
  onDismiss: () => void;
}

export default function UrgentOrdersAlert({ urgentOrders, onDismiss }: UrgentOrdersAlertProps) {
  const overdueCount = urgentOrders.filter(order => isOverdue(order.dueDate)).length;
  const dueTodayCount = urgentOrders.filter(order => getDaysUntilDue(order.dueDate) === 0).length;
  const dueTomorrowCount = urgentOrders.filter(order => getDaysUntilDue(order.dueDate) === 1).length;

  return (
    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">
              🚨 URGENT: {urgentOrders.length} order{urgentOrders.length !== 1 ? 's' : ''} need{urgentOrders.length === 1 ? 's' : ''} immediate attention!
            </h3>
            <p className="text-sm text-red-700 mt-1">
              {overdueCount > 0 && `${overdueCount} overdue, `}
              {dueTodayCount > 0 && `${dueTodayCount} due today, `}
              {dueTomorrowCount > 0 && `${dueTomorrowCount} due tomorrow - BAKE TODAY!`}
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}


"use client";

import { ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import { AdminOrder } from '@/types/admin';
import { OrderStatus } from '@/types/orders/order';
import { DateStatus } from '@/utils/orders/dateCalculations';
import { getStatusColor } from '@/utils/orders/statusColors';

interface OrderCardProps {
  order: AdminOrder;
  dateStatus: DateStatus;
  isOverdue: boolean;
  isUrgent: boolean;
  effectiveStatus: OrderStatus;
  isUpdating: boolean;
  hasSpecialInstructions: boolean;
  currentColumnStatus: OrderStatus;
  onCardClick: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrderCard({
  order,
  dateStatus,
  isOverdue,
  isUrgent,
  effectiveStatus,
  isUpdating,
  hasSpecialInstructions,
  currentColumnStatus,
  onCardClick,
  onStatusChange,
}: OrderCardProps) {
  const getCardBorderClass = () => {
    if (hasSpecialInstructions) return 'border-blue-300 bg-blue-50';
    if (isOverdue) return 'border-red-300 bg-red-50';
    if (isUrgent) return 'border-orange-300 bg-orange-50';
    if (isUpdating) return 'opacity-75 border-yellow-300 bg-yellow-50';
    return '';
  };

  const getActionButton = () => {
    if (currentColumnStatus === 'received') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(order.id, 'ready');
          }}
          disabled={isUpdating}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
            isUpdating
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <ArrowRight size={12} />
          {isUpdating ? 'Updating...' : 'Ready'}
        </button>
      );
    }
    
    if (currentColumnStatus === 'ready') {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(order.id, 'delivered');
          }}
          disabled={isUpdating}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
            isUpdating
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-[#c7b8ea] text-black hover:bg-[#c7b8ea]/80'
          }`}
        >
          <ArrowRight size={12} />
          {isUpdating ? 'Updating...' : 'Delivered'}
        </button>
      );
    }
    
    return null;
  };

  return (
    <div
      className={`bg-white rounded-lg p-3 shadow-sm border cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 ${getCardBorderClass()}`}
      onClick={onCardClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-gray-900">{order.id}</span>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(effectiveStatus)}`}>
          {effectiveStatus}
        </span>
      </div>
      
      <div className="space-y-1 text-xs text-gray-600">
        <div><strong>Cake:</strong> {order.cake}</div>
        <div><strong>Size:</strong> {order.size}</div>
        <div className="flex items-center gap-2">
          <strong>Due:</strong> 
          <span className="text-xs">{order.dueDate}</span>
          {dateStatus.status !== 'normal' && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${dateStatus.color}`}>
              {dateStatus.status === 'due-tomorrow' && <Clock className="w-3 h-3 inline mr-1" />}
              {dateStatus.status === 'overdue' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
              {dateStatus.text}
            </span>
          )}
        </div>
        <div><strong>Cream:</strong> {order.cream}</div>
        {order.topping && <div><strong>Topping:</strong> {order.topping}</div>}
        {order.customNotes && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
            <strong>Notes:</strong> {order.customNotes}
          </div>
        )}
      </div>

      {order.allergies !== 'None' && (
        <div className="mt-2">
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
            ⚠️ {order.allergies}
          </span>
        </div>
      )}

      {getActionButton() && (
        <div className="mt-3 flex justify-end">
          {getActionButton()}
        </div>
      )}
    </div>
  );
}


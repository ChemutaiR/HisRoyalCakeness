"use client";

interface OrderActionsSectionProps {
  status: string;
  onClose: () => void;
}

export default function OrderActionsSection({
  status,
  onClose,
}: OrderActionsSectionProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span>Order Status: {status.toUpperCase()}</span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}


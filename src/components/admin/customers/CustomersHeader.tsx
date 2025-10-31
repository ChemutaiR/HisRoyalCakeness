"use client";

interface CustomersHeaderProps {
  onAddCustomer?: () => void;
}

export default function CustomersHeader({ onAddCustomer }: CustomersHeaderProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Customer Management</h2>
      <p className="text-gray-600 text-base mb-8">
        View and manage your customer accounts here.
      </p>
    </>
  );
}


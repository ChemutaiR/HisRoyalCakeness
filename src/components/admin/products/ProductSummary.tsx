"use client";

interface ProductSummaryProps {
  name: string;
  imagesCount: number;
  pricesCount: number;
  whippingCreamOptionsCount: number;
  bakingTinOptionsCount: number;
  isActive: boolean;
}

export default function ProductSummary({
  name,
  imagesCount,
  pricesCount,
  whippingCreamOptionsCount,
  bakingTinOptionsCount,
  isActive,
}: ProductSummaryProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-blue-900 mb-2">Product Summary</h4>
      <div className="text-sm text-blue-800 space-y-1">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Images:</strong> {imagesCount} image(s)
        </p>
        <p>
          <strong>Price Points:</strong> {pricesCount}
        </p>
        <p>
          <strong>Whipping Cream Options:</strong> {whippingCreamOptionsCount}
        </p>
        <p>
          <strong>Baking Tin Options:</strong> {bakingTinOptionsCount}
        </p>
        <p>
          <strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}
        </p>
      </div>
    </div>
  );
}


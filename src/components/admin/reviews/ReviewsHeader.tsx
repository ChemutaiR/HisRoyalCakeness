"use client";

interface ReviewsHeaderProps {
  title?: string;
  description?: string;
}

export default function ReviewsHeader({
  title = 'Review Management',
  description = 'Monitor and respond to customer reviews to maintain your reputation.',
}: ReviewsHeaderProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-base mb-8">{description}</p>
    </>
  );
}


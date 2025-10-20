import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  minPrice: number;
  maxPrice: number;
}

export default function ProductCard({ 
  id, 
  name, 
  description, 
  imageUrl, 
  minPrice,
  maxPrice
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
      <div className="relative aspect-square bg-gray-200 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium mb-2 text-sm text-gray-800 tracking-wide">{name}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-grow leading-relaxed">{description}</p>
        
        <div className="flex flex-col mt-auto">
          <div className="flex flex-col mb-3">
            <span className="font-semibold text-sm text-gray-900 tracking-tight">
              Starting from KES {minPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Link 
              href={name === 'Solo Slice Set' ? '/shop/cakes/customloaves' : `/shop/cakes/${id}`}
              className="w-full bg-[#c7b8ea] text-black text-sm px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-[#c7b8ea]/80 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
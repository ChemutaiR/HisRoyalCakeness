import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductCard({ 
  id, 
  name, 
  description, 
  imageUrl, 
  price
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
        <h3 className="font-semibold mb-2 text-lg text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
        
        <div className="flex flex-col mt-auto">
          <div className="flex flex-col mb-3">
            <span className="font-bold text-lg text-gray-900">KES {price.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              className="w-full bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              Preview
            </button>
            <Link 
              href={name === 'Solo Slice Set' ? '/cakes/customloaves' : `/cakes/${id}`}
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
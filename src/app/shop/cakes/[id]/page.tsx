'use client';

import { useParams } from 'next/navigation';
import SizeSelector from '@/components/CakeCustomizer/SizeSelector';
import CreamSelector from '@/components/CakeCustomizer/CreamSelector';
import DecorationSelector from '@/components/CakeCustomizer/DecorationSelector';
import NotesSection from '@/components/CakeCustomizer/NotesSection';
import ImageUploader from '@/components/CakeCustomizer/ImageUploader';
import CustomizationSummary from '@/components/CakeCustomizer/CustomizationSummary';
import AddToCartButton from '@/components/CakeCustomizer/AddToCartButton';
// Container type selection is not used in current UI
// import ContainerTypeSelector from '@/components/CakeCustomizer/ContainerTypeSelector';
import CakeReviews from '@/components/CakeCustomizer/Reviews';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';
import { useCakeDetails } from '@/hooks/shop/useCakeDetails';
import { ImageCarousel } from '@/components/ui';

export default function CakeDetailPage() {
  const params = useParams();
  const cakeId = parseInt(params.id as string);
  
  // Use the new cake details hook
  const {
    cake,
    loading,
    error,
    selectedSize,
    selectedCream,
    selectedDecorations,
    // selectedContainerType,
    customNotes,
    uploadedImages,
    availableSizes,
    availableCreamOptions,
    setSelectedSize,
    setSelectedCream,
    setSelectedDecorations,
    // setSelectedContainerType,
    setCustomNotes,
    setUploadedImages,
    totalPrice
  } = useCakeDetails(cakeId);
  
  // Development-only: enable full Notes functionality
  const isAuthenticated = true;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c7b8ea] mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 leading-relaxed">Loading cake details...</p>
        </div>
      </div>
    );
  }

  if (error || !cake) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-800 tracking-wide mb-4">Cake Not Found</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{error || 'The requested cake could not be found.'}</p>
          <Link 
            href="/shop/catalog"
            className="inline-flex items-center px-4 py-2 bg-[#c7b8ea] text-black rounded-lg hover:bg-[#c7b8ea]/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/shop/catalog"
            className="inline-flex items-center text-[#c7b8ea] hover:text-[#b3a4d6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
      </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-4">
            <ImageCarousel
              images={[cake.image]}
              altText={cake.name}
              showThumbnails={false}
              showDots={false}
              showArrows={false}
              aspectRatio="aspect-[3/2]"
              maxHeight={320}
              className="rounded-2xl overflow-hidden"
            />
            
            {/* Additional Images - Not available in current data structure */}
            {/* {cake.images && cake.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {cake.images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={`${cake.name} view ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )} */}

            {/* Cream selection and preferences */}
            <div className="grid grid-cols-1 gap-6">
              {/* Cream Selection */}
              <CreamSelector 
                options={availableCreamOptions}
                selectedCream={selectedCream}
                onCreamChange={setSelectedCream}
              />

              {/* Custom Notes */}
              <NotesSection 
                isAuthenticated={isAuthenticated}
                notes={customNotes}
                onNotesChange={setCustomNotes}
              />

              {/* Design Preferences (Image Upload) */}
              <ImageUploader 
                isAuthenticated={isAuthenticated}
                uploadedImages={uploadedImages}
                onImagesChange={setUploadedImages}
              />
            </div>
          </div>

          {/* Right Column - Details & Customization */}
          <div className="lg:col-span-3 space-y-8">
            {/* Basic Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800 tracking-wide mb-0.5">{cake.name}</h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{cake.description}</p>
              
              {/* Rating - Placeholder for now */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  4.7 (3 reviews)
                </span>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-800 tracking-wide">Customize Your Cake</h2>
              
              {/* Size Selection */}
            <SizeSelector 
              sizes={availableSizes} 
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

              {/* Decoration Selection */}
              <DecorationSelector
                selectedDecorations={selectedDecorations}
                onDecorationsChange={setSelectedDecorations}
              />
              
            </div>

            {/* Customization Summary */}
            <CustomizationSummary 
              cake={cake}
              selectedSize={selectedSize}
              selectedCream={selectedCream}
              selectedDecorations={selectedDecorations}
              totalPrice={totalPrice}
            />

            {/* Add to Cart Button */}
            <AddToCartButton 
              cake={cake}
              selectedSize={selectedSize}
              selectedCream={selectedCream}
              selectedDecorations={selectedDecorations}
              customNotes={customNotes}
              uploadedImages={uploadedImages}
              totalPrice={totalPrice}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <CakeReviews 
            cakeId={cakeId} 
            cakeName={cake.name}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
} 

"use client";

import { useEffect, useMemo, useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useCatalogStore } from '@/store/slices/shop/catalog';
import PromotionsTable from './PromotionsTable';
import AddPromotionModal from './AddPromotionModal';
import EditPromotionModal from './EditPromotionModal';
import { usePromotions } from '@/hooks/admin/promotions/usePromotions';

export default function Promotions() {
  const [editingPromotion, setEditingPromotion] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [applyToAllAdd, setApplyToAllAdd] = useState<boolean>(true);
  const [selectedCakesAdd, setSelectedCakesAdd] = useState<string[]>([]);

  const [applyToAllEdit, setApplyToAllEdit] = useState<boolean>(false);
  const [selectedCakesEdit, setSelectedCakesEdit] = useState<string[]>([]);
  const [discountTypeEdit, setDiscountTypeEdit] = useState<'Percentage' | 'Fixed Amount'>('Percentage');
  const [discountTypeAdd, setDiscountTypeAdd] = useState<'Percentage' | 'Fixed Amount'>('Percentage');
  const [statusEdit, setStatusEdit] = useState<string>('Active');
  const [enableMinOrderEdit, setEnableMinOrderEdit] = useState<boolean>(true);
  const [enableMaxUsageEdit, setEnableMaxUsageEdit] = useState<boolean>(true);
  const [enableMinOrderAdd, setEnableMinOrderAdd] = useState<boolean>(false);
  const [enableMaxUsageAdd, setEnableMaxUsageAdd] = useState<boolean>(false);
  const [enableImageAdd, setEnableImageAdd] = useState<boolean>(false);
  const [enableImageEdit, setEnableImageEdit] = useState<boolean>(false);
  const [_imageFileAdd, setImageFileAdd] = useState<File | null>(null);
  const [imagePreviewAdd, setImagePreviewAdd] = useState<string | null>(null);
  const [_imageFileEdit, setImageFileEdit] = useState<File | null>(null);
  const [imagePreviewEdit, setImagePreviewEdit] = useState<string | null>(null);
  const imageFileInputRefAdd = useRef<HTMLInputElement | null>(null);
  const imageFileInputRefEdit = useRef<HTMLInputElement | null>(null);

  const { cakes, loadCakes } = useCatalogStore();
  useEffect(() => {
    loadCakes();
  }, [loadCakes]);

  const cakeNames = useMemo(() => cakes.map(c => c.name), [cakes]);

  const { promotions: fetchedPromotions } = usePromotions();

  const promotions = useMemo(() => [
    {
      id: '#PROMO001',
      name: 'Birthday Special',
      description: 'Get 15% off on birthday cakes',
      image: '/promotions/weekend.jpg',
      discountType: 'Percentage',
      discountValue: 15,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 45,
      maxUsage: 100,
      applicableProducts: ['All Cakes'],
      minOrderValue: 2000,
      code: 'BIRTHDAY15'
    },
    {
      id: '#PROMO002',
      name: 'First Order Discount',
      description: '20% off for first-time customers',
      image: '/promotions/seasonal.jpg',
      discountType: 'Percentage',
      discountValue: 20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 23,
      maxUsage: 50,
      applicableProducts: ['All Cakes'],
      minOrderValue: 1500,
      code: 'FIRST20'
    },
    {
      id: '#PROMO003',
      name: 'Weekend Special',
      description: '10% off on all orders placed on weekends',
      image: '/promotions/cupcakes.jpg',
      discountType: 'Percentage',
      discountValue: 10,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'Active',
      usageCount: 67,
      maxUsage: 200,
      applicableProducts: ['All Cakes'],
      minOrderValue: 1000,
      code: 'WEEKEND10'
    },
    {
      id: '#PROMO004',
      name: 'Chocolate Lovers',
      description: 'Flat KES 500 off on chocolate cakes',
      image: '/promotions/chocolate.jpg',
      discountType: 'Fixed Amount',
      discountValue: 500,
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      status: 'Active',
      usageCount: 12,
      maxUsage: 30,
      applicableProducts: ['Chocolate Cake', 'Chocolate Fudge', 'Black Forest'],
      minOrderValue: 3000,
      code: 'CHOCO500'
    },
    {
      id: '#PROMO005',
      name: 'Bulk Order Discount',
      description: '25% off on orders above 5kg',
      discountType: 'Percentage',
      discountValue: 25,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 8,
      maxUsage: 25,
      applicableProducts: ['All Cakes'],
      minOrderValue: 5000,
      code: 'BULK25'
    },
    {
      id: '#PROMO006',
      name: 'Valentine Special',
      description: 'Red Velvet cakes at 15% off',
      discountType: 'Percentage',
      discountValue: 15,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'Expired',
      usageCount: 34,
      maxUsage: 50,
      applicableProducts: ['Red Velvet Cake'],
      minOrderValue: 2500,
      code: 'VALENTINE15'
    },
    {
      id: '#PROMO007',
      name: 'Referral Bonus',
      description: 'KES 1000 off when referred by existing customer',
      image: '/promotions/referral.jpg',
      discountType: 'Fixed Amount',
      discountValue: 1000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      usageCount: 15,
      maxUsage: 100,
      applicableProducts: ['All Cakes'],
      minOrderValue: 4000,
      code: 'REFER1000'
    },
    {
      id: '#PROMO008',
      name: 'Holiday Special',
      description: '30% off on fruit cakes during holidays',
      image: '/promotions/holiday.jpg',
      discountType: 'Percentage',
      discountValue: 30,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'Scheduled',
      usageCount: 0,
      maxUsage: 20,
      applicableProducts: ['Light Fruit Cake', 'Rich Fruit Cake', 'Mild Fruit Cake'],
      minOrderValue: 3500,
      code: 'HOLIDAY30'
    }
  ], []);

  const effectivePromotions = useMemo(() => {
    return fetchedPromotions && fetchedPromotions.length > 0 ? fetchedPromotions : promotions;
  }, [fetchedPromotions, promotions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsagePercentage = (usageCount: number, maxUsage: number) => {
    return Math.round((usageCount / maxUsage) * 100);
  };

  const handleEdit = (promotion: any) => {
    setEditingPromotion(promotion);
    const isAll = promotion.applicableProducts?.includes('All Cakes');
    setApplyToAllEdit(!!isAll);
    setSelectedCakesEdit(isAll ? [] : (promotion.applicableProducts || []));
    setDiscountTypeEdit(promotion.discountType || 'Percentage');
    setEnableMinOrderEdit(typeof promotion.minOrderValue === 'number');
    setEnableMaxUsageEdit(typeof promotion.maxUsage === 'number');
    setStatusEdit(promotion.status || 'Active');
    const hasImage = !!promotion.image;
    setEnableImageEdit(hasImage);
    if (hasImage) {
      setImagePreviewEdit(promotion.image);
      setImageFileEdit(null);
    } else {
      setImagePreviewEdit(null);
      setImageFileEdit(null);
    }
  };

  const handleDelete = () => {
    // Handle delete logic here
    // console.log('Delete promotion');
  };

  const handleAddPromotion = () => {
    setShowAddModal(true);
    setApplyToAllAdd(true);
    setSelectedCakesAdd([]);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-2">Promotions Management</h2>
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddPromotion}
          className="flex items-center gap-2 bg-[#c7b8ea] text-black text-base font-semibold px-4 py-2 rounded-full shadow hover:bg-[#c7b8ea]/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Promotion
        </button>
      </div>
      <p className="text-gray-600 text-base mb-8">Manage promotional campaigns and discount codes.</p>
      
      <PromotionsTable 
        promotions={effectivePromotions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStatusColor={getStatusColor}
        getUsagePercentage={getUsagePercentage}
      />

      <EditPromotionModal
        isOpen={!!editingPromotion}
        onClose={() => {
          setEditingPromotion(null);
          setEnableImageEdit(false);
          setImageFileEdit(null);
          setImagePreviewEdit(null);
          if (imageFileInputRefEdit.current) {
            imageFileInputRefEdit.current.value = '';
          }
        }}
        promotion={editingPromotion}
        cakeNames={cakeNames}
        enableImage={enableImageEdit}
        setEnableImage={setEnableImageEdit}
        imageFileRef={imageFileInputRefEdit}
        imagePreview={imagePreviewEdit}
        setImagePreview={setImagePreviewEdit}
        setImageFile={setImageFileEdit}
        applyToAll={applyToAllEdit}
        setApplyToAll={setApplyToAllEdit}
        selectedCakes={selectedCakesEdit}
        setSelectedCakes={setSelectedCakesEdit}
        discountType={discountTypeEdit}
        setDiscountType={setDiscountTypeEdit}
        enableMinOrder={enableMinOrderEdit}
        setEnableMinOrder={setEnableMinOrderEdit}
        enableMaxUsage={enableMaxUsageEdit}
        setEnableMaxUsage={setEnableMaxUsageEdit}
        status={statusEdit}
        setStatus={setStatusEdit}
      />

      <AddPromotionModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEnableImageAdd(false);
          setImageFileAdd(null);
          setImagePreviewAdd(null);
          if (imageFileInputRefAdd.current) {
            imageFileInputRefAdd.current.value = '';
          }
        }}
        cakeNames={cakeNames}
        enableImage={enableImageAdd}
        setEnableImage={setEnableImageAdd}
        imageFileRef={imageFileInputRefAdd}
        imagePreview={imagePreviewAdd}
        setImagePreview={setImagePreviewAdd}
        setImageFile={setImageFileAdd}
        applyToAll={applyToAllAdd}
        setApplyToAll={setApplyToAllAdd}
        selectedCakes={selectedCakesAdd}
        setSelectedCakes={setSelectedCakesAdd}
        discountType={discountTypeAdd}
        setDiscountType={setDiscountTypeAdd}
        enableMinOrder={enableMinOrderAdd}
        setEnableMinOrder={setEnableMinOrderAdd}
        enableMaxUsage={enableMaxUsageAdd}
        setEnableMaxUsage={setEnableMaxUsageAdd}
      />
    </div>
  );
} 
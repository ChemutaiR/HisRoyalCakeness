'use client';

interface ContainerType {
  name: string;
  value: string;
}

interface ContainerTypeSelectorProps {
  selectedContainerType: ContainerType | null;
  // eslint-disable-next-line no-unused-vars
  onContainerTypeChange: (containerType: ContainerType) => void;
}

const containerTypes: ContainerType[] = [
  { name: 'Love Heart', value: 'love-heart' },
  { name: 'Square/Rectangular', value: 'square-rectangular' },
  { name: 'Circle', value: 'circle' },
  { name: 'Custom', value: 'custom' }
];

export default function ContainerTypeSelector({ 
  selectedContainerType, 
  onContainerTypeChange 
}: ContainerTypeSelectorProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Container Type</h3>
      <div className="grid grid-cols-2 gap-3">
        {containerTypes.map((containerType) => (
          <button
            key={containerType.value}
            onClick={() => onContainerTypeChange(containerType)}
            className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
              selectedContainerType?.value === containerType.value
                ? 'border-[#c7b8ea] bg-[#c7b8ea] text-white'
                : 'border-gray-300 text-gray-700 hover:border-[#c7b8ea] hover:bg-gray-50'
            }`}
          >
            {containerType.name}
          </button>
        ))}
      </div>
    </div>
  );
} 
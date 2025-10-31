import DateRangePicker from './DateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

export interface AnalyticsHeaderProps {
  selectedPeriod: 'week' | 'month' | 'quarter' | 'year' | 'custom';
  displayValue: string;
  showDatePicker: boolean;
  setShowDatePicker: (v: boolean) => void;
  datePickerStep: 'from' | 'to';
  customDateRange: { from: Date | undefined; to: Date | undefined };
  onPeriodChange: (value: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onApplyCustom: () => void;
  onClearCustom: () => void;
}

export default function AnalyticsHeader({
  selectedPeriod,
  displayValue,
  showDatePicker,
  setShowDatePicker,
  datePickerStep,
  customDateRange,
  onPeriodChange,
  onDateSelect,
  onApplyCustom,
  onClearCustom,
}: AnalyticsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 text-base">Track your business performance and insights</p>
      </div>
      <div className="flex items-center gap-2">
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px]">
            <span className="truncate">
              {selectedPeriod === 'custom' ? 'Custom Date Range' : displayValue}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Date Range</SelectItem>
          </SelectContent>
        </Select>

        {selectedPeriod === 'custom' && (
          <DateRangePicker
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            datePickerStep={datePickerStep}
            customDateRange={customDateRange}
            onDateSelect={onDateSelect}
            onApplyCustom={onApplyCustom}
            onClearCustom={onClearCustom}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export interface DateRangePickerProps {
  showDatePicker: boolean;
  setShowDatePicker: (v: boolean) => void;
  datePickerStep: 'from' | 'to';
  customDateRange: { from: Date | undefined; to: Date | undefined };
  onDateSelect: (date: Date | undefined) => void;
  onApplyCustom: () => void;
  onClearCustom: () => void;
}

export default function DateRangePicker({
  showDatePicker,
  setShowDatePicker,
  datePickerStep,
  customDateRange,
  onDateSelect,
  onApplyCustom,
  onClearCustom,
}: DateRangePickerProps) {
  return (
    <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[200px] justify-start text-left font-normal"
          onClick={() => setShowDatePicker(true)}
        >
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {customDateRange.from ? (
              customDateRange.to ? (
                `${format(customDateRange.from, 'MMM dd')} - ${format(customDateRange.to, 'MMM dd')}`
              ) : (
                format(customDateRange.from, 'MMM dd, yyyy')
              )
            ) : (
              'Pick a date range'
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">
              {datePickerStep === 'from' ? 'Select Start Date' : 'Select End Date'}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDatePicker(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CalendarComponent
            mode="single"
            selected={datePickerStep === 'from' ? customDateRange.from : customDateRange.to}
            onSelect={onDateSelect}
            disabled={(date) => {
              if (datePickerStep === 'to' && customDateRange.from) {
                return date < customDateRange.from;
              }
              return date > new Date();
            }}
            initialFocus
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              {customDateRange.from && (
                <div>From: {format(customDateRange.from, 'MMM dd, yyyy')}</div>
              )}
              {customDateRange.to && (
                <div>To: {format(customDateRange.to, 'MMM dd, yyyy')}</div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearCustom}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onApplyCustom}
                disabled={!customDateRange.from || !customDateRange.to}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


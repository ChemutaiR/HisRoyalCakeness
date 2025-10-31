"use client";

import { useCallback, useMemo, useState } from 'react';
import { DateRangeType } from '@/types/admin/analytics-dynamic';

export function useDateRange() {
  const [selectedPeriod, setSelectedPeriod] = useState<DateRangeType>('month');
  const [customDateRange, setCustomDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerStep, setDatePickerStep] = useState<'from' | 'to'>('from');
  const [displayValue, setDisplayValue] = useState('This Month');

  const handlePeriodChange = useCallback((value: string, onComparisonChange?: (enabled: boolean) => void) => {
    if (value === 'custom') {
      setSelectedPeriod('custom');
      setShowDatePicker(false);
      setDatePickerStep('from');
      // Disable comparison for custom ranges
      if (onComparisonChange) {
        onComparisonChange(false);
      }
    } else {
      setSelectedPeriod(value as DateRangeType);
      setCustomDateRange({ from: undefined, to: undefined });
      setShowDatePicker(false);
      setDisplayValue(
        value === 'week' ? 'This Week' :
        value === 'month' ? 'This Month' :
        value === 'quarter' ? 'This Quarter' :
        value === 'year' ? 'This Year' : 'This Month'
      );
    }
  }, []);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (datePickerStep === 'from') {
      setCustomDateRange(prev => ({ ...prev, from: date }));
      setDatePickerStep('to');
    } else {
      setCustomDateRange(prev => ({ ...prev, to: date }));
    }
  }, [datePickerStep]);

  const applyCustomDateRange = useCallback(() => {
    if (customDateRange.from && customDateRange.to) {
      setSelectedPeriod('custom');
      setDisplayValue('Custom Date Range');
      setShowDatePicker(false);
      setDatePickerStep('from');
    }
  }, [customDateRange.from, customDateRange.to]);

  const clearCustomDateRange = useCallback(() => {
    setCustomDateRange({ from: undefined, to: undefined });
    setSelectedPeriod('month');
    setDisplayValue('This Month');
    setShowDatePicker(false);
    setDatePickerStep('from');
  }, []);

  const comparisonLabel = useMemo(() => {
    if (selectedPeriod === 'custom') return '';
    switch (selectedPeriod) {
      case 'week':
        return 'vs previous week';
      case 'month':
        return 'vs previous month';
      case 'quarter':
        return 'vs previous quarter';
      case 'year':
        return 'vs previous year';
      default:
        return 'vs previous period';
    }
  }, [selectedPeriod]);

  return {
    selectedPeriod,
    customDateRange,
    showDatePicker,
    setShowDatePicker,
    datePickerStep,
    displayValue,
    comparisonLabel,
    handlePeriodChange,
    handleDateSelect,
    applyCustomDateRange,
    clearCustomDateRange,
  };
}



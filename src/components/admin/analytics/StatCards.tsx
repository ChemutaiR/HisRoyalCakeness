import { ReactNode } from 'react';

export interface StatCardsProps {
  selectedPeriod: 'week' | 'month' | 'quarter' | 'year' | 'custom';
  comparisonLabel: string;
  currentMetrics: {
    siteVisits?: number;
    conversionRate?: number;
    totalRevenue: number;
    totalOrders: number;
    customerSatisfaction?: number;
  } | null;
  changeMetrics: {
    revenue: number | null;
    orders: number | null;
    averageOrderValue: number | null;
    siteVisits: number | null;
    conversionRate: number | null;
    customerSatisfaction: number | null;
  } | null;
  getMetricIcon: (metric: string) => ReactNode;
  getChangeIcon: (value: number | null) => ReactNode;
}

export default function StatCards({
  selectedPeriod,
  comparisonLabel,
  currentMetrics,
  changeMetrics,
  getMetricIcon,
  getChangeIcon,
}: StatCardsProps) {
  if (!currentMetrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Site Visits</p>
            <p className="text-2xl font-bold text-gray-900">
              {currentMetrics.siteVisits?.toLocaleString() || 'N/A'}
            </p>
          </div>
          {getMetricIcon('visits')}
        </div>
        {selectedPeriod !== 'custom' && changeMetrics?.siteVisits !== null && changeMetrics?.siteVisits !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon(changeMetrics.siteVisits)}
            <span className={`text-sm font-medium ml-1 ${changeMetrics.siteVisits >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeMetrics.siteVisits >= 0 ? '+' : ''}{changeMetrics.siteVisits?.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {currentMetrics.conversionRate?.toFixed(1) || '0'}%
            </p>
          </div>
          {getMetricIcon('conversion')}
        </div>
        {selectedPeriod !== 'custom' && changeMetrics?.conversionRate !== null && changeMetrics?.conversionRate !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon(changeMetrics.conversionRate)}
            <span className={`text-sm font-medium ml-1 ${changeMetrics.conversionRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeMetrics.conversionRate >= 0 ? '+' : ''}{changeMetrics.conversionRate?.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {currentMetrics.totalRevenue.toLocaleString()}
            </p>
          </div>
          {getMetricIcon('revenue')}
        </div>
        {selectedPeriod !== 'custom' && changeMetrics?.revenue !== null && changeMetrics?.revenue !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon(changeMetrics.revenue)}
            <span className={`text-sm font-medium ml-1 ${changeMetrics.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeMetrics.revenue >= 0 ? '+' : ''}{changeMetrics.revenue?.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{currentMetrics.totalOrders}</p>
          </div>
          {getMetricIcon('orders')}
        </div>
        {selectedPeriod !== 'custom' && changeMetrics?.orders !== null && changeMetrics?.orders !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon(changeMetrics.orders)}
            <span className={`text-sm font-medium ml-1 ${changeMetrics.orders >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeMetrics.orders >= 0 ? '+' : ''}{changeMetrics.orders?.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-gray-900">
              {currentMetrics.customerSatisfaction?.toFixed(1) || 'N/A'}/5.0
            </p>
          </div>
          {getMetricIcon('satisfaction')}
        </div>
        {selectedPeriod !== 'custom' && changeMetrics?.customerSatisfaction !== null && changeMetrics?.customerSatisfaction !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon(changeMetrics.customerSatisfaction)}
            <span className={`text-sm font-medium ml-1 ${changeMetrics.customerSatisfaction >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {changeMetrics.customerSatisfaction >= 0 ? '+' : ''}{changeMetrics.customerSatisfaction?.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 ml-1">{comparisonLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Order Date Calculation Utilities
 * 
 * Pure functions for calculating order due dates and status
 */

export type DateStatus = {
  status: 'overdue' | 'due-today' | 'due-tomorrow' | 'urgent' | 'normal';
  text: string;
  color: string;
};

/**
 * Calculate the number of days until a due date
 */
export function getDaysUntilDue(dueDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Check if an order is urgent (due today or tomorrow)
 */
export function isUrgent(dueDate: string): boolean {
  const daysUntilDue = getDaysUntilDue(dueDate);
  return daysUntilDue <= 1 && daysUntilDue >= 0;
}

/**
 * Check if an order is overdue
 */
export function isOverdue(dueDate: string): boolean {
  const daysUntilDue = getDaysUntilDue(dueDate);
  return daysUntilDue < 0;
}

/**
 * Get the date status object with text and styling
 */
export function getDateStatus(dueDate: string): DateStatus {
  const daysUntilDue = getDaysUntilDue(dueDate);
  
  if (daysUntilDue < 0) {
    return {
      status: 'overdue',
      text: `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`,
      color: 'text-red-600 bg-red-100'
    };
  } else if (daysUntilDue === 0) {
    return {
      status: 'due-today',
      text: 'Due Today!',
      color: 'text-red-600 bg-red-100'
    };
  } else if (daysUntilDue === 1) {
    return {
      status: 'due-tomorrow',
      text: 'Due Tomorrow - Bake Today!',
      color: 'text-orange-600 bg-orange-100'
    };
  } else if (daysUntilDue <= 3) {
    return {
      status: 'urgent',
      text: `Due in ${daysUntilDue} days`,
      color: 'text-yellow-600 bg-yellow-100'
    };
  } else {
    return {
      status: 'normal',
      text: `Due in ${daysUntilDue} days`,
      color: 'text-gray-600 bg-gray-100'
    };
  }
}


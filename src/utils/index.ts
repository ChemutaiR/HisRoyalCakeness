// Utils exports - organized by domain

// Shared utilities (common across all domains) - explicit exports to avoid conflicts
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber
} from './shared/format';

export {
  formatDate,
  formatDateShort,
  formatTime,
  formatDateTime,
  getRelativeTime,
  isToday,
  isPast,
  addDays,
  getStartOfDay,
  getEndOfDay
} from './shared/date';

export {
  capitalize,
  capitalizeWords,
  slugify,
  truncate,
  stripHtml,
  generateRandomString,
  generateId,
  isEmpty,
  normalizeWhitespace,
  camelToKebab,
  kebabToCamel,
  maskSensitive,
  getInitials
} from './shared/string';

export * from './shared/cn';
export * from './shared/validation';

// Domain-specific utilities
export * from './catalog';
export * from './admin';
export * from './cart';

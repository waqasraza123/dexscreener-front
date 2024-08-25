// Compare time durations
const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)([a-z]+)/);
    if (!match) return 0;
  
    const value = parseInt(match[1], 10);
    const unit = match[2];
  
    switch (unit) {
      case 'h': return value;
      case 'd': return value * 24;
      case 'mo': return value * 24 * 30;
      case 'y': return value * 24 * 365;
      default: return 0;
    }
  };
  
  // Generic sorting function
  export const sortData = (data: any[], key: string, sortOrder: 'asc' | 'desc') => {
    return data.slice().sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (typeof aValue === 'string' && key === 'Age') {
        return (sortOrder === 'asc' ? 1 : -1) * (parseDuration(aValue) - parseDuration(bValue));
      }
      
      if (typeof aValue === 'number') {
        return (sortOrder === 'asc' ? 1 : -1) * (aValue - bValue);
      }
      
      return (sortOrder === 'asc' ? 1 : -1) * (aValue.localeCompare(bValue));
    });
  };
  
// Health conditions that can be selected
export const HEALTH_CONDITIONS = [
  'Diabetes',
  'Hypertension', 
  'Heart Disease',
  'High Cholesterol',
  'Obesity',
  'Digestive Issues',
  'Gluten Intolerance',
  'Lactose Intolerance',
  'Kidney Disease',
  'GERD',
  'Food Allergies',
] as const;

// Meal types available
export const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { value: 'lunch', label: 'Lunch', emoji: '☀️' },
  { value: 'snacks', label: 'Snacks', emoji: '🍎' },
  { value: 'dinner', label: 'Dinner', emoji: '🌙' },
] as const;

// Dietary preferences
export const DIETARY_PREFERENCES = [
  { value: 'veg', label: 'Vegetarian', emoji: '🥬' },
  { value: 'nonveg', label: 'Non-Vegetarian', emoji: '🍖' },
] as const;

// Form step configurations
export const FORM_STEPS = {
  1: {
    title: 'Dietary Preferences',
    description: 'Tell us about your dietary needs and health considerations',
    fields: ['pref', 'issues'],
  },
  2: {
    title: 'Location',
    description: 'Where are you located? This helps us suggest regional foods.',
    fields: ['location'],
  },
  3: {
    title: 'Meal Type',
    description: 'What type of meal are you looking for?',
    fields: ['mealType'],
  },
} as const;

// Season information with descriptions
export const SEASON_INFO = {
  winter: {
    emoji: '❄️',
    description: 'Winter foods to keep you warm and nourished',
    colors: ['#4A90E2', '#7FB3D3'],
  },
  spring: {
    emoji: '🌸',
    description: 'Fresh spring foods for renewal and energy',
    colors: ['#7ED321', '#A8E6CF'],
  },
  summer: {
    emoji: '☀️',
    description: 'Cooling summer foods to beat the heat',
    colors: ['#F5A623', '#FFD93D'],
  },
  autumn: {
    emoji: '🍂',
    description: 'Autumn foods for harvest nutrition',
    colors: ['#D0021B', '#F8A5C2'],
  },
} as const;

// Utility functions
export const utils = {
  // Format location for API (city name or lat,lng)
  formatLocationForAPI: (location: { name: string; lat: number; lng: number } | string): string => {
    if (typeof location === 'string') return location;
    return `${location.lat},${location.lng}`;
  },

  // Get meal type greeting based on time of day
  getMealTypeByTime: (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    if (hour >= 16 && hour < 19) return 'snacks';
    return 'dinner';
  },

  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Truncate text with ellipsis
  truncate: (text: string, maxLength: number): string => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  },

  // Format nutrition value
  formatNutrition: (value: number, unit: string = 'g'): string => {
    return `${value}${unit}`;
  },

  // Get season emoji
  getSeasonEmoji: (season: string): string => {
    return SEASON_INFO[season as keyof typeof SEASON_INFO]?.emoji || '🍽️';
  },

  // Validate coordinate format (lat,lng)
  isValidCoordinate: (location: string): boolean => {
    const coordRegex = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
    return coordRegex.test(location);
  },
};
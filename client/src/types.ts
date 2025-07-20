// TypeScript types matching the backend API exactly
export type ReqBody = {
  pref: "veg" | "nonveg";
  issues: string[];
  location: string; // city or "lat,lng"
  mealType: "breakfast" | "lunch" | "snacks" | "dinner";
};

export type FoodDoc = {
  name: string;
  veg: boolean;
  mealTypes: string[];
  seasons: string[];
  goodFor: string[];
  avoidFor: string[];
  regions: string[];
  macros: {
    cal: number;
    protein: number;
    fat: number;
    carb: number;
  };
};

export type RecommendResponse = {
  season: string;
  foods: FoodDoc[];
};

// Location types for enhanced location features
export type LocationSuggestion = {
  name: string;
  lat: number;
  lng: number;
  country?: string;
};

export type GeolocationData = {
  latitude: number;
  longitude: number;
  city?: string;
};

// Form step type for multi-step form
export type FormStep = 1 | 2 | 3;

// Complete form data with additional UI state
export interface FormData extends ReqBody {
  currentStep: FormStep;
  locationSuggestions: LocationSuggestion[];
  selectedLocation?: LocationSuggestion;
  useCurrentLocation: boolean;
}

// Validation schema types
export type FormErrors = {
  [K in keyof ReqBody]?: string;
} & {
  general?: string;
};

// Season type
export type Season = "winter" | "spring" | "summer" | "autumn";
/**
 * @fileoverview Centralized TypeScript type definitions for the Kinetic Arena application.
 * All shared interfaces and type aliases are defined here to ensure
 * consistency across components and promote code readability.
 */

/** Represents a single item on the stadium concessions menu. */
export interface FoodItem {
  /** Unique identifier for the menu item. */
  id: number;
  /** Display name of the food item. */
  name: string;
  /** Price in USD. */
  price: number;
  /** A short description of the food item. */
  description: string;
  /** URL for the food item's display image. */
  image: string;
  /** Optional badge label (e.g., "Popular", "Spicy"). */
  badge?: string;
  /** Optional badge color token (e.g., "primary", "tertiary"). */
  badgeColor?: string;
}

/** Represents a single message in the Meetup Hub group chat. */
export interface ChatMessage {
  /** Unique identifier for the message. */
  id: number;
  /** Display name of the sender. */
  sender: string;
  /** The message text content. */
  text: string;
  /** Formatted time string (e.g., "8:42 PM"). */
  time: string;
  /** Whether the current user sent this message. */
  isOwn: boolean;
  /** Optional avatar URL for non-own messages. */
  avatar?: string;
  /** Color token for the sender's name display. */
  color: string;
}

/** Represents a navigation item in the sidebar and bottom nav. */
export interface NavItem {
  /** The route path (e.g., "/dashboard"). */
  path: string;
  /** The display label for the navigation link. */
  label: string;
  /** The Material Symbols icon name. */
  icon: string;
}

/** Represents a venue filter category in the Venue Navigator. */
export interface VenueFilter {
  /** Unique filter identifier. */
  id: string;
  /** Display label for the filter button. */
  label: string;
  /** Material Symbols icon name (empty string for "All"). */
  icon: string;
}

/** Represents a location pin on the venue map. */
export interface VenueLocation {
  /** Unique identifier for the venue. */
  id: number;
  /** Display name of the venue. */
  name: string;
  /** Additional detail text (e.g., "Level 2, Near Sec 205"). */
  detail: string;
  /** Material Symbols icon name. */
  icon: string;
  /** Color token for the icon display. */
  color: string;
  /** Category for filtering (e.g., "food", "ground"). */
  category: string;
}

/**
 * Cart state type: maps a FoodItem ID to its quantity.
 * @example { 1: 2, 3: 1 } // 2x Century Platter, 1x Pavilion Tikka Wrap
 */
export type CartState = Record<number, number>;

/** Validation error state for the login form. */
export interface LoginFormErrors {
  /** Error message for the mobile number field, or empty string if valid. */
  mobile: string;
  /** Error message for the password field, or empty string if valid. */
  password: string;
}

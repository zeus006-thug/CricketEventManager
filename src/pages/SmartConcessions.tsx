/**
 * @fileoverview SmartConcessions page component for the Kinetic Arena application.
 * Provides an interactive food ordering experience with a persistent shopping cart,
 * category-based filtering, and a checkout modal. Cart state is synchronized with
 * `localStorage` via the `useLocalStorage` custom hook so items survive navigation.
 */

import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { FoodItem, CartState } from '../types';

/**
 * Static menu data for the stadium concessions.
 * In a production app, this would be fetched from a backend API.
 */
const MENU_ITEMS: FoodItem[] = [
  {
    id: 1, name: 'The Century Platter', price: 24,
    description: 'A massive spread of sticky wings, thick-cut chips, onion rings, and our signature spicy mayo. Perfect for sharing while you watch the match.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdwvoqAPHad_pRaM_28QueCmu3wKvyWu88YAmCzMqci2XZ4G1JgQf1Dppw8QY6mnN7mPwDDj1AHT7hwfpj9PmF2ZzSa9b1T7YVlXULFTavsNWPrRNLbATJTm9gvpLRhTzYtLU-Yb6ju1X66zNfUUlbA5rP6roDnnbz9YBkXlQ9v9COGQps27-YfGxLXElZbgGXhagzRcryH_YIi4jVQnaKwZl0fy50fjKoHFL5hOECX_iLq0_3aY4qrnIXfa7jx0QkTA2bRPqNAeU',
    badge: 'Popular', badgeColor: 'primary',
  },
  {
    id: 2, name: 'Steak & Ale Pie', price: 12,
    description: 'Classic British style pie with slow-cooked beef chunks in a rich dark ale gravy, encased in a flaky, golden pastry crust.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-6mRLI7ZJxfkkUB2B2uMp2iGog4wpycyKlNX0PFVzbPeIC4cUICqFsIsSSbHZ74KgK68OWHWZ65Dmf9uoaSAmfW3Ve2pXnAzHVHnxb0MkgXSlnmNfWOPWnm_-g-0w_GMzEvlvbaJ9v8qK5P_DfJIGwN_6dNsZTZcM_EwumbAPlNQ7Wh1WaRxqCrpoJjx84k8fmmcWJ87h4r1lqw9mzhG01a7BwZKrdk0_GdR3kEF7OEVuAmp_AVGT0uNiWB5v7xOQBdlKYtjDDfI',
  },
  {
    id: 3, name: 'Pavilion Tikka Wrap', price: 14,
    description: 'Char-grilled chicken tikka pieces wrapped in a warm flatbread with crisp lettuce, red onions, and our cooling mint yogurt sauce.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8g-CvZ8Oleub0xktnzkSbnQifOfCrDXpl161FviBR0sVYvpXKB5QtmZa65nKp_L6L161dfiz3WXrxP8jAXe1Y1vLipHUtS-DRG_TjPpZiNzucfOY4zeF0t8ZMUR3GXRss6q0uWXr8MTPVRz3ghLAO67JDnHcA3iBGobInYfrA57_G7q4rUQsDfpxKiiRKd9rmNtiatYwZA6-NKp9WEmq5doKGEp_bU0b2TDIlB-TgWZoX1pr8V6VjxR7r90ApeStM56yDXKl2QPQ',
    badge: 'Spicy', badgeColor: 'tertiary',
  },
];

/** Available category filter options for menu items. */
const CATEGORIES = ['All Items', 'Hot Food', 'Beverages', 'Snacks'] as const;

/**
 * Adds an item to the cart by incrementing its quantity.
 * If the item doesn't exist in the cart, it's initialized with quantity 1.
 *
 * @param cart - The current cart state.
 * @param itemId - The ID of the item to add.
 * @returns A new cart state with the updated quantity.
 */
function addItemToCart(cart: CartState, itemId: number): CartState {
  return { ...cart, [itemId]: (cart[itemId] || 0) + 1 };
}

/**
 * Removes one unit of an item from the cart.
 * If the quantity reaches 0, the item is removed entirely from the cart.
 *
 * @param cart - The current cart state.
 * @param itemId - The ID of the item to remove.
 * @returns A new cart state with the updated quantity.
 */
function removeItemFromCart(cart: CartState, itemId: number): CartState {
  const next = { ...cart };
  if (next[itemId] > 1) {
    next[itemId]--;
  } else {
    delete next[itemId];
  }
  return next;
}

/**
 * Calculates the total number of all items currently in the cart.
 *
 * @param cart - The current cart state.
 * @returns The sum of all item quantities.
 */
function calculateTotalItems(cart: CartState): number {
  return Object.values(cart).reduce((sum, count) => sum + count, 0);
}

/**
 * Calculates the total price of all items currently in the cart.
 *
 * @param cart - The current cart state.
 * @param menuItems - The full menu to look up prices.
 * @returns The total price in USD.
 */
function calculateTotalPrice(cart: CartState, menuItems: FoodItem[]): number {
  return Object.entries(cart).reduce((sum, [id, count]) => {
    const item = menuItems.find((m) => m.id === Number(id));
    return sum + (item ? item.price * count : 0);
  }, 0);
}

/**
 * SmartConcessions renders the stadium food ordering interface.
 * It displays a filterable menu grid, a persistent shopping cart (via localStorage),
 * and a checkout modal for order confirmation.
 *
 * Key features:
 * - Cart persistence across page navigation using `useLocalStorage`.
 * - Memoized price/quantity computations for performance.
 * - Responsive layout with mobile cart bar and desktop floating action button.
 * - Checkout modal with order summary and simulated order placement.
 *
 * @returns The rendered SmartConcessions page component.
 */
export default function SmartConcessions(): React.JSX.Element {
  const [cart, setCart] = useLocalStorage<CartState>('kinetic_cart', {});
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [showCheckout, setShowCheckout] = useState(false);

  /** Memoized total item count to avoid recalculating on every render. */
  const totalItems = useMemo(() => calculateTotalItems(cart), [cart]);

  /** Memoized total price to avoid recalculating on every render. */
  const totalPrice = useMemo(() => calculateTotalPrice(cart, MENU_ITEMS), [cart]);

  /** Handles adding an item to the cart. */
  const handleAddToCart = (itemId: number): void => {
    setCart((prev) => addItemToCart(prev, itemId));
  };

  /** Handles removing an item from the cart. */
  const handleRemoveFromCart = (itemId: number): void => {
    setCart((prev) => removeItemFromCart(prev, itemId));
  };

  /** Handles placing the order: clears cart and shows confirmation. */
  const handlePlaceOrder = (): void => {
    setCart({});
    setShowCheckout(false);
    alert('🎉 Order placed! Head to Counter #12 in 15 minutes.');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Express
          </span>
          <span className="text-on-surface-variant font-body text-sm">Pickup Available</span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tight uppercase leading-none">
          Concessions
        </h1>
        <p className="text-secondary font-body text-lg mt-2">Skip the queue. Order now, collect at Counter #12.</p>
      </section>

      {/* Pickup Banner */}
      <section className="relative rounded-[2rem] overflow-hidden bg-surface-container-highest p-6 md:p-10 border border-outline-variant/15 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">location_on</span>
            <span>Your Designated Pickup</span>
          </div>
          <div className="font-headline text-6xl md:text-8xl font-black text-on-surface">
            COUNTER #12
          </div>
          <div className="text-on-surface-variant font-body max-w-md">
            Located on the North Concourse, just behind Section 402. Your order will be ready in approximately <span className="text-on-surface font-bold">15 minutes</span>.
          </div>
        </div>
        <div className="relative z-10 w-full md:w-auto flex-shrink-0 flex justify-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary border-dashed flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(165,255,184,0.2)]">
            <span className="material-symbols-outlined text-6xl md:text-8xl text-primary" style={{ fontVariationSettings: "'wght' 700" }}>qr_code_scanner</span>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="flex overflow-x-auto pb-4 hide-scrollbar gap-3 -mx-4 px-4 md:mx-0 md:px-0" role="tablist" aria-label="Menu categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-secondary text-on-secondary scale-105'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Food Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENU_ITEMS.map((item) => {
          const qty = cart[item.id] || 0;
          return (
            <article key={item.id} className="group relative rounded-3xl overflow-hidden bg-surface-container-low flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <div className="h-48 relative overflow-hidden">
                <img alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.image} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" aria-hidden="true" />
                {item.badge && (
                  <div className={`absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-xs font-bold text-${item.badgeColor} flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-2xl font-bold text-on-surface uppercase">{item.name}</h3>
                  <span className="font-headline text-xl text-primary font-black">${item.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm font-body line-clamp-2">{item.description}</p>
                <div className="mt-auto pt-4">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      aria-label={`Add ${item.name} to order`}
                      className="w-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary font-bold py-3 rounded-xl transition-colors duration-300 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                      Add to Order
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-primary/10 rounded-xl p-1" role="group" aria-label={`${item.name} quantity controls`}>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary flex items-center justify-center font-bold text-xl transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="font-headline font-bold text-xl text-primary" aria-live="polite">{qty}</span>
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="w-10 h-10 rounded-lg bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center font-bold text-xl transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Desktop FAB Cart */}
      {totalItems > 0 && (
        <div className="hidden md:flex fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowCheckout(true)}
            aria-label={`View cart with ${totalItems} items`}
            className="bg-primary text-on-primary w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(165,255,184,0.3)] hover:scale-105 transition-transform relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 700" }}>shopping_cart</span>
            <span className="absolute -top-2 -right-2 bg-tertiary text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-background">{totalItems}</span>
          </button>
        </div>
      )}

      {/* Mobile Cart Bar */}
      {totalItems > 0 && (
        <div className="md:hidden fixed bottom-24 left-4 right-4 z-40">
          <div className="bg-surface-container-highest/95 backdrop-blur-xl rounded-xl p-4 flex justify-between items-center border border-outline-variant/20 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <div>
                <div className="text-on-surface font-bold text-sm">{totalItems} Item{totalItems > 1 ? 's' : ''} Added</div>
                <div className="text-primary font-headline font-black">${totalPrice.toFixed(2)}</div>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide cursor-pointer hover:bg-primary-container transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={() => setShowCheckout(false)}>
          <div className="bg-surface-container rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 id="checkout-title" className="font-headline text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Your Order
            </h2>
            <div className="space-y-4 mb-6">
              {Object.entries(cart).map(([id, count]) => {
                const item = MENU_ITEMS.find((m) => m.id === Number(id));
                if (!item) return null;
                return (
                  <div key={id} className="flex justify-between items-center">
                    <div>
                      <span className="font-body font-bold text-on-surface">{item.name}</span>
                      <span className="text-on-surface-variant text-sm ml-2">×{count}</span>
                    </div>
                    <span className="font-headline font-bold text-primary">${(item.price * count).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center mb-6">
              <span className="font-headline font-bold text-lg text-on-surface">Total</span>
              <span className="font-headline font-black text-2xl text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * @fileoverview Custom React hooks for the Kinetic Arena application.
 * Encapsulates reusable stateful logic to promote separation of concerns
 * and improve testability across components.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * A generic hook that synchronizes React state with `localStorage`.
 * Reads the initial value from `localStorage` on mount, and writes
 * back to `localStorage` whenever the state changes.
 *
 * @template T - The type of the stored value.
 * @param key - The `localStorage` key to store the value under.
 * @param defaultValue - The fallback value if nothing is found in storage.
 * @returns A stateful value and a setter function, identical to `useState`.
 *
 * @example
 * const [cart, setCart] = useLocalStorage<CartState>('kinetic_cart', {});
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to parse key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to write key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * A hook for validating text input fields with configurable rules.
 * Returns the current error message (empty string if valid) and a
 * validation function that can be triggered imperatively.
 *
 * @param value - The current input value to validate.
 * @param rules - An array of validation rule objects.
 * @returns An object containing the error string and a `validate` function.
 *
 * @example
 * const { error, validate } = useInputValidation(mobile, [
 *   { test: (v) => v.length > 0, message: 'Mobile number is required.' },
 *   { test: (v) => /^\+?\d{7,15}$/.test(v), message: 'Enter a valid phone number.' },
 * ]);
 */
export function useInputValidation(
  value: string,
  rules: Array<{ test: (val: string) => boolean; message: string }>
): { error: string; validate: () => boolean } {
  const [error, setError] = useState('');

  const validate = useCallback((): boolean => {
    for (const rule of rules) {
      if (!rule.test(value)) {
        setError(rule.message);
        return false;
      }
    }
    setError('');
    return true;
  }, [value, rules]);

  // Clear error when user starts typing again
  useEffect(() => {
    if (error && value) {
      setError('');
    }
  }, [value]);

  return { error, validate };
}

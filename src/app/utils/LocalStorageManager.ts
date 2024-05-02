export default class LocalStorageManager {
  // Method to read data from localStorage
  static get(key: string): string | null {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  // Method to write data to localStorage
  static set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  // Method to remove data from localStorage
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }

  // Method to clear all data from localStorage
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

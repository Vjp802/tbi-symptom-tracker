import type { SymptomLog } from '../types';

const STORAGE_KEY = 'tbi-symptom-logs';

export const saveToLocalStorage = (logs: SymptomLog[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};

export const loadFromLocalStorage = (): SymptomLog[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return [];
    }
};

export const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear localStorage:', error);
    }
};

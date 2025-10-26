import { useState } from 'react';
import { deepMerge } from '../utils/deepMerge';

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  migrate?: (stored: any) => T
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Aplica a migração se fornecida, caso contrário, faz um deep merge.
        return migrate ? migrate(parsed) : deepMerge(defaultValue, parsed);
      }
      // Nenhum item encontrado, define o valor padrão no storage.
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      console.error(`[useLocalStorage] Erro ao ler "${key}":`, err);
      // Em caso de erro, reverte para o padrão.
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Erro ao salvar configurações no localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
}

// Este arquivo fornece ao TypeScript definições de tipo para módulos
// que são carregados via importmap no index.html e para variáveis globais.
// Isso permite a verificação de tipos em um ambiente de desenvolvimento sem um bundler tradicional.

// Suprime erros para módulos carregados de uma CDN via importmap.
// Isso torna os módulos do tipo `any`, o que é um compromisso necessário para fazer o código compilar
// neste ambiente específico, mas elimina a verificação de tipos para esses módulos.
declare module 'react';
declare module 'react-dom/client';
declare module 'jspdf';
declare module 'html2canvas';
declare module '@heroicons/react/24/outline';
declare module '@heroicons/react/24/solid';
declare module '@google/genai';

// Declara a variável 'process' no escopo global para que 'process.env.API_KEY'
// possa ser acessado sem erros de compilação. O uso de 'declare global'
// evita conflitos de 'redeclare' com outras possíveis definições.

declare global {
  // Fix: Augment the NodeJS namespace to add the API_KEY to process.env.
  // This avoids redeclaring the 'process' variable, which was causing a conflict.
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }

  // Adiciona a definição correta do objeto `aistudio` à interface Window
  // para suportar a seleção de chave de API baseada na plataforma, necessária para ambientes de navegador.
  // Fix: To resolve "Duplicate identifier" errors, the separate 'AIStudio' interface was removed
  // and its type is now defined inline within the Window interface.
  interface Window {
    aistudio?: {
      hasSelectedApiKey(): Promise<boolean>;
      openSelectKey(): Promise<void>;
    };
  }
}

// Adiciona uma exportação vazia para tratar este arquivo como um módulo.
// Isso é necessário para que 'declare global' funcione corretamente.
export {};
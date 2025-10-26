import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  DocumentCategory,
  Backup,
  AiInfo,
  Server,
  LegalBasis,
  DocumentModel,
  FormField,
  AnalysisResult,
  ChatMessage,
  GeneratedMetadata,
  Judge
} from './types';
import {
  INITIAL_DOCUMENT_MODELS,
  INITIAL_AIS,
  SettingsIcon,
  BookOpenIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  DocumentCheckIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  KeyIcon,
  ScaleIcon,
  PencilSquareIcon,
  ArrowsRightLeftIcon,
  GavelIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  APP_VERSION,
  MIGRATION_VERSION,
  DEFAULT_SYSTEM_INSTRUCTION,
  DEFAULT_DOCUMENT_HEADER_HTML,
} from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import SettingsModal from './components/SettingsModal';
import LegalBasisModal from './components/LegalBasisModal';
import TextFormatter from './components/TextFormatter';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import FormColumn from './components/FormColumn';
import ResultColumn from './components/ResultColumn';
// Fix: Updated import to use GoogleGenAI from @google/genai as per the latest SDK guidelines.
import { GoogleGenAI, Type, Chat } from '@google/genai';
import { deepMerge } from './utils/deepMerge';

// ==================== VALORES INICIAIS ====================

const initialServers: Server[] = [
    { id: 'adenise_salgado', name: 'Adenise de Jesus Bueno Stopa Salgado', role: 'Oficial Judiciário', matricula: 'PJPI: 24661-1' },
    { id: 'adhy_pascoal', name: 'Adhy de Magalhães Pascoal', role: 'Oficial Judiciário' },
    { id: 'daniela_otoni', name: 'Daniela Marília Otoni', role: 'Assistente Administrativo' },
    { id: 'gabriel_garcia', name: 'Gabriel Oliveira Garcia', role: 'Estagiário(a)' },
    { id: 'gisela_mateus', name: 'Gisela Calais Mateus', role: 'Estagiário(a)' },
    { id: 'henrique_santos', name: 'Henrique Oliveira dos Santos', role: 'Assistente Administrativo' },
    { id: 'joao_leal', name: 'João Fernandes Leal', role: 'Oficial Judiciário', matricula: '10.20997-3' },
    { id: 'jose_ferreira', name: 'José Geraldo Ferreira', role: 'Gerente de Secretaria', matricula: 'PJPI-77099' },
    { id: 'katia_souza', name: 'Kátia Cilene Felipe de Souza', role: 'Oficial Judiciário' },
    { id: 'kaua_oliveira', name: 'Kaua Schuenker Souza Oliveira', role: 'Estagiário(a)' },
    { id: 'kyvia_stopa', name: 'Kyvia Tassi Stopa', role: 'Oficial Judiciário' },
    { id: 'natalia_pascoal', name: 'Natália Pacheco Alves de Magalhães Pascoal', role: 'Gerente de Contadoria', matricula: 'PJPI-12.770-4' },
    { id: 'sirlene_silva', name: 'Sirlene de Roma Silva', role: 'Oficial Judiciário', matricula: 'PJPI-22167-1' },
].sort((a, b) => a.name.localeCompare(b.name));

const initialLegalBases: LegalBasis[] = [
  {
    id: 'certidoes_1',
    title: 'Certidões',
    content:
      'A certidão é um ato pelo qual o servidor público atesta um fato ou uma situação jurídica, com base em documentos e processos sob sua responsabilidade...',
  },
  {
    id: 'atos_1',
    title: 'Atos Ordinatórios',
    content:
      'Os atos ordinatórios são determinações de caráter administrativo, sem conteúdo decisório...',
  },
  {
    id: 'refs_1',
    title: 'Referências Principais',
    content:
      '• Código de Processo Civil (Lei nº 13.105/2015)\n• Código de Normas da CGJ/MG\n• Provimentos e Resoluções do TJMG',
  },
  {
    id: 'nota_1',
    title: 'Nota',
    content:
      'Este é um texto informativo. Para consultas específicas, verifique sempre a legislação atualizada.',
  },
];

const defaultSettings: Settings = {
  theme: 'light',
  servers: initialServers,
  defaultServerId: 'joao_leal',
  judges: [],
  defaultJudgeId: null,
  defaultLocation: 'Comarca de Raul Soares, MG',
  documentModels: INITIAL_DOCUMENT_MODELS,
  ais: INITIAL_AIS,
  appVersion: APP_VERSION,
  customSystemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
  legalBases: initialLegalBases,
  favorites: [],
  defaultFontFamily: 'Roboto, sans-serif',
  documentHeaderHtml: DEFAULT_DOCUMENT_HEADER_HTML,
  deletedDefaultModels: [],
  lastMigrationVersion: '0.0.0',
};

const BACKUP_KEY = 'legal-doc-backups-v1';
const MANUAL_BACKUP_KEY = 'legal-doc-manual-backups-v1';

// ==================== LÓGICA DE MIGRAÇÃO ====================

function migrateSettings(stored: any): Settings {
    if (!stored || typeof stored !== 'object') {
        return { ...defaultSettings, lastMigrationVersion: MIGRATION_VERSION };
    }

    // Cria uma cópia profunda das configurações padrão como base segura.
    const finalSettings = JSON.parse(JSON.stringify(defaultSettings));

    // Mescla propriedades de nível superior (não-objetos/não-arrays), priorizando os dados do usuário.
    Object.keys(defaultSettings).forEach(key => {
        if (stored[key] !== undefined && typeof stored[key] !== 'object') {
            finalSettings[key] = stored[key];
        }
    });
     // Garante que prompts e cabeçalhos customizados sejam mantidos
    finalSettings.customSystemInstruction = stored.customSystemInstruction || defaultSettings.customSystemInstruction;
    finalSettings.documentHeaderHtml = stored.documentHeaderHtml || defaultSettings.documentHeaderHtml;

    // Lógica de fusão inteligente para listas, que preserva adições/modificações do usuário e respeita exclusões.
    const mergeLists = <T extends { value?: string; id?: string }>(
        userList: T[] | undefined,
        defaultList: T[],
        deletedDefaultKeys: string[] | undefined,
        keyProp: 'value' | 'id'
    ): T[] => {
        const safeUserList = Array.isArray(userList) ? userList : [];
        const safeDeletedKeys = Array.isArray(deletedDefaultKeys) ? deletedDefaultKeys : [];
        const finalMap = new Map<string, T>();

        // 1. Adiciona todos os itens do usuário primeiro. Eles têm prioridade.
        safeUserList.forEach(item => {
            const key = (item as any)[keyProp];
            if (key) finalMap.set(key, item);
        });

        // 2. Adiciona novos itens padrão que o usuário não tem e não excluiu.
        defaultList.forEach(defaultItem => {
            const key = (defaultItem as any)[keyProp];
            if (key && !finalMap.has(key) && !safeDeletedKeys.includes(key)) {
                finalMap.set(key, defaultItem);
            }
        });

        // 3. Garante que qualquer item padrão explicitamente excluído seja removido.
        safeDeletedKeys.forEach(deletedKey => {
            const isDefault = defaultList.some(item => (item as any)[keyProp] === deletedKey);
            if (isDefault) {
                finalMap.delete(deletedKey);
            }
        });

        return Array.from(finalMap.values());
    };

    // Aplica a fusão inteligente para Modelos de Documentos
    const userDeletedModels = stored.deletedDefaultModels;
    for (const category of Object.values(DocumentCategory)) {
        finalSettings.documentModels[category] = mergeLists(
            stored.documentModels?.[category],
            INITIAL_DOCUMENT_MODELS[category] || [],
            userDeletedModels,
            'value'
        ).sort((a, b) => a.label.localeCompare(b.label));
    }
    finalSettings.deletedDefaultModels = userDeletedModels || [];

    // Para outras listas, idealmente teríamos listas de 'deleted' também.
    // Por enquanto, esta lógica preserva itens do usuário e adiciona novos itens padrão.
    finalSettings.ais = mergeLists(stored.ais, INITIAL_AIS, [], 'id');
    finalSettings.servers = mergeLists(stored.servers, defaultSettings.servers, [], 'id');
    finalSettings.legalBases = mergeLists(stored.legalBases, defaultSettings.legalBases, [], 'id');
    finalSettings.judges = stored.judges || []; // Manter juízes customizados

    // Garante que listas simples como 'favorites' sejam preservadas.
    finalSettings.favorites = stored.favorites || [];

    // Persiste a última seleção do usuário
    finalSettings.lastUsedCategory = stored.lastUsedCategory;
    finalSettings.lastUsedModelValue = stored.lastUsedModelValue;

    // Atualiza as informações de versão.
    finalSettings.appVersion = APP_VERSION;
    finalSettings.lastMigrationVersion = MIGRATION_VERSION;

    return finalSettings;
}

// ==================== BACKUP HANDLING ====================

const loadBackupsFromStorage = (key: string): Backup[] => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed)
      ? parsed.filter((b) => b && b.date && b.settings)
      : [];
  } catch (e) {
    console.error(`Erro ao carregar backups da chave "${key}":`, e);
    localStorage.removeItem(key);
    return [];
  }
};

// ==================== NOTIFICAÇÃO ====================

const Notification = ({
  message,
  isVisible,
}: {
  message: string;
  isVisible: boolean;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-[100] transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-lg flex items-center dark:bg-green-900/80 dark:text-green-200 dark:border-green-600">
        <CheckCircleIcon className="h-6 w-6 mr-3 text-green-600 dark:text-green-400" />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

function App() {
  const [settings, setSettings] = useLocalStorage<Settings>(
    'legal-doc-settings-v1',
    defaultSettings,
    migrateSettings
  );

  const [view, setView] = useState<'prompt' | 'formatter'>('prompt');
  
  // State lifted from FormColumn to preserve it across navigation
  const [formMode, setFormMode] = useState<'model' | 'analysis'>('model');
  const [currentCategory, setCurrentCategory] = useState<DocumentCategory>(() => {
    // Tenta carregar a última categoria usada, se for válida; senão, usa o padrão.
    const lastCategory = settings.lastUsedCategory;
    if (lastCategory && Object.values(DocumentCategory).includes(lastCategory)) {
        return lastCategory;
    }
    return DocumentCategory.CERTIDAO;
  });
  const [currentModelValue, setCurrentModelValue] = useState<string>(() => {
    const lastCategory = settings.lastUsedCategory;
    const lastModel = settings.lastUsedModelValue;
    // Verifica se o último modelo salvo pertence à última categoria salva e se ainda existe
    if (lastCategory && lastModel && settings.documentModels[lastCategory]?.some(m => m.value === lastModel)) {
        return lastModel;
    }
    // Fallback para o primeiro modelo da categoria atual
    const categoryToUse = lastCategory || DocumentCategory.CERTIDAO;
    return settings.documentModels[categoryToUse]?.[0]?.value || '';
  });
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const [generatedText, setGeneratedText] = useState('');
  const [batchResults, setBatchResults] = useState<string[]>([]);
  const [generatedMetadata, setGeneratedMetadata] = useState<GeneratedMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedBy, setGeneratedBy] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [manualBackups, setManualBackups] = useState<Backup[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLegalBasisModalOpen, setIsLegalBasisModalOpen] = useState(false);
  const [restoringBackupDate, setRestoringBackupDate] = useState<string | null>(
    null
  );
  const [deletingBackupDates, setDeletingBackupDates] = useState<
    Record<string, boolean>
  >({});
  const [notification, setNotification] = useState<{
    message: string;
    isVisible: boolean;
  } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState('');
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatSessionRef = useRef<Chat | null>(null);
  const cancellationRef = useRef(false);
  // Fix: Added a ref to track if a backup has already been created for the current session.
  const backupCreatedForSession = useRef(false);

  const handleApiError = (e: any, type: 'generation' | 'analysis') => {
    if (cancellationRef.current) return;
    console.error(`Erro de API (${type}):`, e);

    const isKeyError = e.message?.includes("API Key must be set") || 
                       e.message?.includes("API Key not valid") || 
                       e.message?.includes("Requested entity was not found");
    
    let errorMessage;

    if (isKeyError) {
        errorMessage = "A chave de API é inválida, expirou ou não foi encontrada. Por favor, selecione uma chave válida para continuar.";
        if (window.aistudio) {
            // Automatically prompt for a new key
            window.aistudio.openSelectKey().catch(selectKeyError => {
                console.error("Erro ao abrir o seletor de chave:", selectKeyError);
                // Even if opening the dialog fails, keep the user-facing error message consistent.
            });
        } else {
            errorMessage += " Para mais detalhes sobre chaves e cobrança, consulte ai.google.dev/gemini-api/docs/billing."
        }
    } else {
        errorMessage = type === 'generation' ? `Erro ao gerar texto: ${e.message}` : `Erro na análise: ${e.message}`;
    }
    
    if (type === 'generation') {
        setError(errorMessage);
    } else {
        setAnalysisError(errorMessage);
    }
  };

    // Effect to initialize/reset form data based on mode and model selection
    useEffect(() => {
        if (formMode === 'analysis') {
            setFormData({}); // Clear form when in analysis mode
            return;
        }

        const model = (settings.documentModels[currentCategory] || []).find(m => m.value === currentModelValue);
        if (!model) {
            setFormData({});
            return;
        }

        const initialFormData: { [key:string]: string } = {};
        const defaultServer = settings.servers.find(s => s.id === settings.defaultServerId) || settings.servers[0];
        const defaultJudge = settings.judges.find(j => j.id === settings.defaultJudgeId);
        
        const today = new Date().toISOString().slice(0, 10);
        
        model.fields.forEach(field => {
            if (field.type === 'date') {
                initialFormData[field.id] = field.defaultValue || today;
            } else if (field.id === 'serverName' && defaultServer) {
                initialFormData[field.id] = defaultServer.name;
            } else if (field.id === 'serverRole' && defaultServer) {
                initialFormData[field.id] = defaultServer.role;
            } else if (field.id === 'nome_juiz' && defaultJudge) {
                initialFormData[field.id] = defaultJudge.id;
            } else if (field.id === 'documentLocation') {
                initialFormData[field.id] = settings.defaultLocation;
            } else {
                initialFormData[field.id] = field.defaultValue || '';
            }
        });

        setFormData(initialFormData);
        
    }, [formMode, currentCategory, currentModelValue, settings]);

  // ============= AUTO BACKUP =============
  useEffect(() => {
    if (backupCreatedForSession.current || !settings) return;

    const today = new Date().toISOString().split('T')[0];
    const existing = loadBackupsFromStorage(BACKUP_KEY);

    if (!existing.some((b) => b.date === today)) {
      const newBackup: Backup = { date: today, settings };
      const updated = [...existing, newBackup].slice(-30);
      localStorage.setItem(BACKUP_KEY, JSON.stringify(updated));
    }

    backupCreatedForSession.current = true;
  }, [settings]);

  // ============= MODAL: CARREGAR BACKUPS =============
  useEffect(() => {
    if (isSettingsModalOpen) {
      setBackups(loadBackupsFromStorage(BACKUP_KEY));
      setManualBackups(loadBackupsFromStorage(MANUAL_BACKUP_KEY));
    }
  }, [isSettingsModalOpen]);

  // ============= TEMA ESCURO =============
  useEffect(() => {
    if (settings) {
        document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    }
  }, [settings?.theme]);

  // ============= NOTIFICAÇÃO =============
  useEffect(() => {
    if (notification?.isVisible) {
      const timer = setTimeout(() => {
        setNotification((n) => (n ? { ...n, isVisible: false } : null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // ==================== LÓGICA DE NAVEGAÇÃO ====================
  const handleCategoryChange = (category: DocumentCategory, modelValue?: string) => {
    const firstModelInNewCategory = settings.documentModels[category]?.[0];
    const newModelValue = modelValue || firstModelInNewCategory?.value || '';

    setCurrentCategory(category);
    setCurrentModelValue(newModelValue);
    setFormMode('model');

    // Salva a seleção nas configurações para persistência
    setSettings(prevSettings => ({
        ...prevSettings,
        lastUsedCategory: category,
        lastUsedModelValue: newModelValue,
    }));
  };

  // ==================== IA GOOGLE & GERAÇÃO EM LOTE ====================

  const checkAndPromptApiKey = async (): Promise<boolean> => {
    if (!window.aistudio) {
        const errorMsg = "A IA integrada não funcionará fora do ambiente de desenvolvimento pretendido, pois não é possível selecionar uma chave de API. Para mais detalhes sobre chaves e cobrança, consulte ai.google.dev/gemini-api/docs/billing.";
        setError(errorMsg);
        setAnalysisError(errorMsg);
        return false;
    }

    try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await window.aistudio.openSelectKey();
        }
        // Per the guideline, assume success after this point to avoid race conditions.
        // We will rely on the API call's error handling if the key is still invalid.
        return true;
    } catch (e: any) {
        console.error("Erro no fluxo de chave de API:", e);
        const errorMsg = "Ocorreu um erro durante a seleção da chave de API. A seleção pode ter sido cancelada. Por favor, tente a operação novamente.";
        setError(errorMsg);
        setAnalysisError(errorMsg);
        return false;
    }
  }

    const handleStopGeneration = () => {
        cancellationRef.current = true;
        setIsLoading(false);
        setError("Geração cancelada pelo usuário.");
        setGeneratedText('');
        setBatchResults([]);
        setGeneratedMetadata(null);
        setChatHistory([]);
        chatSessionRef.current = null;
    };

    const handleClearResult = () => {
        setGeneratedText('');
        setBatchResults([]);
        setGeneratedMetadata(null);
        setError('');
        setGeneratedBy(null);
        setGroundingSources([]);
        setChatHistory([]);
        chatSessionRef.current = null;
      };

    const handleBatchGenerate = (model: DocumentModel, formData: { [key: string]: string }) => {
        handleClearResult();
        setIsLoading(true);
    
        setTimeout(() => {
            try {
                let results: string[] = [];
                const template = formData.template;
    
                if (!template) {
                    throw new Error("O modelo do documento (template) não foi encontrado.");
                }
    
                if (model.value === 'lote_certidao_aceite_pericia') {
                    const { nome_perito, data_pericia, dados_planilha, data_sistema_extenso } = formData;
    
                    if (!nome_perito || !data_pericia || !dados_planilha || !data_sistema_extenso) {
                        throw new Error("Todos os campos de data, perito e planilha são obrigatórios para este modelo.");
                    }
    
                    const formatDateToFullText = (dateString: string) => {
                        if (!dateString) return '';
                        // Using UTC to prevent timezone issues where the date could shift by one day
                        const [year, month, day] = dateString.split('-').map(Number);
                        const date = new Date(Date.UTC(year, month - 1, day));
                        const monthName = date.toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
                        return `${date.getUTCDate()} de ${monthName} de ${date.getUTCFullYear()}`;
                    };
                
                    const formattedDataPericiaExtenso = formatDateToFullText(data_pericia);
    
                    const lines = dados_planilha.trim().split('\n').filter(line => line.trim() !== '');
                    
                    const lineRegex = /^([\d.-]+)\s+(.+?)\s+([\d:]{4,5})$/;

                    results = lines.map(line => {
                        const trimmedLine = line.trim();
                        const match = trimmedLine.match(lineRegex);
                        let processo: string | undefined;
                        let autor: string | undefined;
                        let horario: string | undefined;

                        if (match && match.length >= 4) {
                            processo = match[1];
                            autor = match[2];
                            horario = match[3];
                        } else {
                            const parts = trimmedLine.split('\t');
                            if (parts.length >= 3 && parts[0].match(/^[\d.-]+$/) && parts[2].match(/^[\d:]{4,5}$/)) {
                                processo = parts[0];
                                autor = parts[1];
                                horario = parts[2];
                            } else {
                                console.warn(`Pulando linha mal formatada (não corresponde ao formato "PROCESSO AUTOR HORA"): ${trimmedLine}`);
                                return null;
                            }
                        }
                        
                        const hora = horario ? parseInt(horario.split(':')[0], 10).toString() : '';

                        let resultText = template;
                        resultText = resultText.replace(/{{NOME_PERITO}}/g, nome_perito || '');
                        resultText = resultText.replace(/{{PROCESSO}}/g, processo || '');
                        resultText = resultText.replace(/{{AUTOR}}/g, autor || '');
                        resultText = resultText.replace(/{{DATA_EXTENSO}}/g, formattedDataPericiaExtenso || '');
                        resultText = resultText.replace(/{{HORARIO}}/g, hora || '');
                        resultText = resultText.replace(/{{DATA_SISTEMA_EXTENSO}}/g, data_sistema_extenso || '');
                        return resultText;
                    }).filter((r): r is string => r !== null);
    
                } else { // Generic CSV logic for other models (if any)
                    const { csvData } = formData;
                     if (!csvData) {
                        throw new Error("Os dados da planilha (CSV) não foram encontrados.");
                    }

                    const parseCsvLine = (line: string): string[] => {
                        const values = [];
                        let currentVal = '';
                        let inQuotes = false;
                        for (let i = 0; i < line.length; i++) {
                            const char = line[i];
                            if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
                                inQuotes = !inQuotes;
                            } else if (char === ',' && !inQuotes) {
                                values.push(currentVal);
                                currentVal = '';
                            } else {
                                currentVal += char;
                            }
                        }
                        values.push(currentVal);
                        return values.map(v => v.trim().replace(/^"|"$/g, ''));
                    };
        
                    const lines = csvData.trim().split('\n').filter(line => line.trim() !== '');
                    if (lines.length < 2) {
                        throw new Error("CSV inválido. São necessárias pelo menos duas linhas (cabeçalho e uma linha de dados).");
                    }
        
                    const headers = parseCsvLine(lines[0]);
                    const rows = lines.slice(1);
        
                    results = rows.map(rowStr => {
                        const values = parseCsvLine(rowStr);
                        let resultText = template;
                        headers.forEach((header, i) => {
                            const regex = new RegExp(`{{${header}}}`, 'g');
                            resultText = resultText.replace(regex, values[i] || '');
                        });
                        return resultText;
                    });
                }
    
                setBatchResults(results);
                setGeneratedBy('Geração em Lote (Local)');
    
            } catch (e: any) {
                setError(`Erro ao processar o lote: ${e.message}`);
                setBatchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 50);
    };

  const handleLocalGeneration = (text: string) => {
    handleClearResult();
    setGeneratedText(text);
    setGeneratedBy('Geração Automática (Local)');
    setIsLoading(false);
  };

  const handleIntegratedGeneration = async (ai: AiInfo, prompt: string) => {
    cancellationRef.current = false;
    handleClearResult();
    setIsLoading(true);

    const keyIsSet = await checkAndPromptApiKey();
    if (!keyIsSet) {
        setIsLoading(false);
        return;
    }
    
    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const config: any = {
            systemInstruction: settings.customSystemInstruction,
            responseMimeType: 'application/json',
        };

        if (ai.isSearchGrounded) {
            config.tools = [{googleSearch: {}}];
            delete config.responseMimeType;
        }

        const response = await genAI.models.generateContent({
            model: ai.modelName,
            contents: prompt,
            config,
        });
        
        if (cancellationRef.current) return;

        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        }
        const parsed = JSON.parse(jsonText);
        
        setGeneratedText(parsed.texto_documento || '');
        setGeneratedMetadata({
            metadados: parsed.metadados,
            evidencias: parsed.evidencias,
            pendencias: parsed.pendencias
        });
        setGeneratedBy(ai.name);

        if (ai.isSearchGrounded) {
            setGroundingSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
        }

        const chat = genAI.chats.create({ 
            model: ai.modelName, 
            config,
            history: [
                { role: 'user', parts: [{ text: prompt }] },
                { role: 'model', parts: [{ text: jsonText }] } 
            ]
        });
        chatSessionRef.current = chat;
        
        setChatHistory([
            { role: 'user', content: 'Gere o documento inicial.' },
            { role: 'model', content: parsed.texto_documento || '' }
        ]);

    } catch (e: any) {
        handleApiError(e, 'generation');
    } finally {
        if (!cancellationRef.current) {
            setIsLoading(false);
        }
    }
  };

  const handleCorrection = async (correctionText: string) => {
    if (!chatSessionRef.current || isLoading || !correctionText.trim()) {
        return;
    }
    cancellationRef.current = false;
    setIsLoading(true);
    setError('');

    setChatHistory(prev => [...prev, { role: 'user', content: correctionText }]);

    try {
        const response = await chatSessionRef.current.sendMessage({ message: correctionText });
        if (cancellationRef.current) return;
        
        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        }
        const parsed = JSON.parse(jsonText);

        setGeneratedText(parsed.texto_documento || '');
        setGeneratedMetadata({
            metadados: parsed.metadados,
            evidencias: parsed.evidencias,
            pendencias: parsed.pendencias
        });
        
        setChatHistory(prev => [...prev, { role: 'model', content: parsed.texto_documento || '' }]);

    } catch (e: any) {
        handleApiError(e, 'generation');
        setChatHistory(prev => prev.slice(0, -1)); // Revert user message on error
    } finally {
        if (!cancellationRef.current) {
            setIsLoading(false);
        }
    }
  };

    const handleDocumentAnalysis = async (ai: AiInfo, documentText: string) => {
        cancellationRef.current = false;
        setIsLoading(true);
        setAnalysisResult(null);
        setAnalysisError('');
        setError('');

        const keyIsSet = await checkAndPromptApiKey();
        if (!keyIsSet) {
            setIsLoading(false);
            return;
        }

        const allModelsList = (
            Object.entries(settings.documentModels) as [DocumentCategory, DocumentModel[]][]
        ).map(([category, models]) => 
            `Categoria: ${category}\n` + models.map(m => `- "${m.value}": "${m.label}"`).join('\n')
        ).join('\n\n');

        const systemInstruction = `
# DIRETRIZ PARA ANALISTA DE DOCUMENTOS (TJMG)

**Sua Função:** Analisar um texto jurídico (despacho, petição) e identificar qual modelo de documento deve ser usado em resposta, com base em uma lista fornecida.

---

### REGRA 1: FORMATO DE SAÍDA (OBRIGATÓRIO)

Sua resposta DEVE ser um único objeto JSON, sem nenhum texto fora dele. Use estritamente o schema fornecido:
\`\`\`json
{
  "categoria": "String",
  "modelo_value": "String",
  "justificativa": "String"
}
\`\`\`

---

### REGRA 2: LÓGICA DE CLASSIFICAÇÃO

*   **Objetivo:** Encontre o \`modelo_value\` mais apropriado na lista que você receberá no prompt do usuário.
*   **Justificativa:** Sua justificativa deve ser curta, direta e explicar por que você escolheu aquele modelo.
*   **Regra Específica - Certidão de Promoção:** SÓ use o modelo \`certidao_promocao\` se o texto EXPLICITAMENTE indicar que os autos foram "conclusos ao Juiz". Para outras movimentações (vista ao MP, remessa à Contadoria, etc.), escolha um modelo diferente.

---

### EXEMPLO RÁPIDO

*   **Texto de Entrada:** "Despacho: Intime-se a parte autora para dar andamento ao feito, sob pena de extinção."
*   **Sua Saída (JSON):** \`{"categoria": "Atos Ordinatórios", "modelo_value": "ato_intimacao_dar_andamento_sob_pena_extincao", "justificativa": "A ordem é para intimar a parte para dar andamento, com a consequência de extinção."}\``;
        
        const userPrompt = `Analise o seguinte texto de documento e retorne o JSON correspondente, usando esta lista de modelos disponíveis:\n\n${allModelsList}\n\n--- INÍCIO DO TEXTO ---\n${documentText}\n--- FIM DO TEXTO ---`;

        try {
            const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await genAI.models.generateContent({
                model: ai.modelName,
                contents: userPrompt,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                },
            });
            
            if (cancellationRef.current) return;

            const jsonText = response.text.trim();
            const parsedResult = JSON.parse(jsonText);
            
            if (parsedResult.categoria && parsedResult.modelo_value && parsedResult.justificativa) {
                 setAnalysisResult(parsedResult);
            } else {
                throw new Error("A resposta da IA não contém os campos necessários.");
            }

        } catch (e: any) {
            handleApiError(e, 'analysis');
        } finally {
            if (!cancellationRef.current) {
                setIsLoading(false);
            }
        }
    };

  // ==================== BACKUPS / IMPORTAÇÃO / EXPORTAÇÃO ====================

    const handleSaveSettings = (newSettings: Settings) => {
        setSettings({ ...newSettings, appVersion: APP_VERSION });
        setNotification({ message: 'Configurações salvas!', isVisible: true });
    };

    const handleRestoreBackup = (backup: Backup) => {
        if (!window.confirm(`Restaurar as configurações de ${new Date(backup.date).toLocaleDateString('pt-BR')}? Isso substituirá suas configurações atuais.`)) return;
        setSettings({ ...backup.settings, appVersion: APP_VERSION });
        setIsSettingsModalOpen(false);
        setNotification({ message: 'Backup diário restaurado com sucesso!', isVisible: true });
    };

    const handleDeleteBackup = (date: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir o backup diário de ${new Date(date).toLocaleDateString('pt-BR')}?`)) return;
        const updated = loadBackupsFromStorage(BACKUP_KEY).filter((b) => b.date !== date);
        localStorage.setItem(BACKUP_KEY, JSON.stringify(updated));
        setBackups(updated);
        setNotification({ message: 'Backup diário excluído.', isVisible: true });
    };

    const handleCreateManualBackup = () => {
        const now = new Date().toISOString();
        const newBackup: Backup = { date: now, settings };
        
        const currentManualBackups = loadBackupsFromStorage(MANUAL_BACKUP_KEY);
        let updated = [...currentManualBackups, newBackup];
        
        if (updated.length > 5) {
            updated = updated.slice(updated.length - 5);
        }

        localStorage.setItem(MANUAL_BACKUP_KEY, JSON.stringify(updated));
        setManualBackups(updated);
        setNotification({ message: 'Ponto de restauração criado!', isVisible: true });
    };

    const handleRestoreManualBackup = (backup: Backup) => {
        if (!window.confirm(`Restaurar o backup manual de ${new Date(backup.date).toLocaleString('pt-BR')}? Isso substituirá suas configurações atuais.`)) return;
        setSettings({ ...backup.settings, appVersion: APP_VERSION });
        setIsSettingsModalOpen(false);
        setNotification({ message: 'Backup manual restaurado com sucesso!', isVisible: true });
    };

    const handleDeleteManualBackup = (date: string) => {
        if (!window.confirm(`Tem certeza que deseja excluir o backup manual de ${new Date(date).toLocaleString('pt-BR')}?`)) return;
        const updated = loadBackupsFromStorage(MANUAL_BACKUP_KEY).filter((b) => b.date !== date);
        localStorage.setItem(MANUAL_BACKUP_KEY, JSON.stringify(updated));
        setManualBackups(updated);
        setNotification({ message: 'Backup manual excluído.', isVisible: true });
    };

  // ==================== RENDER ====================

  // import/export status and handlers for SettingsModal
    const [importExportStatus, setImportExportStatus] = useState<{
      progress: number;
      text: string;
      type: 'idle' | 'error' | 'success';
    }>({ progress: 0, text: '', type: 'idle' });
  
    const handleExportSettings = () => {
      setImportExportStatus({ progress: 10, text: 'Exportando...', type: 'idle' });
      try {
        const dataStr = JSON.stringify(settings, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `settings-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setNotification({ message: 'Exportação concluída!', isVisible: true });
        setImportExportStatus({ progress: 100, text: 'Exportação concluída!', type: 'success' });
      } catch (e) {
        console.error('Erro na exportação:', e);
        setNotification({ message: 'Falha na exportação.', isVisible: true });
        setImportExportStatus({ progress: 0, text: 'Falha na exportação.', type: 'error' });
      } finally {
        // reset to idle shortly after showing result
        setTimeout(() => setImportExportStatus({ progress: 0, text: '', type: 'idle' }), 1200);
      }
    };
  
    const handleImportSettings = async (input: File | string) => {
      setImportExportStatus({ progress: 10, text: 'Importando...', type: 'idle' });
      try {
        let text = '';
        if (input instanceof File) {
          text = await input.text();
        } else {
          text = input;
        }
        const parsed = JSON.parse(text);
        // merge imported settings but ensure appVersion is set
        setSettings((prev) => ({ ...prev, ...parsed, appVersion: APP_VERSION }));
        setNotification({ message: 'Importação concluída!', isVisible: true });
        setImportExportStatus({ progress: 100, text: 'Importação concluída!', type: 'success' });
      } catch (e) {
        console.error('Erro na importação:', e);
        setNotification({ message: 'Falha na importação. Verifique o arquivo.', isVisible: true });
        setImportExportStatus({ progress: 0, text: 'Falha na importação.', type: 'error' });
      } finally {
        // reset to idle shortly after showing result
        setTimeout(() => setImportExportStatus({ progress: 0, text: '', type: 'idle' }), 1200);
      }
    };

  // Render a loading state until settings are loaded from localStorage
  if (!settings) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-black">
            <svg className="animate-spin h-10 w-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>
    );
  }

  if (view === 'formatter') {
    return (
      <TextFormatter
        initialText={generatedText}
        onBackToPrompt={() => setView('prompt')}
        defaultFontFamily={settings.defaultFontFamily || 'Roboto'}
        documentHeaderHtml={settings.documentHeaderHtml || ''}
        formData={formData}
      />
    );
  }

  const categoryIcons: { [key in DocumentCategory]: React.ReactNode } = {
    [DocumentCategory.CERTIDAO]: <DocumentCheckIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.ATO_ORDINATORIO]: <ClipboardDocumentIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.OFICIO]: <EnvelopeIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.ALVARA]: <KeyIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.FORMAL_PARTILHA]: <ScaleIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.TERMO_COMPROMISSO]: <PencilSquareIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.CARTA_PRECATORIA]: <ArrowsRightLeftIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.EMAIL]: <EnvelopeIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.MANDADO]: <GavelIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.PORTARIA]: <GavelIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.BUSCA]: <MagnifyingGlassIcon className="h-6 w-6 flex-shrink-0" />,
    [DocumentCategory.LOTE]: <DocumentDuplicateIcon className="h-6 w-6 flex-shrink-0" />,
  };
  
  const HeaderButton = ({
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="group relative flex justify-center items-center h-10 w-10 rounded-full text-white/80 hover:bg-white/20 transition-all duration-300"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
  
  const executionCategories = (Object.values(DocumentCategory) as DocumentCategory[]).filter(
    cat => ![DocumentCategory.BUSCA, DocumentCategory.LOTE].includes(cat)
  );
  
  return (
    <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors flex">
      <Notification
        message={notification?.message || ''}
        isVisible={notification?.isVisible || false}
      />

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-sky-600 to-blue-950 border-r border-blue-900/30 flex flex-col relative z-10">
        <div className="px-4 pt-6 h-20 flex-shrink-0">
          <h2 className="text-xl font-bold text-white/90">Áreas de Trabalho</h2>
        </div>
        <nav className="flex-grow px-4 mt-2 overflow-y-auto">
            <ul className="space-y-1">
                <li className="px-3 pt-4 pb-2 text-xs font-bold uppercase text-sky-300">Execução</li>
                {executionCategories.map(category => (
                    <li key={category}>
                        <button 
                            onClick={() => handleCategoryChange(category)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                                currentCategory === category && formMode === 'model'
                                    ? 'bg-white/20 text-white shadow-inner'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {categoryIcons[category]}
                            <span>{category}</span>
                        </button>
                    </li>
                ))}
                
                <li className="px-3 pt-4 pb-2 text-xs font-bold uppercase text-sky-300">Geração em Lote</li>
                {(settings.documentModels[DocumentCategory.LOTE] || []).map(model => (
                    <li key={model.value}>
                        <button
                            onClick={() => handleCategoryChange(DocumentCategory.LOTE, model.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                                currentCategory === DocumentCategory.LOTE && currentModelValue === model.value && formMode === 'model'
                                    ? 'bg-white/20 text-white shadow-inner'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {categoryIcons[DocumentCategory.LOTE]}
                            <span>{model.label}</span>
                        </button>
                    </li>
                ))}

                <li className="px-3 pt-6 pb-2 text-xs font-bold uppercase text-sky-300">Extração de Informações</li>
                {(settings.documentModels[DocumentCategory.BUSCA] || []).map(model => (
                    <li key={model.value}>
                        <button
                            onClick={() => handleCategoryChange(DocumentCategory.BUSCA, model.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                                currentCategory === DocumentCategory.BUSCA && currentModelValue === model.value && formMode === 'model'
                                    ? 'bg-white/20 text-white shadow-inner'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {categoryIcons[DocumentCategory.BUSCA]}
                            <span>{model.label}</span>
                        </button>
                    </li>
                ))}
                
                <li className="pt-2"><hr className="border-t border-white/20" /></li>
                <li>
                     <button 
                        onClick={() => setFormMode('analysis')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                            formMode === 'analysis'
                                ? 'bg-white/20 text-white shadow-inner'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <SparklesIcon className="h-6 w-6 flex-shrink-0" />
                        <span>Analisar Documento</span>
                    </button>
                </li>
            </ul>
        </nav>
        <div className="px-4 pb-6 mt-auto text-center flex-shrink-0">
          <p className="text-xs font-mono text-white/70">v{APP_VERSION}</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col h-screen">
        <header className="bg-gradient-to-br from-blue-500 to-sky-400 shadow-md px-6 h-20 flex-shrink-0 flex items-center justify-between text-white">
          <div>
            <h1 className="text-2xl font-bold">
              Gerador de Documentos Jurídicos - Comarca de Raul Soares - MG
            </h1>
            <p className="text-sm text-white/80 mt-1">
              Por: João Fernandes Leal - Oficial Judiciário
            </p>
          </div>
          <div className="flex items-center gap-2">
            <HeaderButton
              icon={settings.theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              label={settings.theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
              onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }))}
            />
            <HeaderButton
              icon={<BookOpenIcon className="h-6 w-6" />}
              label="Base Legal"
              onClick={() => setIsLegalBasisModalOpen(true)}
            />
            <HeaderButton
              icon={<SettingsIcon className="h-6 w-6" />}
              label="Configurações"
              onClick={() => setIsSettingsModalOpen(true)}
            />
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-grow overflow-y-auto bg-background-subtle dark:bg-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormColumn
              settings={settings}
              setSettings={setSettings}
              isLoading={isLoading}
              onGenerate={handleIntegratedGeneration}
              onBatchGenerate={handleBatchGenerate}
              onLocalGenerate={handleLocalGeneration}
              onAnalyze={handleDocumentAnalysis}
              analysisResult={analysisResult}
              analysisError={analysisError}
              clearAnalysis={() => {
                  setAnalysisResult(null);
                  setAnalysisError('');
              }}
              formMode={formMode}
              setFormMode={setFormMode}
              formData={formData}
              setFormData={setFormData}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              currentModelValue={currentModelValue}
              setCurrentModelValue={setCurrentModelValue}
            />
            <ResultColumn
              generatedText={generatedText}
              batchResults={batchResults}
              onTextChange={setGeneratedText}
              isLoading={isLoading}
              error={error}
              generatedBy={generatedBy}
              groundingSources={groundingSources}
              onFormatAndDownload={() => setView('formatter')}
              onClearResult={handleClearResult}
              onStopGeneration={handleStopGeneration}
              documentHeaderHtml={settings.documentHeaderHtml || ''}
              chatHistory={chatHistory}
              onCorrect={handleCorrection}
              generatedMetadata={generatedMetadata}
              formData={formData}
            />
          </div>
        </main>
      </div>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        backups={backups}
        onRestore={handleRestoreBackup}
        onDelete={handleDeleteBackup}
        restoringBackupDate={restoringBackupDate}
        deletingBackupDates={deletingBackupDates}
        onExport={handleExportSettings}
        onImport={handleImportSettings}
        importExportStatus={importExportStatus}
        manualBackups={manualBackups}
        onCreateManualBackup={handleCreateManualBackup}
        onRestoreManualBackup={handleRestoreManualBackup}
        onDeleteManualBackup={handleDeleteManualBackup}
      />
      <LegalBasisModal
        isOpen={isLegalBasisModalOpen}
        onClose={() => setIsLegalBasisModalOpen(false)}
        legalBases={settings.legalBases}
      />
    </div>
  );
}

export default App;
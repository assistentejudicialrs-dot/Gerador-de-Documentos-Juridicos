import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, DocumentCategory, DocumentModel, FormField, AiInfo, Backup, Server, LegalBasis, Judge } from '../types';
import { 
    TrashIcon, XMarkIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon, 
    ArrowUturnLeftIcon, DocumentArrowDownIcon, DocumentArrowUpIcon,
    Cog6ToothIcon, DocumentDuplicateIcon, SparklesIcon, CircleStackIcon, ScaleIcon,
    QuestionMarkCircleIcon, PlusCircleIcon
} from '@heroicons/react/24/outline';
import { DEFAULT_SYSTEM_INSTRUCTION, INITIAL_DOCUMENT_MODELS, DEFAULT_DOCUMENT_HEADER_HTML } from '../constants';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: Settings;
    onSave: (settings: Settings) => void;
    backups: Backup[];
    onRestore: (backup: Backup) => void;
    onDelete: (backupDate: string) => void;
    restoringBackupDate: string | null;
    deletingBackupDates: { [key: string]: boolean };
    onExport: () => void;
    onImport: (fileContent: string) => void;
    importExportStatus: {
        progress: number;
        text: string;
        type: 'idle' | 'success' | 'error';
    };
    manualBackups: Backup[];
    onCreateManualBackup: () => void;
    onRestoreManualBackup: (backup: Backup) => void;
    onDeleteManualBackup: (backupDate: string) => void;
}

// Icons for mini-editor
const AlignLeftIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h12v2H3zm0-4v-2h18v2H3zm0-4v-2h12v2H3zm0-4V7h18v2H3z"/></svg>;
const AlignCenterIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h18v2H3zm6-4v-2h6v2H9zm-6-4v-2h18v2H3zm6-4V7h6v2H9z"/></svg>;
const AlignRightIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M9 21v-2h12v2H9zM3 17v-2h18v2H3zm9-4v-2h9v2h-9zM3 9V7h18v2H3z"/></svg>;
const AlignJustifyIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4V7h18v2H3z"/></svg>;
const BoldIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M8 19v-5.5q0-1.05.725-1.775T10.5 11h1q1.45 0 2.475 1.025T15 14.5q0 1.475-1.025 2.488T11.5 18H8Zm2-2h1.5q.625 0 1.063-.438T13 14.5q0-.625-.438-1.062T11.5 13H10v4ZM7 11V5h5.5q1.45 0 2.475 1.025T16 8.5q0 1.475-1.025 2.488T12.5 12H9v-1h3.5q.625 0 1.063-.438T14 9.5q0-.625-.438-1.062T12.5 8H9V7h3.5q.625 0 1.063-.438T13 5.5q0-.625-.438-1.062T11.5 4H7v2h2v3H7Z"/></svg>;
const ItalicIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M10 20v-3H7v-2h3v-4H8V9h3V6h6v2h-3v4h2v2h-2v3h-2Z"/></svg>;
const UnderlineIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M5 21v-2h14v2H5Zm7-4q-1.65 0-2.825-1.175T8 13V4h2v9q0 .825.588 1.413T12 15q.825 0 1.413-.588T14 13V4h2v9q0 1.65-1.175 2.825T12 17Z"/></svg>;

type TextAlign = 'left' | 'center' | 'right' | 'justify';

const tabs = [
    { id: 'geral', name: 'Geral', icon: Cog6ToothIcon },
    { id: 'modelos', name: 'Modelos', icon: DocumentDuplicateIcon },
    { id: 'ia', name: 'Inteligência Artificial', icon: SparklesIcon },
    { id: 'base-legal', name: 'Base Legal', icon: ScaleIcon },
    { id: 'backup', name: 'Backup e Dados', icon: CircleStackIcon },
];


// Fix: Replaced React.FC with a standard function definition with typed props to avoid errors from missing React types.
const SettingsModal = ({ 
    isOpen, 
    onClose, 
    settings: initialSettings, 
    onSave, 
    backups, 
    onRestore, 
    onDelete, 
    restoringBackupDate, 
    deletingBackupDates,
    onExport,
    onImport,
    importExportStatus,
    manualBackups,
    onCreateManualBackup,
    onRestoreManualBackup,
    onDeleteManualBackup
}: SettingsModalProps) => {
    // Fix: Removed type argument from useState call, as it's not supported with incomplete React types.
    const [localSettings, setLocalSettings] = useState(JSON.parse(JSON.stringify(initialSettings)));
    // Fix: Changed useState call to use a type assertion on the initial value instead of a type argument.
    const [openModelKey, setOpenModelKey] = useState(null as string | null);
    const [activeTab, setActiveTab] = useState('geral');
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    // 4. Gerenciamento de Estado no React (useState)
    const [headerIsBold, setHeaderIsBold] = useState(false);
    const [headerIsItalic, setHeaderIsItalic] = useState(false);
    const [headerIsUnderline, setHeaderIsUnderline] = useState(false);
    const [headerTextAlign, setHeaderTextAlign] = useState<TextAlign>('left');

    const headerEditorRef = useRef<HTMLDivElement>(null);
    const operationInProgress = importExportStatus.progress > 0 && importExportStatus.progress < 100;

    useEffect(() => {
        if (isOpen) {
            setLocalSettings(JSON.parse(JSON.stringify(initialSettings)));
            setOpenModelKey(null);
            setActiveTab('geral');
        }
    }, [isOpen, initialSettings]);

    const handleSave = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSave = () => {
        onSave(localSettings);
        setShowConfirmation(false);
        onClose();
    };

    // 3. A Inteligência da Barra de Ferramentas: Sincronização de Estado Reativa
    // b) A Função updateToolbarState
    const updateHeaderToolbarState = useCallback(() => {
        // Verificar estilos simples usando a API nativa do navegador.
        setHeaderIsBold(document.queryCommandState('bold'));
        setHeaderIsItalic(document.queryCommandState('italic'));
        setHeaderIsUnderline(document.queryCommandState('underline'));
    
        // Verificar alinhamento percorrendo o DOM a partir da seleção atual.
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !headerEditorRef.current) return;
        
        let node = selection.anchorNode;
        let alignmentSet = false;
    
        while (node && node !== headerEditorRef.current) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (window.getComputedStyle(element).display === 'block') {
                    const computedStyle = window.getComputedStyle(element);
                    const align = (computedStyle.textAlign as TextAlign);
                    if (['left', 'center', 'right', 'justify'].includes(align)) {
                        // Atualizar o estado React com o alinhamento encontrado.
                        setHeaderTextAlign(align);
                        alignmentSet = true;
                    }
                    break;
                }
            }
            node = node.parentNode;
        }
    
        if (!alignmentSet) {
            setHeaderTextAlign('left');
        }
    }, []);

    // 2. A Lógica de Formatação: Como os Comandos São Aplicados
    const handleHeaderFormat = (command: string) => {
        const editor = headerEditorRef.current;
        if (!editor) return;
    
        // b) Formato Complexo (Alinhamento de Texto)
        if (command.startsWith('justify')) {
            const alignValue = command.substring('justify'.length).toLowerCase();
            const textAlign = alignValue === 'full' ? 'justify' : alignValue;
            
            // 1. Obter a Seleção do Usuário e aplicar estilo manualmente
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                let node = selection.anchorNode;
                while (node && node !== editor) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as HTMLElement;
                        if (window.getComputedStyle(element).display === 'block') {
                            element.style.textAlign = textAlign;
                            break;
                        }
                    }
                    node = node.parentNode;
                }
            }
        } else {
            // a) Formatos Simples (Negrito, etc.)
            document.execCommand(command, false, undefined);
        }
        editor.focus();
        updateHeaderToolbarState();
    };

    useEffect(() => {
        // 3. a) Gatilhos de Atualização (Event Listeners)
        const editor = headerEditorRef.current;
        if (!editor || !isOpen) return;
    
        const events = ['selectionchange', 'keyup', 'mouseup', 'focus'];
        events.forEach(event => {
            // No 'focus', o listener é no editor; 'selectionchange' é no documento.
            const target = event === 'selectionchange' ? document : editor;
            target.addEventListener(event, updateHeaderToolbarState);
        });
    
        return () => {
            events.forEach(event => {
                const target = event === 'selectionchange' ? document : editor;
                target.removeEventListener(event, updateHeaderToolbarState);
            });
        };
    }, [isOpen, updateHeaderToolbarState]);


    // Fix: Replaced React.ChangeEvent with `any` as the type is not available.
    const handleFileSelect = (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                onImport(text);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    };

    const handleModelChange = (category: DocumentCategory, modelIndex: number, field: keyof DocumentModel, newValue: string) => {
        setLocalSettings(prev => {
            const newDocumentModels = { ...prev.documentModels };
            const categoryModels = [...(newDocumentModels[category] || [])];
            const modelToUpdate = { ...categoryModels[modelIndex] };
            (modelToUpdate as any)[field] = newValue;
            categoryModels[modelIndex] = modelToUpdate;
            newDocumentModels[category] = categoryModels;
            return { ...prev, documentModels: newDocumentModels };
        });
    };

    const handleAddModel = (category: DocumentCategory) => {
        const newModel: DocumentModel = {
            label: 'Novo Modelo',
            value: `novo_modelo_${Date.now()}`,
            fields: [
                { id: 'processData', label: '1️⃣ Dados do Processo', type: 'text', placeholder: 'Nº do processo', required: false },
                { id: 'mainContent', label: '2️⃣ Conteúdo Principal', type: 'textarea', placeholder: 'Descreva o ato ou certidão', required: true },
                { id: 'serverName', label: '3️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome do servidor', required: true },
                { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Cargo do servidor', required: true },
            ]
        };
        setLocalSettings(prev => {
            const newDocumentModels = { ...prev.documentModels };
            newDocumentModels[category] = [...(newDocumentModels[category] || []), newModel];
            return { ...prev, documentModels: newDocumentModels };
        });
    };

    const handleDeleteModel = (category: DocumentCategory, indexToDelete: number) => {
        setLocalSettings(prev => {
            const modelToDelete = prev.documentModels[category][indexToDelete];
            if (!modelToDelete) return prev; // Safety check
    
            const updatedModelsInCategory = prev.documentModels[category].filter((_, index) => index !== indexToDelete);
            const updatedDocumentModels = { ...prev.documentModels, [category]: updatedModelsInCategory };
            
            // Check if the deleted model is one of the initial default models
            const isDefaultModel = INITIAL_DOCUMENT_MODELS[category]?.some(m => m.value === modelToDelete.value);
    
            let updatedDeletedDefaultModels = prev.deletedDefaultModels || [];
            if (isDefaultModel && !updatedDeletedDefaultModels.includes(modelToDelete.value)) {
                updatedDeletedDefaultModels = [...updatedDeletedDefaultModels, modelToDelete.value];
            }
    
            return {
                ...prev,
                documentModels: updatedDocumentModels,
                deletedDefaultModels: updatedDeletedDefaultModels
            };
        });
    };

    const handleFieldChange = (category: DocumentCategory, modelIndex: number, fieldIndex: number, prop: keyof FormField, value: string | boolean) => {
        setLocalSettings(prev => {
            const newDocumentModels = { ...prev.documentModels };
            const categoryModels = [...newDocumentModels[category]];
            const modelToUpdate = { ...categoryModels[modelIndex] };
            const fields = [...modelToUpdate.fields];
            const fieldToUpdate = { ...fields[fieldIndex] };

            (fieldToUpdate as any)[prop] = value;
            
            fields[fieldIndex] = fieldToUpdate;
            modelToUpdate.fields = fields;
            categoryModels[modelIndex] = modelToUpdate;
            newDocumentModels[category] = categoryModels;
            return { ...prev, documentModels: newDocumentModels };
        });
    };
    
    const handleAddField = (category: DocumentCategory, modelIndex: number) => {
        const newField: FormField = { id: `novo_campo_${Date.now()}`, label: 'Novo Campo', type: 'text', required: false };
        setLocalSettings(prev => {
            const newDocumentModels = { ...prev.documentModels };
            const categoryModels = [...newDocumentModels[category]];
            const modelToUpdate = { ...categoryModels[modelIndex] };
            modelToUpdate.fields = [...modelToUpdate.fields, newField];
            categoryModels[modelIndex] = modelToUpdate;
            newDocumentModels[category] = categoryModels;
            return { ...prev, documentModels: newDocumentModels };
        });
    };

    const handleDeleteField = (category: DocumentCategory, modelIndex: number, fieldIndex: number) => {
        setLocalSettings(prev => {
            const newDocumentModels = { ...prev.documentModels };
            const categoryModels = [...newDocumentModels[category]];
            const modelToUpdate = { ...categoryModels[modelIndex] };
            modelToUpdate.fields = modelToUpdate.fields.filter((_, i) => i !== fieldIndex);
            categoryModels[modelIndex] = modelToUpdate;
            newDocumentModels[category] = categoryModels;
            return { ...prev, documentModels: newDocumentModels };
        });
    };

    const handleAiChange = (index: number, field: keyof AiInfo, value: string | boolean) => {
        setLocalSettings(prev => {
            const updatedAis = [...prev.ais];
            const aiToUpdate = { ...updatedAis[index] };
            (aiToUpdate as any)[field] = value;

            if (field === 'isIntegrated' && value === false) {
                aiToUpdate.isSearchGrounded = false;
            }

            updatedAis[index] = aiToUpdate;
            return { ...prev, ais: updatedAis };
        });
    };
    
    const handleAddAi = () => {
        const newAi: AiInfo = { 
            id: `ia_${Date.now()}`, 
            name: 'Nova IA Externa', 
            url: 'https://', 
            icon: '🤖', 
            isIntegrated: false,
            modelName: 'gemini-2.5-flash',
            isSearchGrounded: false,
            description: 'Descrição da nova IA'
        };
        setLocalSettings(prev => ({ ...prev, ais: [...prev.ais, newAi] }));
    };
    
    const handleDeleteAi = (indexToDelete: number) => {
        setLocalSettings(prev => ({
            ...prev,
            ais: prev.ais.filter((_, index) => index !== indexToDelete),
        }));
    };

    const handleServerChange = (index: number, field: keyof Server, value: string) => {
        setLocalSettings(prev => {
            const newServers = [...prev.servers];
            newServers[index] = { ...newServers[index], [field]: value };
            return { ...prev, servers: newServers };
        });
    };
    
    const handleAddServer = () => {
        const newServer: Server = {
            id: `server_${Date.now()}`,
            name: 'Novo Servidor',
            role: 'Cargo',
        };
        setLocalSettings(prev => ({ ...prev, servers: [...prev.servers, newServer] }));
    };
    
    const handleDeleteServer = (indexToDelete: number) => {
        setLocalSettings(prev => {
            const serverToDelete = prev.servers[indexToDelete];
            let newDefaultId = prev.defaultServerId;
            if (serverToDelete.id === newDefaultId) {
                newDefaultId = prev.servers.length > 1 ? prev.servers.find((_, i) => i !== indexToDelete)!.id : null;
            }
            return {
                ...prev,
                servers: prev.servers.filter((_, index) => index !== indexToDelete),
                defaultServerId: newDefaultId,
            };
        });
    };
    
    const handleSetDefaultServer = (id: string) => {
        setLocalSettings(prev => ({ ...prev, defaultServerId: id }));
    };

    const handleJudgeChange = (index: number, field: keyof Judge, value: string) => {
        setLocalSettings(prev => {
            const newJudges = [...(prev.judges || [])];
            newJudges[index] = { ...newJudges[index], [field]: value };
            return { ...prev, judges: newJudges };
        });
    };

    const handleAddJudge = () => {
        const newJudge: Judge = {
            id: `judge_${Date.now()}`,
            name: 'Novo(a) Juiz(a)',
        };
        setLocalSettings(prev => ({ ...prev, judges: [...(prev.judges || []), newJudge] }));
    };

    const handleDeleteJudge = (indexToDelete: number) => {
        setLocalSettings(prev => {
            const judges = prev.judges || [];
            const judgeToDelete = judges[indexToDelete];
            let newDefaultId = prev.defaultJudgeId;
            if (judgeToDelete && judgeToDelete.id === newDefaultId) {
                newDefaultId = judges.length > 1 ? judges.find((_, i) => i !== indexToDelete)!.id : null;
            }
            return {
                ...prev,
                judges: judges.filter((_, index) => index !== indexToDelete),
                defaultJudgeId: newDefaultId,
            };
        });
    };

    const handleSetDefaultJudge = (id: string) => {
        setLocalSettings(prev => ({ ...prev, defaultJudgeId: id }));
    };

    const handleLegalBasisChange = (index: number, field: keyof LegalBasis, value: string) => {
        setLocalSettings(prev => {
            const newLegalBases = [...(prev.legalBases || [])];
            newLegalBases[index] = { ...newLegalBases[index], [field]: value };
            return { ...prev, legalBases: newLegalBases };
        });
    };

    const handleAddLegalBasis = () => {
        const newLegalBasis: LegalBasis = {
            id: `legal_${Date.now()}`,
            title: 'Novo Tópico',
            content: 'Descreva a base legal aqui.',
        };
        setLocalSettings(prev => ({ ...prev, legalBases: [...(prev.legalBases || []), newLegalBasis] }));
    };

    const handleDeleteLegalBasis = (indexToDelete: number) => {
        setLocalSettings(prev => ({
            ...prev,
            legalBases: (prev.legalBases || []).filter((_, index) => index !== indexToDelete),
        }));
    };

    if (!isOpen) return null;

    // 4. b) Conexão com a Interface
    const getHeaderToolbarButtonClass = (isActive: boolean) => {
        const baseClass = 'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700';
        return isActive ? `${baseClass} bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300` : baseClass;
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'geral':
                return (
                    <div className="space-y-8">
                        {/* Seção Geral */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Geral</h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md space-y-6">
                                <div>
                                    <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Tema da Interface</label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="theme" value="light" checked={localSettings.theme === 'light'} onChange={() => setLocalSettings(s => ({...s, theme: 'light'}))} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-500" />
                                            <span>Claro</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="theme" value="dark" checked={localSettings.theme === 'dark'} onChange={() => setLocalSettings(s => ({...s, theme: 'dark'}))} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-500" />
                                            <span>Escuro</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="defaultLocation" className="block text-md font-medium text-gray-700 dark:text-gray-300">
                                        Local Padrão
                                    </label>
                                    <input
                                        type="text"
                                        id="defaultLocation"
                                        value={localSettings.defaultLocation}
                                        onChange={(e) => setLocalSettings(s => ({ ...s, defaultLocation: e.target.value }))}
                                        className="mt-2 w-full p-2 border dark:border-gray-500 rounded-md bg-white dark:bg-gray-600"
                                        placeholder="Ex: Comarca de Raul Soares, MG"
                                    />
                                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        Este local será inserido no final de cada documento gerado.
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="defaultFontFamily" className="block text-md font-medium text-gray-700 dark:text-gray-300">
                                        Fonte Padrão (Formatador)
                                    </label>
                                    <select
                                        id="defaultFontFamily"
                                        value={localSettings.defaultFontFamily || 'Roboto, sans-serif'}
                                        onChange={(e) => setLocalSettings(s => ({ ...s, defaultFontFamily: e.target.value }))}
                                        className="mt-2 w-full p-2 border dark:border-gray-500 rounded-md bg-white dark:bg-gray-600"
                                    >
                                        <option value="Arial, sans-serif">Arial</option>
                                        <option value="'Courier New', Courier, monospace">Courier New</option>
                                        <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
                                        <option value="'Lato', sans-serif">Lato</option>
                                        <option value="'Open Sans', sans-serif">Open Sans</option>
                                        <option value="Roboto, sans-serif">Roboto</option>
                                        <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                    </select>
                                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        Esta será a fonte pré-selecionada na tela de formatação de documentos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seção de Cabeçalho */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Cabeçalho Padrão do Documento</h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div className="bg-white dark:bg-gray-800 rounded-t-md p-2 border-b border-gray-200 dark:border-gray-600 flex items-center gap-1 flex-wrap">
                                    <button onClick={() => handleHeaderFormat('bold')} className={getHeaderToolbarButtonClass(headerIsBold)} title="Negrito"><BoldIcon /></button>
                                    <button onClick={() => handleHeaderFormat('italic')} className={getHeaderToolbarButtonClass(headerIsItalic)} title="Itálico"><ItalicIcon /></button>
                                    <button onClick={() => handleHeaderFormat('underline')} className={getHeaderToolbarButtonClass(headerIsUnderline)} title="Sublinhado"><UnderlineIcon /></button>
                                    <div className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                                    <button onClick={() => handleHeaderFormat('justifyLeft')} className={getHeaderToolbarButtonClass(headerTextAlign === 'left')} title="Alinhar à Esquerda"><AlignLeftIcon /></button>
                                    <button onClick={() => handleHeaderFormat('justifyCenter')} className={getHeaderToolbarButtonClass(headerTextAlign === 'center')} title="Centralizar"><AlignCenterIcon /></button>
                                    <button onClick={() => handleHeaderFormat('justifyRight')} className={getHeaderToolbarButtonClass(headerTextAlign === 'right')} title="Alinhar à Direita"><AlignRightIcon /></button>
                                    <button onClick={() => handleHeaderFormat('justifyFull')} className={getHeaderToolbarButtonClass(headerTextAlign === 'justify')} title="Justificar"><AlignJustifyIcon /></button>
                                </div>
                                 {/* 1. A Base da Edição: O Atributo contentEditable */}
                                <div
                                    ref={headerEditorRef}
                                    contentEditable={true}
                                    onInput={(e) => setLocalSettings(s => ({ ...s, documentHeaderHtml: (e.currentTarget as HTMLDivElement).innerHTML }))}
                                    dangerouslySetInnerHTML={{ __html: localSettings.documentHeaderHtml || '' }}
                                    className="w-full min-h-[150px] p-3 bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-600 rounded-b-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    style={{ fontSize: '11pt' }}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Este cabeçalho será usado em todos os documentos.
                                    </p>
                                    <button
                                        onClick={() => setLocalSettings(s => ({...s, documentHeaderHtml: DEFAULT_DOCUMENT_HEADER_HTML}))}
                                        className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        Restaurar Padrão
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Seção de Servidores */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Servidores</h3>
                                <button onClick={handleAddServer} className="flex items-center text-sm text-brand-primary hover:text-brand-primary-dark">
                                    <PlusIcon className="h-5 w-5 mr-1" /> Adicionar Servidor
                                </button>
                            </div>
                            <div className="space-y-4">
                                {(localSettings.servers || []).map((server, index) => (
                                    <div key={server.id || index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                            <div className="sm:col-span-1 flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="default-server"
                                                    checked={localSettings.defaultServerId === server.id}
                                                    onChange={() => handleSetDefaultServer(server.id)}
                                                    className="h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-500"
                                                    title="Marcar como padrão"
                                                />
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nome</label>
                                                <input
                                                    type="text"
                                                    value={server.name}
                                                    onChange={e => handleServerChange(index, 'name', e.target.value)}
                                                    placeholder="Nome do Servidor"
                                                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                                                />
                                            </div>
                                            <div className="sm:col-span-5">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Cargo</label>
                                                <input
                                                    type="text"
                                                    value={server.role}
                                                    onChange={e => handleServerChange(index, 'role', e.target.value)}
                                                    placeholder="Cargo do Servidor"
                                                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                                                />
                                            </div>
                                            <div className="sm:col-span-1 flex items-end justify-center">
                                                <button onClick={() => handleDeleteServer(index)} className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        {localSettings.defaultServerId === server.id && (
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center sm:text-left sm:pl-10">Este é o servidor padrão.</p>
                                        )}
                                    </div>
                                ))}
                                {(!localSettings.servers || localSettings.servers.length === 0) && (
                                    <p className="text-center text-gray-500 dark:text-gray-400 p-4">Nenhum servidor configurado.</p>
                                )}
                            </div>
                        </div>

                         {/* Seção de Juízes */}
                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Juízes</h3>
                                <button onClick={handleAddJudge} className="flex items-center text-sm text-brand-primary hover:text-brand-primary-dark">
                                    <PlusIcon className="h-5 w-5 mr-1" /> Adicionar Juiz(a)
                                </button>
                            </div>
                            <div className="space-y-4">
                                {(localSettings.judges || []).map((judge, index) => (
                                    <div key={judge.id || index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                            <div className="sm:col-span-1 flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="default-judge"
                                                    checked={localSettings.defaultJudgeId === judge.id}
                                                    onChange={() => handleSetDefaultJudge(judge.id)}
                                                    className="h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-500"
                                                    title="Marcar como padrão"
                                                />
                                            </div>
                                            <div className="sm:col-span-10">
                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nome do(a) Juiz(a)</label>
                                                <input
                                                    type="text"
                                                    value={judge.name}
                                                    onChange={e => handleJudgeChange(index, 'name', e.target.value)}
                                                    placeholder="Nome do(a) Juiz(a)"
                                                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                                                />
                                            </div>
                                            <div className="sm:col-span-1 flex items-end justify-center">
                                                <button onClick={() => handleDeleteJudge(index)} className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        {localSettings.defaultJudgeId === judge.id && (
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center sm:text-left sm:pl-10">Este é o juiz(a) padrão.</p>
                                        )}
                                    </div>
                                ))}
                                {(!localSettings.judges || localSettings.judges.length === 0) && (
                                    <p className="text-center text-gray-500 dark:text-gray-400 p-4">Nenhum juiz configurado.</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'modelos':
                return (
                    <div className="space-y-8">
                        {(Object.entries(localSettings.documentModels) as [string, DocumentModel[]][]).map(([category, models]) => (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Modelos de {category}</h3>
                                    <button onClick={() => handleAddModel(category as DocumentCategory)} className="flex items-center text-sm text-brand-primary hover:text-brand-primary-dark">
                                        <PlusIcon className="h-5 w-5 mr-1" /> Adicionar Modelo
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {models.map((model, modelIndex) => {
                                        const modelKey = `${category}-${modelIndex}`;
                                        const isModelOpen = openModelKey === modelKey;
                                        return (
                                            <div key={model.value || modelIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Nome do Modelo</label>
                                                            <input type="text" value={model.label} onChange={(e) => handleModelChange(category as DocumentCategory, modelIndex, 'label', e.target.value)} className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600" />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Identificador (único)</label>
                                                            <input type="text" value={model.value} onChange={(e) => handleModelChange(category as DocumentCategory, modelIndex, 'value', e.target.value)} className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600 font-mono text-sm" />
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setOpenModelKey(isModelOpen ? null : modelKey)} className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                                                        {isModelOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                                    </button>
                                                    <button onClick={() => handleDeleteModel(category as DocumentCategory, modelIndex)} className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                {isModelOpen && (
                                                    <div className="mt-4 pt-4 border-t dark:border-gray-600 space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Instrução Específica para a IA (Opcional)
                                                            </label>
                                                            <textarea
                                                                value={model.modelSpecificInstruction || ''}
                                                                onChange={(e) => handleModelChange(category as DocumentCategory, modelIndex, 'modelSpecificInstruction', e.target.value)}
                                                                rows={3}
                                                                className="mt-1 w-full p-2 border dark:border-gray-500 rounded-md bg-white dark:bg-gray-800 font-mono text-sm"
                                                                placeholder="Ex: Elabore o texto na primeira pessoa do singular..."
                                                            />
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                                Use este campo para dar instruções detalhadas ou 'calibrar' o comportamento da IA para este modelo específico.
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h4 className="font-semibold text-sm">Campos do Formulário</h4>
                                                            <button onClick={() => handleAddField(category as DocumentCategory, modelIndex)} className="flex items-center text-xs text-brand-primary hover:text-brand-primary-dark">
                                                                <PlusIcon className="h-4 w-4 mr-1" /> Adicionar Campo
                                                            </button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {model.fields.map((field, fieldIndex) => (
                                                                <div key={field.id || fieldIndex} className="p-3 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-600">
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                                                        <div className="md:col-span-1"><label className="text-xs font-medium text-gray-500 dark:text-gray-400">Rótulo do Campo</label><input type="text" value={field.label} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'label', e.target.value)} className="w-full p-1.5 text-sm border dark:border-gray-500 rounded bg-white dark:bg-gray-700"/></div>
                                                                        <div className="md:col-span-1"><label className="text-xs font-medium text-gray-500 dark:text-gray-400">ID do Campo (único)</label><input type="text" value={field.id} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'id', e.target.value)} className="w-full p-1.5 text-sm border dark:border-gray-500 rounded bg-white dark:bg-gray-700 font-mono"/></div>
                                                                        <div className="md:col-span-1"><label className="text-xs font-medium text-gray-500 dark:text-gray-400">Texto de Exemplo (Placeholder)</label><input type="text" value={field.placeholder || ''} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'placeholder', e.target.value)} className="w-full p-1.5 text-sm border dark:border-gray-500 rounded bg-white dark:bg-gray-700"/></div>
                                                                        <div className="md:col-span-1"><label className="text-xs font-medium text-gray-500 dark:text-gray-400">Valor Padrão</label><input type="text" value={field.defaultValue || ''} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'defaultValue', e.target.value)} className="w-full p-1.5 text-sm border dark:border-gray-500 rounded bg-white dark:bg-gray-700"/></div>
                                                                    </div>
                                                                    <div className="flex justify-between items-center mt-2 pt-2 border-t dark:border-gray-600">
                                                                        <div className="flex items-center gap-4">
                                                                            <div>
                                                                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2">Tipo</label>
                                                                                <select value={field.type} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'type', e.target.value as 'text' | 'textarea')} className="p-1.5 text-sm border dark:border-gray-500 rounded bg-white dark:bg-gray-700"><option value="text">Texto</option><option value="textarea">Área de Texto</option></select>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <input type="checkbox" id={`required-${field.id}`} checked={!!field.required} onChange={e => handleFieldChange(category as DocumentCategory, modelIndex, fieldIndex, 'required', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"/>
                                                                                <label htmlFor={`required-${field.id}`} className="ml-2 text-sm">Obrigatório</label>
                                                                            </div>
                                                                        </div>
                                                                        <button onClick={() => handleDeleteField(category as DocumentCategory, modelIndex, fieldIndex)} className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"><TrashIcon className="h-4 w-4" /></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'ia':
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Instrução para a IA (Prompt do Sistema)</h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md space-y-4">
                                <div>
                                    <label htmlFor="customSystemInstruction" className="block text-md font-medium text-gray-700 dark:text-gray-300">
                                        Instrução Principal
                                    </label>
                                    <textarea
                                        id="customSystemInstruction"
                                        rows={10}
                                        value={localSettings.customSystemInstruction}
                                        onChange={(e) => setLocalSettings(s => ({ ...s, customSystemInstruction: e.target.value }))}
                                        className="mt-2 w-full p-2 border dark:border-gray-500 rounded-md bg-white dark:bg-gray-600 font-mono text-sm leading-relaxed"
                                        placeholder="Defina aqui como a IA deve se comportar..."
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Esta é a instrução principal que guia o comportamento da IA. Edite com cuidado.
                                        </p>
                                        <button
                                            onClick={() => setLocalSettings(s => ({...s, customSystemInstruction: DEFAULT_SYSTEM_INSTRUCTION}))}
                                            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            Restaurar Padrão
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">IAs Disponíveis</h3>
                                <button onClick={handleAddAi} className="flex items-center text-sm text-brand-primary hover:text-brand-primary-dark">
                                    <PlusIcon className="h-5 w-5 mr-1" /> Adicionar IA
                                </button>
                            </div>
                             <div className="space-y-4">
                                {localSettings.ais.map((ai, index) => (
                                    <div key={ai.id || index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                            <input type="text" value={ai.icon || ''} onChange={e => handleAiChange(index, 'icon', e.target.value)} placeholder="Ícone" className="sm:col-span-1 p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-center" maxLength={2} />
                                            <input type="text" value={ai.name} onChange={e => handleAiChange(index, 'name', e.target.value)} placeholder="Nome da IA" className="sm:col-span-6 p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600" />
                                            <input type="text" value={ai.url} onChange={e => handleAiChange(index, 'url', e.target.value)} placeholder="URL de Referência/Acesso" className="sm:col-span-4 p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600" />
                                            <button onClick={() => handleDeleteAi(index)} className="sm:col-span-1 p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex justify-center items-center"><TrashIcon className="h-5 w-5" /></button>
                                        </div>
                                        <div>
                                            <textarea value={ai.description} onChange={e => handleAiChange(index, 'description', e.target.value)} placeholder="Descrição" className="w-full p-2 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-600" rows={2}></textarea>
                                        </div>
                                        <div className="pt-2 border-t dark:border-gray-600">
                                            <div className="flex items-center">
                                                <input type="checkbox" id={`integrated-${ai.id}`} checked={!!ai.isIntegrated} onChange={e => handleAiChange(index, 'isIntegrated', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"/>
                                                <label htmlFor={`integrated-${ai.id}`} className="ml-2 text-sm font-medium">Integrada (Gera o texto dentro do aplicativo)</label>
                                            </div>
                                            {ai.isIntegrated ? (
                                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pl-1">
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Modelo Gemini</label>
                                                        <select value={ai.modelName} onChange={e => handleAiChange(index, 'modelName', e.target.value)} className="w-full p-2 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-600">
                                                            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                                                            <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center pt-5">
                                                        <input type="checkbox" id={`search-${ai.id}`} checked={!!ai.isSearchGrounded} onChange={e => handleAiChange(index, 'isSearchGrounded', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"/>
                                                        <label htmlFor={`search-${ai.id}`} className="ml-2 text-sm">Usar Busca Google?</label>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pl-1">Esta IA é externa. O aplicativo irá copiar o prompt e abrir a URL em uma nova aba.</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'base-legal':
                return (
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Gerenciar Base Legal</h3>
                                <button onClick={handleAddLegalBasis} className="flex items-center text-sm text-brand-primary hover:text-brand-primary-dark">
                                    <PlusIcon className="h-5 w-5 mr-1" /> Adicionar Tópico
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                O conteúdo adicionado aqui será exibido na janela "Base Legal".
                            </p>
                            <div className="space-y-4">
                                {(localSettings.legalBases || []).map((item, index) => (
                                    <div key={item.id || index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Título</label>
                                            <button onClick={() => handleDeleteLegalBasis(index)} className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={e => handleLegalBasisChange(index, 'title', e.target.value)}
                                            placeholder="Título do tópico"
                                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                                        />
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Conteúdo</label>
                                            <textarea
                                                value={item.content}
                                                onChange={e => handleLegalBasisChange(index, 'content', e.target.value)}
                                                placeholder="Conteúdo da base legal"
                                                rows={5}
                                                className="w-full p-2 mt-1 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                                {(!localSettings.legalBases || localSettings.legalBases.length === 0) && (
                                    <p className="text-center text-gray-500 dark:text-gray-400 p-4">Nenhum tópico de base legal adicionado.</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'backup':
                return (
                    <div className="space-y-8">
                        {/* Seção de Backups Manuais */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Backups Manuais</h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <button
                                    onClick={onCreateManualBackup}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <PlusCircleIcon className="h-5 w-5" />
                                    Criar Ponto de Restauração
                                </button>
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                                    Serão mantidos os 5 backups manuais mais recentes.
                                </p>
                                <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                                    {manualBackups.length > 0 ? (
                                        [...manualBackups].reverse().map((backup) => (
                                            <div key={backup.date} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-600">
                                                <div>
                                                    <p className="font-medium">
                                                        {new Date(backup.date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Versão do App: {backup.settings.appVersion || 'N/A'}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => onRestoreManualBackup(backup)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 rounded-md"><ArrowUturnLeftIcon className="h-4 w-4" /> Restaurar</button>
                                                    <button onClick={() => onDeleteManualBackup(backup.date)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 rounded-md"><TrashIcon className="h-4 w-4" /> Excluir</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">Nenhum backup manual criado.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                         <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Importar / Exportar Configurações</h3>
                             <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button
                                        onClick={onExport}
                                        disabled={operationInProgress}
                                        className="flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        <DocumentArrowDownIcon className="h-5 w-5" />
                                        Exportar para Arquivo
                                    </button>
                                    <label
                                        htmlFor="import-settings-input"
                                        className={`flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 ${operationInProgress ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`}
                                    >
                                        <DocumentArrowUpIcon className="h-5 w-5" />
                                        Importar de Arquivo
                                    </label>
                                    <input
                                        type="file"
                                        id="import-settings-input"
                                        className="hidden"
                                        accept=".json"
                                        onChange={handleFileSelect}
                                        disabled={operationInProgress}
                                    />
                                </div>
                                {importExportStatus.progress > 0 && (
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                            <div
                                                className={`h-2.5 rounded-full transition-all duration-300 ${importExportStatus.type === 'error' ? 'bg-red-500' : 'bg-blue-600'}`}
                                                style={{ width: `${importExportStatus.progress}%` }}
                                            ></div>
                                        </div>
                                        {importExportStatus.text && (
                                            <p className={`mt-2 text-sm text-center font-medium ${
                                                importExportStatus.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                                importExportStatus.type === 'error' ? 'text-red-600 dark:text-red-400' :
                                                'text-gray-600 dark:text-gray-300'
                                            }`}>
                                                {importExportStatus.text}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Pontos de Restauração Diários (Automáticos)</h3>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md space-y-3 max-h-60 overflow-y-auto">
                                {backups && backups.length > 0 ? (
                                    [...backups].reverse().map((backup) => {
                                        const isRestoringThis = restoringBackupDate === backup.date;
                                        const isDeletingThis = deletingBackupDates[backup.date];
                                        const isAnyOperationInProgress = !!restoringBackupDate || Object.values(deletingBackupDates).some(v => v);
                                        
                                        const originalIndex = backups.findIndex(b => b.date === backup.date);
                                        const isProtected = originalIndex < 4;

                                        return (
                                            <div key={backup.date} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-600">
                                                <div>
                                                    <p className="font-medium">Backup de {new Date(backup.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Versão: {backup.settings.appVersion || 'N/A'}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => onRestore(backup)} 
                                                        disabled={isAnyOperationInProgress}
                                                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 w-32 text-sm text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                        title="Restaurar"
                                                    >
                                                        {isRestoringThis ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                Restaurando...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ArrowUturnLeftIcon className="h-4 w-4" />
                                                                Restaurar
                                                            </>
                                                        )}
                                                    </button>
                                                    <button 
                                                        onClick={() => onDelete(backup.date)} 
                                                        disabled={isAnyOperationInProgress || isProtected}
                                                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 w-28 text-sm rounded-md disabled:cursor-not-allowed transition-all ${
                                                            isProtected
                                                                ? 'text-gray-400 dark:text-gray-500'
                                                                : 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 disabled:opacity-50'
                                                        }`}
                                                        title={isProtected ? "Os 4 backups mais antigos são protegidos." : "Excluir Backup"}
                                                    >
                                                        {isDeletingThis ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                Excluindo...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TrashIcon className="h-4 w-4" />
                                                                Excluir
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400 p-4">Nenhum ponto de restauração encontrado. Um novo ponto será criado automaticamente a cada dia de uso.</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col relative">
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Configurações</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><XMarkIcon className="h-6 w-6" /></button>
                </div>
                <div className="flex-grow flex overflow-hidden">
                    {/* Sidebar de Navegação */}
                    <aside className="w-64 p-6 border-r dark:border-gray-700">
                        <nav className="flex flex-col space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-brand-primary text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5 mr-3" />
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Conteúdo da Aba */}
                    <main className="flex-1 p-6 overflow-y-auto">
                        {renderContent()}
                    </main>
                </div>
                <div className="flex justify-end space-x-2 p-6 border-t dark:border-gray-700">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md">Cancelar</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark">Salvar Alterações</button>
                </div>
                
                {/* Confirmation Dialog Overlay */}
                {showConfirmation && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20 rounded-lg">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-8 max-w-md w-full m-4 text-center">
                            <QuestionMarkCircleIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Confirmar Alterações</h3>
                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                Tem certeza de que deseja salvar as modificações feitas?
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-8 py-2.5 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleConfirmSave}
                                    className="px-8 py-2.5 bg-brand-primary text-white rounded-md font-semibold hover:bg-brand-primary-dark transition"
                                >
                                    Sim, Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsModal;
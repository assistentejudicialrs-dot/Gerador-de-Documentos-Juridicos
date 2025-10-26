import React, { useState, useMemo } from 'react';
import { ClipboardDocumentIcon, CheckIcon, ExclamationTriangleIcon, TrashIcon, PaperAirplaneIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ChatMessage, GeneratedMetadata } from '../types';
import DocumentHeader from './DocumentHeader';

interface ResultColumnProps {
    generatedText: string;
    batchResults: string[];
    onTextChange: (text: string) => void;
    isLoading: boolean;
    error: string;
    generatedBy: string | null;
    groundingSources: any[];
    onFormatAndDownload: () => void;
    onClearResult: () => void;
    onStopGeneration: () => void;
    documentHeaderHtml: string;
    chatHistory: ChatMessage[];
    onCorrect: (correctionText: string) => void;
    generatedMetadata: GeneratedMetadata | null;
    formData: { [key: string]: string };
}

const CorrectionChat = ({ history, onCorrect, isLoading }: { history: ChatMessage[], onCorrect: (text: string) => void, isLoading: boolean }) => {
    const [correctionInput, setCorrectionInput] = useState('');

    const handleSend = () => {
        if (!correctionInput.trim()) return;
        onCorrect(correctionInput);
        setCorrectionInput('');
    };

    // Fix: Replaced React.KeyboardEvent with `any` as React types are not fully available.
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Chat de Correção</h3>
            <div className="space-y-3 text-sm max-h-48 overflow-y-auto pr-2">
                {history.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-xl max-w-md whitespace-pre-wrap ${
                            msg.role === 'user' 
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-gray-800 dark:text-gray-200' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                           {msg.role === 'user' ? <p><strong>Você:</strong> {msg.content}</p> : <p><strong>IA:</strong> O resultado foi atualizado acima.</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 relative">
                <textarea
                    value={correctionInput}
                    onChange={(e) => setCorrectionInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder={isLoading ? "Aguarde a IA responder..." : "Peça uma correção (ex: 'Altere o prazo para 15 dias')"}
                    rows={2}
                    className="w-full p-2 pr-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 disabled:opacity-60"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !correctionInput.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    aria-label="Enviar Correção"
                >
                    <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

// Fix: Replaced React.ReactNode with `any` for the children prop as React types are not fully available.
// Fix: Made the `children` prop optional to fix a TypeScript error where JSX children were not being correctly typed.
const MetadataSection = ({ title, children, defaultOpen = false }: { title: string, children?: any, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
                <span>{title}</span>
                {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </button>
            {isOpen && children && <div className="pb-3 text-xs text-gray-600 dark:text-gray-300">{children}</div>}
        </div>
    );
};

// Fix: Refactored BatchResultItem to return a fragment and moved the wrapper div to the map function to resolve the 'key' prop error.
const BatchResultItem = ({ text, index }: { text: string; index: number }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const previewTitle = text.split('\n')[0]?.trim() || `Documento ${index + 1}`;

    return (
        <>
            <div className="flex justify-between items-center">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{previewTitle}</p>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
                        copied
                            ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 whitespace-pre-wrap max-h-16 overflow-hidden">
                {text}
            </p>
        </>
    );
};


// Fix: Replaced React.FC with a standard function definition with typed props to avoid errors from missing React types.
const ResultColumn = ({
    generatedText,
    batchResults,
    onTextChange,
    isLoading,
    error,
    generatedBy,
    groundingSources,
    onFormatAndDownload,
    onClearResult,
    onStopGeneration,
    documentHeaderHtml,
    chatHistory,
    onCorrect,
    generatedMetadata,
    formData,
}: ResultColumnProps) => {
    const [copySuccessResult, setCopySuccessResult] = useState(false);

    const handleCopyResultToClipboard = () => {
        const textToCopy = error ? `Erro: ${error}` : (batchResults.length > 0 ? batchResults.join('\n\n---\n\n') : generatedText);
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopySuccessResult(true);
                setTimeout(() => setCopySuccessResult(false), 2000);
            }).catch(err => console.error('Failed to copy text: ', err));
        }
    };
    
    const hasContent = generatedText || error || batchResults.length > 0;

    return (
        <div className="bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm p-6 rounded-xl shadow-lg shadow-black/5 flex flex-col h-full lg:sticky lg:top-28 lg:max-h-[calc(100vh-8.5rem)]">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Resultado Gerado</h2>
                {hasContent && (
                    <div className="flex items-center gap-2">
                         <button onClick={onClearResult} className="flex items-center gap-2 text-sm p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                            <TrashIcon className="h-5 w-5" /> Limpar
                        </button>
                        <button onClick={handleCopyResultToClipboard} className="flex items-center gap-2 text-sm p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <ClipboardDocumentIcon className="h-5 w-5" /> {copySuccessResult ? 'Copiado!' : (batchResults.length > 0 ? 'Copiar Tudo' : 'Copiar')}
                        </button>
                        {!error && generatedText && (
                            <button onClick={onFormatAndDownload} className="text-sm p-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors font-semibold">Formatar e Baixar</button>
                        )}
                    </div>
                )}
            </div>
            
            <div className="flex-grow flex flex-col overflow-hidden">
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center flex flex-col items-center">
                            <svg className="animate-spin mx-auto h-10 w-10 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">Aguarde, gerando documento...</p>
                             <button 
                                onClick={onStopGeneration}
                                className="mt-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                            >
                                Interromper Geração
                            </button>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex-grow flex items-center justify-center text-center text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex flex-col items-center gap-4">
                            <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
                            <div>
                                <p className="font-bold text-lg">Ocorreu um Erro</p>
                                <p className="text-sm mt-2 text-red-600 dark:text-red-300">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : batchResults.length > 0 ? (
                    <div className="flex-grow flex flex-col overflow-hidden">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {batchResults.length} documentos gerados. Clique para copiar individualmente.
                        </div>
                        <div className="overflow-y-auto pr-2 -mr-2 space-y-3">
                            {/* Fix: Moved the wrapper div with the key prop here to resolve a TypeScript error. */}
                            {batchResults.map((text, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border dark:border-gray-700">
                                    <BatchResultItem text={text} index={index} />
                                </div>
                            ))}
                        </div>
                         {generatedBy && <p className="text-xs text-gray-400 italic mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">Gerado por: {generatedBy}</p>}
                    </div>
                ) : hasContent ? (
                    <div className="flex-grow flex flex-col overflow-hidden">
                        {generatedMetadata ? (
                            <div className="flex-grow flex flex-col overflow-hidden">
                                <div className="overflow-y-auto pr-2">
                                    {generatedMetadata?.pendencias && generatedMetadata.pendencias.length > 0 && (
                                        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg">
                                            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">Pendências Encontradas:</p>
                                            <ul className="list-disc list-inside mt-1 text-xs text-yellow-700 dark:text-yellow-300">
                                                {generatedMetadata.pendencias.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    )}
        
                                    {generatedMetadata && (
                                        <div className="mb-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3">
                                            <MetadataSection title="Metadados do Documento" defaultOpen>
                                                <ul className="space-y-1">
                                                    {Object.entries(generatedMetadata.metadados || {}).map(([key, value]) => (
                                                        <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : value}</li>
                                                    ))}
                                                </ul>
                                            </MetadataSection>
                                            {generatedMetadata?.evidencias?.fontes_consultadas && (
                                                <MetadataSection title="Evidências e Fontes">
                                                    <ul className="space-y-2">
                                                        {generatedMetadata.evidencias.fontes_consultadas.map((fonte, i) => (
                                                            <li key={i}>
                                                                <strong>{fonte.tipo}:</strong> {fonte.url ? <a href={fonte.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{fonte.titulo || fonte.url}</a> : fonte.conteudo}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </MetadataSection>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className="bg-gray-50 dark:bg-gray-900/70 p-4 rounded-lg font-serif">
                                        <DocumentHeader
                                            htmlContent={documentHeaderHtml}
                                            serverName={formData?.serverName}
                                        />
                                        <div className="whitespace-pre-wrap text-justify text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                                            {generatedText}
                                        </div>
                                        {generatedBy && <p className="text-xs text-gray-400 italic mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">Gerado por: {generatedBy}</p>}
                                        {groundingSources.length > 0 && (
                                            <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <p className="text-xs font-semibold mb-1 text-gray-500 dark:text-gray-400">Fontes da Busca Google:</p>
                                                <ul className="list-disc list-inside text-xs space-y-1">
                                                    {groundingSources.map((source, index) => (
                                                        <li key={index}><a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{source.web.title}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <CorrectionChat history={chatHistory} onCorrect={onCorrect} isLoading={isLoading} />
                            </div>
                        ) : (
                             <textarea
                                value={generatedText}
                                onChange={(e) => onTextChange(e.target.value)}
                                placeholder="O texto gerado aparecerá aqui. Você também pode colar o resultado de uma IA externa para formatá-lo."
                                className="w-full h-full flex-grow p-4 bg-gray-50 dark:bg-gray-800/80 rounded-lg font-serif text-sm leading-relaxed text-gray-800 dark:text-gray-200 border-2 border-dashed border-gray-300 dark:border-gray-600 focus:border-solid focus:border-brand-primary focus:ring-0 outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        )}
                    </div>
                ) : (
                     <div className="flex-grow flex items-center justify-center text-center">
                        <div className="text-gray-400 dark:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="mt-4 text-lg font-medium">Aguardando geração</p>
                            <p className="text-sm">Seu documento aparecerá aqui.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultColumn;
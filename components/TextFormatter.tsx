import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import { ArrowLeftIcon, DocumentArrowDownIcon, ArrowsUpDownIcon, Cog8ToothIcon, ClipboardDocumentIcon, CheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

// Icons
const AlignLeftIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h12v2H3zm0-4v-2h18v2H3zm0-4v-2h12v2H3zm0-4V7h18v2H3z"/></svg>;
const AlignCenterIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h18v2H3zm6-4v-2h6v2H9zm-6-4v-2h18v2H3zm6-4V7h6v2H9z"/></svg>;
const AlignRightIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M9 21v-2h12v2H9zM3 17v-2h18v2H3zm9-4v-2h9v2h-9zM3 9V7h18v2H3z"/></svg>;
const AlignJustifyIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4V7h18v2H3z"/></svg>;
const BoldIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M8 19v-5.5q0-1.05.725-1.775T10.5 11h1q1.45 0 2.475 1.025T15 14.5q0 1.475-1.025 2.488T11.5 18H8Zm2-2h1.5q.625 0 1.063-.438T13 14.5q0-.625-.438-1.062T11.5 13H10v4ZM7 11V5h5.5q1.45 0 2.475 1.025T16 8.5q0 1.475-1.025 2.488T12.5 12H9v-1h3.5q.625 0 1.063-.438T14 9.5q0-.625-.438-1.062T12.5 8H9V7h3.5q.625 0 1.063-.438T13 5.5q0-.625-.438-1.062T11.5 4H7v2h2v3H7Z"/></svg>;
const ItalicIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M10 20v-3H7v-2h3v-4H8V9h3V6h6v2h-3v4h2v2h-2v3h-2Z"/></svg>;
const UnderlineIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M5 21v-2h14v2H5Zm7-4q-1.65 0-2.825-1.175T8 13V4h2v9q0 .825.588 1.413T12 15q.825 0 1.413-.588T14 13V4h2v9q0 1.65-1.175 2.825T12 17Z"/></svg>;

type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface TextFormatterProps {
    initialText?: string;
    onBackToPrompt: () => void;
    defaultFontFamily: string;
    documentHeaderHtml: string;
    formData: { [key: string]: string };
}

const TextFormatter = ({ initialText = '', onBackToPrompt, defaultFontFamily, documentHeaderHtml, formData }: TextFormatterProps) => {
    // State for text content and styling
    const [editorHtml, setEditorHtml] = useState('');
    const [fontFamily, setFontFamily] = useState(defaultFontFamily || 'Roboto');
    const [fontSize, setFontSize] = useState(11);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [margins, setMargins] = useState({ top: 2, right: 2.5, bottom: 2, left: 2.5 }); // in cm
    
    // 4. Gerenciamento de Estado no React (useState)
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textAlign, setTextAlign] = useState<TextAlign>('justify');

    // UI State
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLayoutPopoverOpen, setIsLayoutPopoverOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    
    const editorRef = useRef<HTMLDivElement>(null);

    // Initial setup effect
    useEffect(() => {
        const processTextToHtml = (text: string) => {
            if (!text) return '';
            return text
                .split('\n\n')
                .map(paragraph => `<p>${paragraph.trim().replace(/\n/g, '<br>')}</p>`)
                .join('');
        };

        const match = initialText.match(/^(CERTIDÃO|ATO ORDINATÓRIO)\s*\n\s*\n(.*)/is);
        let documentBodyHtml = '';

        if (match) {
            const title = match[1].toUpperCase();
            const body = match[2];
            const titleHtml = `<p style="text-align: center;"><strong>${title}</strong></p><br>`;
            const bodyHtml = processTextToHtml(body);
            documentBodyHtml = titleHtml + bodyHtml;
        } else {
            documentBodyHtml = processTextToHtml(initialText);
        }
        
        let processedHeader = (documentHeaderHtml || '');
        if (formData) {
            const serverName = formData.serverName || '';
            const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            processedHeader = processedHeader
                .replace('{{SERVER_NAME}}', serverName)
                .replace('{{DATE}}', date);
        }
        
        setEditorHtml(processedHeader + documentBodyHtml);
    }, [initialText, documentHeaderHtml, formData]);
    
    // 3. A Inteligência da Barra de Ferramentas: Sincronização de Estado Reativa
    // b) A Função updateToolbarState
    const updateToolbarState = useCallback(() => {
        // Verificar estilos simples usando a API nativa do navegador.
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
    
        // Verificar alinhamento percorrendo o DOM a partir da seleção atual.
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
        
        let node = selection.anchorNode;
        let alignmentSet = false;
    
        while (node && node !== editorRef.current) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (window.getComputedStyle(element).display === 'block') {
                    const computedStyle = window.getComputedStyle(element);
                    const align = (computedStyle.textAlign as TextAlign);
                    if (['left', 'center', 'right', 'justify'].includes(align)) {
                         // Atualizar o estado React com o alinhamento encontrado.
                        setTextAlign(align);
                        alignmentSet = true;
                    }
                    break;
                }
            }
            node = node.parentNode;
        }
    
        // Se nenhum alinhamento explícito for encontrado, reverte para o padrão 'justify'.
        if (!alignmentSet) {
            setTextAlign('justify');
        }
    }, []);

    // 2. A Lógica de Formatação: Como os Comandos São Aplicados
    const handleFormat = (command: string) => {
        // b) Formato Complexo (Alinhamento de Texto)
        // Como 'document.execCommand' para justificação é inconsistente, aplicamos o estilo manualmente.
        if (command.startsWith('justify')) {
            const alignValue = command.substring('justify'.length).toLowerCase();
            const textAlignValue = alignValue === 'full' ? 'justify' : alignValue;
            
            // 1. Obter a Seleção do Usuário e aplicar estilo ao bloco pai.
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                let node = selection.anchorNode;
                while (node && node !== editorRef.current) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as HTMLElement;
                        if (window.getComputedStyle(element).display === 'block') {
                            element.style.textAlign = textAlignValue;
                            break;
                        }
                    }
                    node = node.parentNode;
                }
            }
        } else {
            // a) Formatos Simples (Negrito, Itálico, etc.)
            document.execCommand(command, false, undefined);
        }
        editorRef.current?.focus();
        updateToolbarState(); // Garante que a barra de ferramentas reflita a mudança.
    };
    
    useEffect(() => {
        // 3. a) Gatilhos de Atualização (Event Listeners)
        // Monitoramos eventos para manter a barra de ferramentas sincronizada.
        const editor = editorRef.current;
        if (!editor) return;

        const events = ['selectionchange', 'keyup', 'mouseup', 'focus'];
        events.forEach(event => {
            const target = event === 'selectionchange' ? document : editor;
            target.addEventListener(event, updateToolbarState);
        });

        return () => {
             events.forEach(event => {
                const target = event === 'selectionchange' ? document : editor;
                target.removeEventListener(event, updateToolbarState);
            });
        };
    }, [updateToolbarState]);

    const handleMarginChange = (side: keyof typeof margins, value: string) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            setMargins(prev => ({ ...prev, [side]: numValue }));
        }
    };

    const handleCopyText = useCallback(() => {
        if (editorRef.current) {
            const textToCopy = editorRef.current.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
                alert("Ocorreu um erro ao copiar o texto.");
            });
        }
    }, []);
    
    const handleDownloadPdf = async () => {
        if (isDownloading || !editorRef.current) return;
        setIsDownloading(true);
    
        try {
            // Usa a biblioteca jsPDF para converter diretamente o HTML em PDF,
            // o que oferece uma paginação automática e muito mais confiável.
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'cm',
                format: 'a4',
            });
            
            // Clona o editor para não afetar a visualização do usuário.
            // O padding é removido porque a biblioteca `html` do jsPDF usa seu próprio sistema de margens.
            const contentToPrint = editorRef.current.cloneNode(true) as HTMLElement;
            contentToPrint.style.padding = '0';
            contentToPrint.style.minHeight = 'auto';
            contentToPrint.style.width = `${(21 - margins.left - margins.right)}cm`; // Define a largura do conteúdo em cm
            
            // O elemento precisa estar no DOM para que a biblioteca possa medi-lo.
            contentToPrint.style.position = 'absolute';
            contentToPrint.style.left = '-9999px';
            document.body.appendChild(contentToPrint);
    
            await pdf.html(contentToPrint, {
                callback: async (doc) => {
                    // Remove o elemento clonado após a renderização.
                    document.body.removeChild(contentToPrint);
                    
                    // Tenta usar a API moderna para salvar arquivos, se disponível.
                    if ((window as any).showSaveFilePicker) {
                        try {
                            const handle = await (window as any).showSaveFilePicker({
                                suggestedName: 'documento_formatado.pdf',
                                types: [{ description: 'Documentos PDF', accept: { 'application/pdf': ['.pdf'] } }],
                            });
                            const writable = await handle.createWritable();
                            await writable.write(doc.output('blob'));
                            await writable.close();
                        } catch (err: any) {
                            if (err.name !== 'AbortError') {
                                console.error("Erro ao salvar o arquivo:", err);
                                doc.save('documento_formatado.pdf'); // Fallback para o método antigo
                            }
                        }
                    } else {
                        doc.save('documento_formatado.pdf'); // Método de salvamento padrão
                    }
                    
                    setIsDownloading(false);
                },
                // As margens definidas pelo usuário são aplicadas diretamente.
                margin: [margins.top, margins.right, margins.bottom, margins.left],
                // Habilita a paginação automática da biblioteca, que é mais robusta.
                autoPaging: 'text',
                html2canvas: {
                    scale: 2, // Aumenta a resolução para melhor qualidade.
                    useCORS: true,
                    logging: false,
                }
            });
    
        } catch (err) {
            console.error("A geração do PDF falhou:", err);
            alert("Ocorreu um erro inesperado ao gerar o PDF. Por favor, tente novamente.");
            setIsDownloading(false);
        }
    };
    
    // 4. b) Conexão com a Interface
    const getToolbarButtonClass = (isActive: boolean) => {
        const baseClass = 'p-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-600';
        return isActive ? `${baseClass} bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300` : baseClass;
    };
    
    const editorStyle = {
        fontFamily: fontFamily,
        fontSize: `${fontSize}pt`,
        lineHeight: lineHeight,
        padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
        boxSizing: 'border-box' as const,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col items-center">
            <header className="bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center w-full sticky top-0 z-20">
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Formatar Documento</h1>
                <div className="flex items-center gap-2">
                    <button onClick={onBackToPrompt} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors" title="Voltar"><ArrowLeftIcon className="h-5 w-5" /> Voltar</button>
                     <button
                        onClick={handleCopyText}
                        className={`font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                            copySuccess
                                ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        title="Copiar Texto"
                    >
                        {copySuccess ? <CheckIcon className="h-5 w-5" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                        {copySuccess ? 'Copiado!' : 'Copiar'}
                    </button>
                    <div className="relative group">
                        <button 
                            disabled 
                            className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 cursor-not-allowed"
                            title="Salvar no Google Drive (em breve)"
                        >
                            <CloudArrowUpIcon className="h-5 w-5" /> Salvar no Drive
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-black/70 text-white text-xs rounded py-1 px-2 shadow-lg z-30">
                            Em breve: Salve diretamente no seu Google Drive.
                        </div>
                    </div>
                    <button onClick={handleDownloadPdf} disabled={isDownloading} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-brand-primary-dark flex items-center gap-2 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"><DocumentArrowDownIcon className="h-5 w-5" /> {isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}</button>
                </div>
            </header>
            
            <main className="flex-grow p-4 sm:p-6 lg:p-8 w-full flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm p-2 rounded-t-lg flex items-center gap-2 sticky top-[73px] z-10 flex-wrap border-b border-gray-200 dark:border-gray-700 shadow-sm">
                     <div className="flex items-center gap-2" role="group" aria-label="Controles de Fonte">
                        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-brand-primary rounded-md px-2 py-1.5 text-sm" aria-label="Selecionar Fonte" title="Selecionar Fonte">
                            <option value="Roboto">Roboto</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Arial">Arial</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Helvetica">Helvetica</option>
                        </select>
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md">
                            <input type="number" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value, 10))} className="bg-transparent w-14 border-transparent focus:ring-0 text-sm text-center appearance-none" aria-label="Tamanho da Fonte" title="Tamanho da Fonte" min="8" max="72"/>
                            <span className="text-sm pr-2 text-gray-500 dark:text-gray-400">pt</span>
                        </div>
                    </div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                     <div className="flex items-center gap-1" role="group" aria-label="Formatação de Texto">
                        <button onClick={() => handleFormat('bold')} className={getToolbarButtonClass(isBold)} title="Negrito"><BoldIcon /></button>
                        <button onClick={() => handleFormat('italic')} className={getToolbarButtonClass(isItalic)} title="Itálico"><ItalicIcon /></button>
                        <button onClick={() => handleFormat('underline')} className={getToolbarButtonClass(isUnderline)} title="Sublinhado"><UnderlineIcon /></button>
                    </div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-1" role="group" aria-label="Alinhamento de Texto">
                        <button onClick={() => handleFormat('justifyLeft')} className={getToolbarButtonClass(textAlign === 'left')} title="Alinhar à Esquerda"><AlignLeftIcon /></button>
                        <button onClick={() => handleFormat('justifyCenter')} className={getToolbarButtonClass(textAlign === 'center')} title="Centralizar"><AlignCenterIcon /></button>
                        <button onClick={() => handleFormat('justifyRight')} className={getToolbarButtonClass(textAlign === 'right')} title="Alinhar à Direita"><AlignRightIcon /></button>
                        <button onClick={() => handleFormat('justifyFull')} className={getToolbarButtonClass(textAlign === 'justify')} title="Justificar"><AlignJustifyIcon /></button>
                    </div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-2" role="group" aria-label="Espaçamento entre Linhas">
                        <ArrowsUpDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                         <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md">
                             <input type="number" value={lineHeight} onChange={e => setLineHeight(parseFloat(e.target.value))} className="bg-transparent w-16 border-transparent focus:ring-0 text-sm text-center appearance-none" aria-label="Espaçamento entre Linhas" title="Espaçamento entre Linhas" min="1" max="3" step="0.1"/>
                        </div>
                    </div>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="relative">
                        <button onClick={() => setIsLayoutPopoverOpen(prev => !prev)} className="p-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-600" title="Layout da Página">
                            <Cog8ToothIcon className="h-5 w-5" />
                        </button>
                        {isLayoutPopoverOpen && (
                             <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-30 p-4">
                                <h4 className="font-semibold text-sm mb-3">Margens do Documento (cm)</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs">Superior</label><input type="number" value={margins.top} onChange={e => handleMarginChange('top', e.target.value)} className="w-full p-1.5 mt-1 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-700"/></div>
                                    <div><label className="text-xs">Inferior</label><input type="number" value={margins.bottom} onChange={e => handleMarginChange('bottom', e.target.value)} className="w-full p-1.5 mt-1 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-700"/></div>
                                    <div><label className="text-xs">Esquerda</label><input type="number" value={margins.left} onChange={e => handleMarginChange('left', e.target.value)} className="w-full p-1.5 mt-1 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-700"/></div>
                                    <div><label className="text-xs">Direita</label><input type="number" value={margins.right} onChange={e => handleMarginChange('right', e.target.value)} className="w-full p-1.5 mt-1 text-sm border dark:border-gray-600 rounded bg-white dark:bg-gray-700"/></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                 {/* 1. A Base da Edição: O Atributo contentEditable */}
                <div 
                    id="pdf-content"
                    ref={editorRef}
                    contentEditable={true}
                    onInput={e => setEditorHtml((e.target as HTMLDivElement).innerHTML)}
                    dangerouslySetInnerHTML={{ __html: editorHtml }}
                    className="w-full max-w-4xl flex-grow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-b-lg outline-none focus:ring-2 focus:ring-brand-primary my-4"
                    style={{ 
                        ...editorStyle,
                        minHeight: '29.7cm' // A4 Height
                    }}
                />
            </main>
             <style>{`
                /* Hide number input spinners */
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                  -webkit-appearance: none; 
                  margin: 0; 
                }
                input[type=number] {
                  -moz-appearance: textfield;
                }
                #pdf-content p {
                    margin-bottom: 1em;
                }
                #pdf-content p:last-of-type {
                    margin-bottom: 0;
                }
                #pdf-content hr {
                    border-top: 1px solid #9ca3af;
                    margin: 1rem 0;
                }
                .dark #pdf-content hr {
                    border-top-color: #4b5563;
                }
             `}</style>
        </div>
    );
};

export default TextFormatter;
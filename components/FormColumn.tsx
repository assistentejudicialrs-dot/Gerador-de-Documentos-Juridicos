import React, { useState, useMemo, useEffect } from 'react';
import { DocumentCategory, DocumentModel, Settings, AiInfo, FormField, AnalysisResult, Server } from '../types';
import { StarIcon as StarIconOutline, InformationCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '../constants';

interface FormColumnProps {
    settings: Settings;
    // Fix: Replaced React.Dispatch and React.SetStateAction with a function type to avoid errors from missing types.
    setSettings: (value: Settings | ((val: Settings) => Settings)) => void;
    isLoading: boolean;
    onGenerate: (ai: AiInfo, prompt: string) => void;
    onBatchGenerate: (model: DocumentModel, formData: { [key: string]: string }) => void;
    onLocalGenerate: (text: string) => void;
    onAnalyze: (ai: AiInfo, documentText: string) => void;
    analysisResult: AnalysisResult | null;
    analysisError: string;
    clearAnalysis: () => void;
    formMode: 'model' | 'analysis';
    setFormMode: (mode: 'model' | 'analysis') => void;
    formData: { [key: string]: string };
    setFormData: (value: { [key: string]: string } | ((val: { [key: string]: string }) => { [key: string]: string })) => void;
    currentCategory: DocumentCategory;
    setCurrentCategory: (value: DocumentCategory) => void;
    currentModelValue: string;
    setCurrentModelValue: (value: string) => void;
}

const numeroParaExtenso = (numStr: string | number): string => {
    const num = typeof numStr === 'string' ? parseInt(numStr, 10) : numStr;
    if (isNaN(num) || num < 0) return numStr.toString();
    if (num > 100) return num.toString();
    
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const especiais = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];

    if (num === 0) return 'zero';
    if (num === 1) return 'um';
    if (num < 10) return unidades[num];
    if (num < 20) return especiais[num - 10];
    if (num < 100) {
        const dezena = Math.floor(num / 10);
        const unidade = num % 10;
        if (unidade === 0) return dezenas[dezena];
        return `${dezenas[dezena]} e ${unidades[unidade]}`;
    }
    return num.toString();
};

// Fix: Replaced React.FC with a standard function definition with typed props to avoid errors from missing types.
const FormColumn = ({ 
    settings, 
    setSettings, 
    isLoading, 
    onGenerate,
    onBatchGenerate,
    onLocalGenerate,
    onAnalyze,
    analysisResult,
    analysisError,
    clearAnalysis,
    formMode,
    setFormMode,
    formData,
    setFormData,
    currentCategory,
    setCurrentCategory,
    currentModelValue,
    setCurrentModelValue
}: FormColumnProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [documentToAnalyze, setDocumentToAnalyze] = useState('');
    
    const integratedAis = useMemo(() => settings.ais.filter(ai => ai.isIntegrated), [settings.ais]);
    const externalAis = useMemo(() => settings.ais.filter(ai => !ai.isIntegrated), [settings.ais]);
    const [selectedAnalysisAiId, setSelectedAnalysisAiId] = useState(() => integratedAis[0]?.id || '');
    
    // Fix: Removed type argument from useState call to avoid error with incomplete React types. Type is inferred.
    const [formError, setFormError] = useState('');
    // Fix: Changed useState call to use a type assertion on the initial value instead of a type argument.
    const [copySuccessId, setCopySuccessId] = useState(null as string | null);
    // Fix: Changed useState call to use a type assertion on the initial value instead of a type argument.
    const [generatingAiId, setGeneratingAiId] = useState(null as string | null);

    const cardClasses = "bg-white dark:bg-gray-800/50 dark:backdrop-blur-sm p-6 rounded-xl shadow-lg shadow-black/5 transition-colors duration-300";

    const filteredModels: DocumentModel[] = useMemo(() => {
        const models = settings.documentModels[currentCategory] || [];
        if (!searchQuery.trim()) {
            return models;
        }
        return models.filter(model =>
            model.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [settings.documentModels, currentCategory, searchQuery]);

    const { favoriteModels, otherModels } = useMemo(() => {
        const favorites = settings.favorites || [];
        const favs = filteredModels.filter(m => favorites.includes(m.value));
        const others = filteredModels.filter(m => !favorites.includes(m.value));
        return { favoriteModels: favs, otherModels: others };
    }, [filteredModels, settings.favorites]);

    const currentModel = useMemo(() => {
        return (settings.documentModels[currentCategory] || []).find(m => m.value === currentModelValue);
    }, [settings.documentModels, currentCategory, currentModelValue]);
    
    useEffect(() => {
        const isModelInFilteredList = filteredModels.some(m => m.value === currentModelValue);
        
        if (!isModelInFilteredList && filteredModels.length > 0) {
            setCurrentModelValue(filteredModels[0].value);
        } else if (filteredModels.length === 0) {
            setCurrentModelValue('');
        }
    }, [filteredModels, currentModelValue, setCurrentModelValue]);


    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleToggleFavorite = () => {
        if (!currentModelValue) return;
        setSettings(prev => {
            const newFavorites = [...(prev.favorites || [])];
            const favIndex = newFavorites.indexOf(currentModelValue);
            if (favIndex > -1) {
                newFavorites.splice(favIndex, 1); // Unfavorite
            } else {
                newFavorites.push(currentModelValue); // Favorite
            }
            return { ...prev, favorites: newFavorites };
        });
    };

    const buildPrompt = () => {
        if (!currentModel) return '';
        
        let promptText = '';

        if (currentModel.modelSpecificInstruction && currentCategory !== DocumentCategory.BUSCA) {
            promptText += `${currentModel.modelSpecificInstruction}\n\n`;
        }
        
        promptText += `DADOS PARA ELABORAÇÃO DO DOCUMENTO:\n`;
        promptText += `- Tipo de Documento: ${currentCategory}\n`;
        promptText += `- Modelo Específico: ${currentModel.label}\n`;
        
        const today = new Date();
        const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const dateString = `${today.getDate()} de ${months[today.getMonth()]} de ${today.getFullYear()}`;
        promptText += `- Data de Elaboração (para o rodapé do documento): ${dateString}\n`;

        const serverName = formData.serverName || '(não informado)';
        const serverRole = formData.serverRole || '(não informado)';
        
        if (!currentModel.value.startsWith('portaria')) { // Portarias não têm assinatura de servidor
             promptText += `- Servidor que assinará: Nome: "${serverName}", Cargo: "${serverRole}".\n\n`;
        }
       
        promptText += `INFORMAÇÕES DO FORMULÁRIO:\n`;

        const customJudgeName = formData['customJudgeName']?.trim();

        currentModel.fields.forEach(field => {
            if (field.type === 'dynamic-periods') {
                let periods = [];
                try {
                    periods = JSON.parse(formData[field.id] || '[]');
                } catch (e) { /* ignore parse error, will be handled by validation */ }

                if (periods.length > 0) {
                    promptText += `- ${field.label} (Total: ${periods.length}):\n`;
                    periods.forEach((period: any, index: number) => {
                        promptText += `  - Período ${index + 1}:\n`;
                        promptText += `    - Início: ${period.inicio || '(não informado)'}\n`;
                        promptText += `    - Duração em dias: ${period.dias || '0'}\n`;
                        const motivo = period.motivo === 'Outros (especificar)' 
                            ? period.outroMotivo || '(não especificado)' 
                            : period.motivo;
                        promptText += `    - Motivo: ${motivo || '(não informado)'}\n`;
                    });
                }
                return; // Continue to next field
            }


            // Fields handled specially above or below
            const specialFields = [
                'modo_comarca', 'comarca_destinataria_manual', // for carta_precatoria
                'customJudgeName', // handled with nome_juiz
                'servidor_substituido_id', 'servidor_substituto_id' // for portaria
            ];

            if (currentModel.value === 'carta_precatoria') {
                if (formData['modo_comarca'] === 'Deixar a IA pesquisar (com base no ato)') {
                    promptText += `- Destino da Carta Precatória: PESQUISAR E DETERMINAR O JUÍZO COMPETENTE com base nos dados do ato a ser praticado (endereço, etc.).\n`;
                } else {
                    const comarcaManual = formData['comarca_destinataria_manual'] || '(não informado)';
                    promptText += `- Destino da Carta Precatória: ${comarcaManual}\n`;
                }
                if (field.id === 'modo_comarca' || field.id === 'comarca_destinataria_manual') {
                    return; // skip, already handled
                }
            }


            if (field.id === 'nome_juiz') {
                const selectedJudgeId = formData[field.id];
                let judgeName = '(não informado)';
                if (customJudgeName) {
                    judgeName = customJudgeName;
                } else if (selectedJudgeId) {
                    const judge = (settings.judges || []).find(j => j.id === selectedJudgeId);
                    if (judge) {
                        judgeName = judge.name;
                    }
                }
                promptText += `- ${field.label}:\n`;
                promptText += `  - Nome: ${judgeName}\n`;
            } 
            else if (field.id === 'servidor_substituido_id') {
                const serverId = formData[field.id];
                const server = settings.servers.find(s => s.id === serverId);
                promptText += `- ${field.label}:\n`;
                promptText += `  - Nome: ${server ? server.name : '(não informado)'}\n`;
                promptText += `  - Cargo: ${server ? server.role : '(não informado)'}\n`;
                promptText += `  - Matrícula: ${server ? (server.matricula || 'não informada') : '(não informado)'}\n`;
            }
            else if (field.id === 'servidor_substituto_id') {
                const serverId = formData[field.id];
                const server = settings.servers.find(s => s.id === serverId);
                promptText += `- ${field.label}:\n`;
                promptText += `  - Nome: ${server ? server.name : '(não informado)'}\n`;
                promptText += `  - Cargo: ${server ? server.role : '(não informado)'}\n`;
                promptText += `  - Matrícula: ${server ? (server.matricula || 'não informada') : '(não informado)'}\n`;
            }
            else if (!specialFields.includes(field.id)) {
                const processFieldIds = ['processData', 'processo_no', 'processo_dados'];
                if (processFieldIds.includes(field.id)) {
                    const processInfo = formData[field.id]?.trim();
                    if (processInfo) {
                        promptText += `- ${field.label}: ${processInfo}\n`;
                    }
                    // If empty, nothing is added to the prompt for this field.
                } else {
                    let value = formData[field.id] || '(não informado)';
                    promptText += `- ${field.label}: ${value}\n`;
                }
            }
        });
        
        return promptText;
    };

    const validateForm = (): boolean => {
        if (!currentModel) {
            setFormError('Por favor, selecione um modelo de documento.');
            return false;
        }
        if (currentModel.value === 'busca_acordo_inss') {
            if (!formData.nome_autora?.trim()) { setFormError('O "Nome da Parte Autora" é obrigatório.'); return false; }
            if (!formData.cpf_autora?.trim()) { setFormError('O "CPF da Parte Autora" é obrigatório.'); return false; }
            if (!formData.nome_advogado?.trim()) { setFormError('O "Nome do Advogado" é obrigatório.'); return false; }
            if (!formData.cpf_advogado?.trim()) { setFormError('O "CPF do Advogado" é obrigatório.'); return false; }
            if (!formData.oab_advogado?.trim()) { setFormError('A "OAB do Advogado" é obrigatória.'); return false; }
            if (!formData.ano_atual?.trim()) { setFormError('O "Ano Atual" é obrigatório.'); return false; }
            if (!formData.texto_acordo?.trim()) { setFormError('A "Cópia integral do acordo" é obrigatória.'); return false; }
            setFormError('');
            return true;
        }

        if (currentCategory === DocumentCategory.LOTE) {
            if (currentModel.value === 'lote_certidao_aceite_pericia') {
                if (!formData.template?.trim()) { setFormError('O "Modelo do Documento" é obrigatório.'); return false; }
                if (!formData.nome_perito?.trim()) { setFormError('O "Nome do Médico Perito" é obrigatório.'); return false; }
                if (!formData.data_pericia?.trim()) { setFormError('A "Data da Perícia" é obrigatória.'); return false; }
                if (!formData.dados_planilha?.trim()) { setFormError('Os "Dados da Planilha" são obrigatórios.'); return false; }
                if (!formData.data_sistema_extenso?.trim()) { setFormError('A "Data da Certidão" é obrigatória.'); return false; }
            } else { // Fallback for other potential batch models
                if (!formData.template?.trim()) {
                    setFormError('O campo "Modelo do Documento" é obrigatório.');
                    return false;
                }
                if (!formData.csvData?.trim()) {
                    setFormError('O campo "Dados da Planilha" é obrigatório.');
                    return false;
                }
                const lines = formData.csvData.trim().split('\n');
                if (lines.length < 2) {
                    setFormError('Os dados da planilha devem conter um cabeçalho e pelo menos uma linha de dados.');
                    return false;
                }
            }
            setFormError('');
            return true;
        }
    
        for (const field of currentModel.fields) {
            // Special validation for Judge: one of the two fields must be filled.
            if (field.id === 'nome_juiz' && field.required) {
                if (!formData['nome_juiz']?.trim() && !formData['customJudgeName']?.trim()) {
                    setFormError(`O campo "${field.label}" é obrigatório. Selecione um(a) juiz(a) da lista ou informe um nome no campo 'Outro Juiz'.`);
                    return false;
                }
                // Skip to next field as judge validation is done.
                continue;
            }
            
            // The 'customJudgeName' field is validated along with 'nome_juiz', so we can skip its individual check.
            if (field.id === 'customJudgeName') {
                continue;
            }
    
            if (field.type === 'dynamic-periods' && field.required) {
                let periods = [];
                try {
                    periods = JSON.parse(formData[field.id] || '[]');
                } catch (e) {
                    setFormError(`Erro interno nos dados dos períodos. Tente remover e adicionar novamente.`);
                    return false;
                }
    
                if (periods.length === 0) {
                    setFormError(`É necessário adicionar pelo menos um período de substituição.`);
                    return false;
                }
                for (const [index, period] of periods.entries()) {
                    if (!(period as any).inicio) {
                        setFormError(`A "Data de Início" é obrigatória para o Período ${index + 1}.`);
                        return false;
                    }
                    if (!(period as any).dias || parseInt((period as any).dias, 10) < 1) {
                        setFormError(`A "Quantidade de Dias" deve ser 1 ou maior para o Período ${index + 1}.`);
                        return false;
                    }
                    if ((period as any).motivo === 'Outros (especificar)' && !(period as any).outroMotivo?.trim()) {
                        setFormError(`É necessário especificar o motivo para o Período ${index + 1}.`);
                        return false;
                    }
                }
            } else if (currentModel.value === 'carta_precatoria' && formData['modo_comarca'] === 'Informar Juízo Manualmente' && !formData['comarca_destinataria_manual']?.trim()) {
                setFormError(`O campo "Juízo de Destino" é obrigatório quando a opção "Informar Juízo Manualmente" está selecionada.`);
                return false;
            } else if (field.required && !formData[field.id]?.trim()) {
                setFormError(`O campo "${field.label}" é obrigatório.`);
                return false;
            }
        }
        setFormError('');
        return true;
    }

    const handleCopyAndOpen = (ai: AiInfo, prompt: string) => {
        if (!ai.url) return;
        navigator.clipboard.writeText(prompt).then(() => {
            setCopySuccessId(ai.id);
            setTimeout(() => setCopySuccessId(null), 2000);
            window.open(ai.url, '_blank', 'noopener,noreferrer');
        }).catch(err => {
            console.error('Failed to copy prompt: ', err);
            setFormError('Falha ao copiar o prompt.');
        });
    };

    const handleGenerationClick = (ai: AiInfo) => {
        if (isLoading || !validateForm()) return;
        
        const prompt = buildPrompt();

        if (ai.isIntegrated) {
            setGeneratingAiId(ai.id);
            onGenerate(ai, prompt);
        } else {
            handleCopyAndOpen(ai, prompt);
        }
    };

    const handleAutomaticGeneration = () => {
        if (isLoading || !validateForm()) return;
    
        if (!currentModel || !currentModel.modelSpecificInstruction || currentCategory === DocumentCategory.BUSCA) {
            setFormError("O modelo selecionado não possui um template para geração automática.");
            return;
        }
    
        setGeneratingAiId('automatic-local');
    
        let finalText = currentModel.modelSpecificInstruction.split('// INSTRUÇÕES PARA IA:')[1] ? currentModel.modelSpecificInstruction.split('// 4. Mantenha a linguagem padronizada.')[1].trim() : currentModel.modelSpecificInstruction;

        const speciallyHandledFields = new Set<string>();
    
        const formatDateToFullText = (dateString: string) => {
            if (!dateString) return '';
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(Date.UTC(year, month - 1, day));
            return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
        };
    
        if (currentModel.value === 'portaria_substituicao') {
            const periods = JSON.parse(formData.periodos_substituicao || '[]');
            const substituido = settings.servers.find(s => s.id === formData.servidor_substituido_id);
            const substituto = settings.servers.find(s => s.id === formData.servidor_substituto_id);
            
            const servidorAfastadoDetalhes = `${substituido?.name || '[Nome]'}, ${substituido?.role || '[Cargo]'}, matrícula ${substituido?.matricula || '[Matrícula]'}`;
            const servidorSubstitutoDetalhes = `${substituto?.name || '[Nome]'}, ${substituto?.role || '[Cargo]'}, matrícula ${substituto?.matricula || '[Matrícula]'}`;

            const listaConsiderando = periods.map((p: any, index: number) => {
                const dias = p.dias || '0';
                const diasExtenso = numeroParaExtenso(dias);
                const dataInicioExtenso = formatDateToFullText(p.inicio);
                const motivoText = p.motivo.split(':')[0].split('(')[0].trim();
                const motivo = p.motivo === 'Outros (especificar)' ? p.outroMotivo : motivoText.toLowerCase();
                const pontuacao = index === periods.length - 1 ? '.' : ';';
                return `${dias} (${diasExtenso}) dia(s) útil(eis) a partir de ${dataInicioExtenso}, por motivo de ${motivo}${pontuacao}`;
            }).join('\n\n');

            const listaResolve = periods.map((p: any, index: number) => {
                const dias = p.dias || '0';
                const diasExtenso = numeroParaExtenso(dias);
                const dataInicioExtenso = formatDateToFullText(p.inicio);
                const pontuacao = index === periods.length - 1 ? '.' : ';';
                return `${dias} (${diasExtenso}) dia(s) útil(eis) a partir de ${dataInicioExtenso}${pontuacao}`;
            }).join('\n\n');

            finalText = finalText.replace(/{{servidor_afastado_detalhes}}/g, servidorAfastadoDetalhes);
            finalText = finalText.replace(/{{servidor_substituto_detalhes}}/g, servidorSubstitutoDetalhes);
            finalText = finalText.replace('{{lista_considerando}}', listaConsiderando);
            finalText = finalText.replace('{{lista_resolve}}', listaResolve);

            speciallyHandledFields.add('periodos_substituicao');
            speciallyHandledFields.add('servidor_substituido_id');
            speciallyHandledFields.add('servidor_substituto_id');
        }
        
        let processoBloco = '';
        const processo = formData.processData || formData.processo_no || formData.processo_dados;
        if (processo && processo.trim()) {
            processoBloco = `Processo nº ${processo.trim()}`;
        }
        finalText = finalText.replace(/{{processo_bloco}}/g, processoBloco);
        
        for (const fieldId in formData) {
            if (speciallyHandledFields.has(fieldId)) {
                continue;
            }
            const regex = new RegExp(`{{${fieldId}}}`, 'g');
            finalText = finalText.replace(regex, formData[fieldId] || '');
        }
    
        currentModel.fields.forEach(field => {
            if (field.type === 'date' && formData[field.id]) {
                const [year, month, day] = formData[field.id].split('-').map(Number);
                const date = new Date(Date.UTC(year, month - 1, day));
                
                const formattedDate = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
                const regexExtenso = new RegExp(`{{${field.id}_por_extenso}}`, 'g');
                finalText = finalText.replace(regexExtenso, formattedDate);
                
                const yearString = date.getUTCFullYear().toString();
                const regexAno = new RegExp(`{{${field.id}_ano}}`, 'g');
                finalText = finalText.replace(regexAno, yearString);
            }
        });
    
        const customJudgeName = formData['customJudgeName']?.trim();
        if (customJudgeName) {
            finalText = finalText.replace(/{{nome_juiz}}{{customJudgeName}}/g, customJudgeName);
        } else {
            const selectedJudgeId = formData['nome_juiz'];
            const judge = (settings.judges || []).find(j => j.id === selectedJudgeId);
            finalText = finalText.replace(/{{nome_juiz}}{{customJudgeName}}/g, judge?.name || '');
        }
        finalText = finalText.replace(/{{nome_juiz}}/g, '');
        finalText = finalText.replace(/{{customJudgeName}}/g, '');
    
        finalText = finalText.replace(/{{[^{}]+}}/g, '');
    
        onLocalGenerate(finalText);
    };

    useEffect(() => {
        if (!isLoading) {
            setGeneratingAiId(null);
        }
    }, [isLoading])

    const handleApplySuggestion = () => {
        if (!analysisResult) return;
        
        const categoryEnum = Object.values(DocumentCategory).find(c => c === analysisResult.categoria);
        if (!categoryEnum) {
            console.error("Categoria inválida da IA:", analysisResult.categoria);
            return;
        }

        setCurrentCategory(categoryEnum);
        setCurrentModelValue(analysisResult.modelo_value);
        setFormMode('model');
        clearAnalysis();
    };

    const findModelLabel = (value: string): string => {
        for (const category of Object.values(DocumentCategory)) {
            const model = settings.documentModels[category]?.find(m => m.value === value);
            if (model) return model.label;
        }
        return value;
    };
    
    const renderField = (field: FormField) => {
        const inputClasses = "w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500";
        
        const label = (
            <label htmlFor={field.id} className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
        );

        switch (field.type) {
            case 'textarea':
                const isCsvField = currentCategory === DocumentCategory.LOTE && field.id === 'csvData';
                return (
                    <div key={field.id}>
                        {label}
                        <textarea id={field.id} value={formData[field.id] || ''} onChange={e => handleInputChange(field.id, e.target.value)} placeholder={field.placeholder} required={field.required} rows={currentCategory === DocumentCategory.LOTE ? 8 : 4} className={inputClasses} />
                        {isCsvField && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <p>Precisa converter sua planilha (XLS, XLSX) para CSV? Use um destes conversores online:</p>
                                <ul className="list-disc list-inside mt-1">
                                    <li><a href="https://convertio.co/pt/xls-csv/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Convertio</a></li>
                                    <li><a href="https://www.freeconvert.com/pt/xls-to-csv" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">FreeConvert</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'date':
                return (
                    <div key={field.id}>
                        {label}
                        <input type="date" id={field.id} value={formData[field.id] || ''} onChange={e => handleInputChange(field.id, e.target.value)} required={field.required} className={inputClasses} />
                    </div>
                );
            case 'radio':
                return (
                    <div key={field.id}>
                        {label}
                        <div className="flex flex-col gap-2 mt-2">
                            {(field.options || []).map(option => (
                                <label key={option} className="flex items-start gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option}
                                        checked={(formData[field.id] || field.defaultValue) === option}
                                        onChange={e => handleInputChange(field.id, e.target.value)}
                                        className="h-4 w-4 mt-0.5 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-500"
                                    />
                                    <span className="text-sm">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 'dynamic-periods':
                let periods: { inicio: string; dias: string; motivo: string; outroMotivo: string }[] = [];
                try {
                    periods = JSON.parse(formData[field.id] || '[]');
                } catch (e) {
                    console.error("Error parsing periods JSON:", e);
                    periods = []; // Default to empty array on error
                }
    
                const setPeriods = (newPeriods: any[]) => {
                    handleInputChange(field.id, JSON.stringify(newPeriods));
                };
    
                const handleAddPeriod = () => {
                    const today = new Date().toISOString().slice(0, 10);
                    setPeriods([...periods, { inicio: today, dias: '1', motivo: 'Férias Regulamentares', outroMotivo: '' }]);
                };
    
                const handleRemovePeriod = (indexToRemove: number) => {
                    setPeriods(periods.filter((_, index) => index !== indexToRemove));
                };
    
                const handlePeriodChange = (indexToChange: number, prop: string, value: string) => {
                    const newPeriods = periods.map((period, index) => {
                        if (index === indexToChange) {
                            return { ...period, [prop]: value };
                        }
                        return period;
                    });
                    setPeriods(newPeriods);
                };
    
                const reasonOptions = field.options || [];
    
                return (
                    <div key={field.id} className="space-y-4">
                        {label}
                        {periods.map((period, index) => (
                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600 relative">
                                 <button
                                    onClick={() => handleRemovePeriod(index)}
                                    className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                                    title="Remover Período"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Início da Substituição</label>
                                        <input
                                            type="date"
                                            value={period.inicio}
                                            onChange={e => handlePeriodChange(index, 'inicio', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Quantidade de Dias</label>
                                        <input
                                            type="number"
                                            value={period.dias}
                                            onChange={e => handlePeriodChange(index, 'dias', e.target.value)}
                                            min="1"
                                            className={inputClasses}
                                            placeholder="Ex: 5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Motivo</label>
                                    <select
                                        value={period.motivo}
                                        onChange={e => handlePeriodChange(index, 'motivo', e.target.value)}
                                        className={inputClasses}
                                    >
                                        {reasonOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                {period.motivo === 'Outros (especificar)' && (
                                    <div className="mt-4">
                                         <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Especifique o Outro Motivo</label>
                                         <textarea
                                            value={period.outroMotivo}
                                            onChange={e => handlePeriodChange(index, 'outroMotivo', e.target.value)}
                                            rows={2}
                                            className={inputClasses}
                                            placeholder="Descreva o motivo aqui..."
                                         />
                                    </div>
                                )}
                            </div>
                        ))}
                         <button
                            onClick={handleAddPeriod}
                            className="w-full mt-2 flex items-center justify-center gap-2 text-sm p-2 rounded-lg text-brand-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-dashed border-blue-400 dark:border-blue-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Adicionar Período
                        </button>
                    </div>
                );
            case 'select':
                const renderServerSelect = (servers: Server[]) => (
                    <select
                        id={field.id}
                        value={formData[field.id] || ''}
                        onChange={e => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary"
                    >
                        <option value="">Selecione um(a) servidor(a)...</option>
                        {servers.map(server => (
                            <option key={server.id} value={server.id}>{server.name}</option>
                        ))}
                    </select>
                );

                if (field.lookup === 'judges') {
                    return (
                        <div key={field.id}>
                            {label}
                             <select
                                id={field.id}
                                value={formData[field.id] || ''}
                                onChange={e => handleInputChange(field.id, e.target.value)}
                                required={field.required}
                                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary"
                            >
                                <option value="">Selecione um(a) juiz(a)...</option>
                                {(settings.judges || []).map(judge => (
                                    <option key={judge.id} value={judge.id}>{judge.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
                if (field.lookup === 'managers') {
                    const managerRoles = ['Gerente de Secretaria', 'Gerente de Contadoria'];
                    const managers = settings.servers.filter(s => managerRoles.includes(s.role));
                    return (
                        <div key={field.id}>
                            {label}
                            {renderServerSelect(managers)}
                        </div>
                    );
                }
                if (field.lookup === 'oficiais') {
                    const oficiais = settings.servers.filter(s => s.role === 'Oficial Judiciário');
                     return (
                        <div key={field.id}>
                            {label}
                            {renderServerSelect(oficiais)}
                        </div>
                    );
                }
                return null;
            case 'text':
            default:
                 return (
                    <div key={field.id}>
                        {label}
                        <input type="text" id={field.id} value={formData[field.id] || ''} onChange={e => handleInputChange(field.id, e.target.value)} placeholder={field.placeholder} required={field.required} className={inputClasses} />
                    </div>
                );
        }
    };

    const isCurrentModelFavorite = formMode === 'model' && (settings.favorites || []).includes(currentModelValue);
    const isBuscaCategory = currentCategory === DocumentCategory.BUSCA;
    const isLoteCategory = currentCategory === DocumentCategory.LOTE;

    const renderModelButton = (model: DocumentModel) => {
        const isFavorite = (settings.favorites || []).includes(model.value);
        return (
             <button 
                key={model.value} 
                onClick={() => setCurrentModelValue(model.value)} 
                className={`w-full text-left p-3 rounded-md text-sm transition-colors flex items-center ${
                    currentModelValue === model.value 
                        ? 'bg-brand-primary text-white font-semibold' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
                {isFavorite && <StarIconSolid className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />}
                <span>{model.label}</span>
            </button>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {formMode === 'analysis' ? (
                <div className={cardClasses}>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Cole o Texto para Análise</h2>
                    <textarea
                        value={documentToAnalyze}
                        onChange={e => setDocumentToAnalyze(e.target.value)}
                        rows={8}
                        placeholder="Cole aqui o conteúdo do documento (petição, despacho, etc.) que você deseja analisar."
                        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                     <div className="mt-4">
                        <label htmlFor="analysis-ai-selector" className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-300">
                            IA para Análise
                        </label>
                        <select
                            id="analysis-ai-selector"
                            value={selectedAnalysisAiId}
                            onChange={(e) => setSelectedAnalysisAiId(e.target.value)}
                            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary"
                        >
                            {integratedAis.map(ai => (
                                <option key={ai.id} value={ai.id}>{ai.icon} {ai.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            const selectedAi = integratedAis.find(ai => ai.id === selectedAnalysisAiId);
                            if (selectedAi) {
                                onAnalyze(selectedAi, documentToAnalyze);
                            }
                        }}
                        disabled={isLoading || !documentToAnalyze.trim() || !selectedAnalysisAiId}
                        className="w-full mt-4 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg text-base hover:bg-brand-primary-dark flex items-center justify-center gap-2 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Analisando...
                            </>
                        ) : (
                            <> <SparklesIcon className="h-5 w-5" /> Analisar com IA </>
                        )}
                    </button>
                    {analysisError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4" role="alert">
                            <p className="font-bold">Erro na Análise</p>
                            <p>{analysisError}</p>
                        </div>
                    )}
                    {analysisResult && (
                        <div className="mt-6 p-4 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30 rounded-lg">
                             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sugestão da IA</h3>
                             <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <p><strong>Modelo:</strong> {analysisResult.categoria} &rarr; <span className="font-semibold">{findModelLabel(analysisResult.modelo_value)}</span></p>
                                <p><strong>Justificativa:</strong> <em>{analysisResult.justificativa}</em></p>
                             </div>
                             <button onClick={handleApplySuggestion} className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                Usar este modelo
                             </button>
                        </div>
                    )}
                </div>
            ) : isBuscaCategory ? (
                <>
                    <div className={cardClasses}>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{currentModel?.label || 'Busca Externa'}</h2>
                         {currentModel ? (
                            (() => {
                                let instructionText = null;
                                try {
                                    const instructionData = JSON.parse(currentModel.modelSpecificInstruction || '{}');
                                    if (!Array.isArray(instructionData)) {
                                        instructionText = instructionData.instructionText;
                                    }
                                } catch (e) {}

                                if (instructionText) {
                                    return <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{instructionText}</p>;
                                }
                                
                                if (currentModel.fields.length > 0) {
                                    return <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Esta seção extrai informações usando IAs externas. Cole o texto base e clique em uma das IAs abaixo. A ferramenta será aberta em uma nova aba com o texto já copiado para a sua área de transferência.</p>;
                                }
                                
                                // This case should not be hit if the JSON is structured correctly, but it's a safe fallback.
                                return <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Instruções inválidas para este modelo.</p>;
                            })()
                        ) : null}
                    </div>

                    {currentModel && currentModel.fields.length > 0 && (
                        <div className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Preencha os Dados</h2>
                            <div className="space-y-4">
                                {currentModel.fields.map(field => renderField(field))}
                            </div>
                        </div>
                    )}

                    {currentModel && (
                        <div className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {currentModel.fields.length > 0 ? '2. Executar Busca com IA Externa' : 'Acessar Ferramentas de Análise'}
                            </h2>
                            {formError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert"><p className="font-bold">Erro</p><p>{formError}</p></div>}
                            
                            {(() => {
                                let externalAis: { name: string; url: string; icon: string }[] = [];
                                let staticPromptToCopy: string | null = null;
                                try {
                                    const instructionData = JSON.parse(currentModel.modelSpecificInstruction || '{}');
                                    if (Array.isArray(instructionData)) {
                                        externalAis = instructionData;
                                    } else {
                                        externalAis = instructionData.ais || [];
                                        staticPromptToCopy = instructionData.staticPrompt || null;
                                    }
                                } catch (e) {
                                    // handle error if JSON is malformed
                                }

                                if (externalAis.length === 0) {
                                    return <p className="text-gray-500">Nenhuma IA externa configurada para este modelo.</p>;
                                }
                                
                                return (
                                    <div className="space-y-3">
                                        {externalAis.map(ai => {
                                            const isCopyAction = currentModel.fields.length > 0 || !!staticPromptToCopy;

                                            const handleExternalAction = () => {
                                                if (isLoading) return;
                                            
                                                let textToCopy = '';

                                                if (currentModel.value === 'busca_acordo_inss') {
                                                    if (!validateForm()) return;
                                                    const userData = `DADOS INICIAIS FORNECIDOS PELO USUÁRIO:\n• Nome da Parte Autora: ${formData.nome_autora}\n• CPF da Parte Autora: ${formData.cpf_autora}\n• Nome do Advogado: ${formData.nome_advogado}\n• CPF do Advogado: ${formData.cpf_advogado}\n• OAB do Advogado: ${formData.oab_advogado}\n• Ano Atual (para cálculo de RRA): ${formData.ano_atual}\n\n---\nCOPIA INTEGRAL DO ACORDO DO INSS PARA ANÁLISE:\n${formData.texto_acordo}\n`;
                                                    if (staticPromptToCopy) {
                                                        textToCopy = `${staticPromptToCopy}\n\n${userData}`;
                                                    }
                                                } else if (staticPromptToCopy) {
                                                    if (currentModel.fields.length > 0) {
                                                        if (!validateForm()) return;
                                                        const userInput = formData.texto_base;
                                                        if (!userInput) {
                                                            setFormError("O campo de texto base é obrigatório.");
                                                            return;
                                                        }
                                                        textToCopy = `${staticPromptToCopy}\n\n--- CONTEÚDO PARA ANÁLISE ---\n${userInput}`;
                                                    } else {
                                                        textToCopy = staticPromptToCopy;
                                                    }
                                                } else if (currentModel.fields.length > 0) {
                                                    if (!validateForm()) return;
                                                    textToCopy = formData.texto_base;
                                                    if (!textToCopy) {
                                                        setFormError("O campo de texto base é obrigatório.");
                                                        return;
                                                    }
                                                }
                                            
                                                if (isCopyAction && textToCopy) {
                                                    navigator.clipboard.writeText(textToCopy).then(() => {
                                                        setCopySuccessId(ai.name);
                                                        setTimeout(() => setCopySuccessId(null), 2000);
                                                        window.open(ai.url, '_blank', 'noopener,noreferrer');
                                                    }).catch(err => {
                                                        console.error('Failed to copy text: ', err);
                                                        setFormError('Falha ao copiar o texto.');
                                                    });
                                                } else { // Fallback for models without copy action
                                                    window.open(ai.url, '_blank', 'noopener,noreferrer');
                                                }
                                            };

                                            const buttonText = isCopyAction ? `Copiar e Abrir no ${ai.name}` : `Abrir ${ai.name}`;
                                            const successText = isCopyAction ? `Copiado! Abrindo ${ai.name}...` : `Abrindo ${ai.name}...`;
                                            const isButtonDisabled = isLoading || (currentModel.value !== 'busca_acordo_inss' && currentModel.fields.length > 0 && !formData.texto_base?.trim());

                                            return (
                                                <button
                                                    key={ai.name}
                                                    onClick={handleExternalAction}
                                                    disabled={isButtonDisabled}
                                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                                        copySuccessId === ai.name 
                                                            ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' 
                                                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }`}
                                                >
                                                    <span className="text-xl">{ai.icon}</span>
                                                    <span className="font-semibold">{copySuccessId === ai.name ? successText : buttonText}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })()
                        }
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={cardClasses}>
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{isLoteCategory ? '1. Configuração do Lote' : `1. Selecione o Modelo - ${currentCategory}`}</h2>
                                {!isLoteCategory && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Escolha um modelo de documento para preencher o formulário.
                                    </p>
                                )}
                            </div>
                            {!isLoteCategory && (
                                <button onClick={handleToggleFavorite} className="p-2 -mr-2 -mt-1 text-gray-400 hover:text-yellow-500 transition-colors">
                                    {isCurrentModelFavorite ? <StarIconSolid className="h-6 w-6 text-yellow-500" /> : <StarIconOutline className="h-6 w-6" />}
                                </button>
                            )}
                        </div>

                        {!isLoteCategory && (
                            <div className="relative mt-4">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar modelos..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full p-2 pl-10 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>
                        )}
                        
                        {!isLoteCategory && (
                            <div className="mt-4 max-h-60 overflow-y-auto space-y-1 pr-1">
                                {favoriteModels.length > 0 && (
                                    <>
                                        {otherModels.length > 0 && <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-2 px-2">Favoritos</p>}
                                        {favoriteModels.map(model => renderModelButton(model))}
                                    </>
                                )}
                                {otherModels.length > 0 && favoriteModels.length > 0 && <hr className="border-gray-200 dark:border-gray-700 my-2"/>}
                                {otherModels.map(model => renderModelButton(model))}
                                {filteredModels.length === 0 && <p className="text-center text-sm text-gray-500 p-4">Nenhum modelo encontrado.</p>}
                            </div>
                        )}
                    </div>

                    {currentModel && (
                        <div className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{isLoteCategory ? `2. Preencha os Dados para: ${currentModel.label}` : '2. Preencha os Campos'}</h2>
                            <div className="space-y-5">
                                {currentModel.fields.map(field => renderField(field))}
                            </div>
                        </div>
                    )}

                    {currentModel && (
                         <div className={cardClasses}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {isLoteCategory ? '3. Gerar Documentos em Lote' : '3. Gerar Documento'}
                            </h2>
                            {formError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert"><p className="font-bold">Erro</p><p>{formError}</p></div>}
                           
                           {isLoteCategory ? (
                                <button onClick={() => onBatchGenerate(currentModel, formData)} disabled={isLoading} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg text-base hover:bg-brand-primary-dark flex items-center justify-center gap-2 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                                    {isLoading ? 'Gerando...' : 'Gerar Lote'}
                                </button>
                           ) : (
                                <div className="space-y-3">
                                    {currentModel.modelSpecificInstruction && (
                                        <button onClick={handleAutomaticGeneration} disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-base hover:bg-green-700 flex items-center justify-center gap-2 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                                            {isLoading && generatingAiId === 'automatic-local' ? 'Gerando...' : '⚡ Gerar com Template (Automático)'}
                                        </button>
                                    )}

                                    {integratedAis.map(ai => (
                                        <button key={ai.id} onClick={() => handleGenerationClick(ai)} disabled={isLoading} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg text-base hover:bg-brand-primary-dark flex items-center justify-center gap-3 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                                            {isLoading && generatingAiId === ai.id ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Gerando...
                                                </>
                                            ) : (
                                                <>{ai.icon} Gerar com {ai.name}</>
                                            )}
                                        </button>
                                    ))}
                                    
                                    {externalAis.length > 0 && (
                                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">Ou use uma IA externa (copia o prompt e abre em nova aba):</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {externalAis.map(ai => (
                                                    <button key={ai.id} onClick={() => handleGenerationClick(ai)} disabled={isLoading} className={`p-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${copySuccessId === ai.id ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                                        <span className="text-lg">{ai.icon}</span>
                                                        <span className="font-semibold text-sm">{copySuccessId === ai.id ? 'Copiado!' : ai.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                           )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Fix: Add default export for FormColumn component.
export default FormColumn;
import React from 'react';
import { DocumentCategory, DocumentModel, Settings, FormField } from './types';

export const APP_VERSION = '1.0.0';
export const MIGRATION_VERSION = '1.0.0';

export const DEFAULT_DOCUMENT_HEADER_HTML = `<p style="text-align: center; font-size: 11pt; margin: 0; padding:0; line-height: 1.15;"><strong>PODER JUDICIÁRIO DO ESTADO DE MINAS GERAIS</strong></p>
<p style="text-align: center; font-size: 11pt; margin: 0; padding:0; line-height: 1.15;"><strong>COMARCA DE RAUL SOARES</strong></p>
<p style="text-align: center; font-size: 11pt; margin: 0; padding:0; line-height: 1.15;">Avenida Governador Valadares, nº 100 – Centro – Raul Soares/MG – CEP: 36.350-000</p>
<p style="text-align: center; font-size: 11pt; margin: 0; padding:0; line-height: 1.15;">E-mail: rss1secretaria@tjmg.jus.br</p>
<br>
<hr>
<br>`;

// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const SettingsIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313.686-.645.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.075.124.072-.044.146-.087.22-.127.332-.183.582-.495.645.87l.213-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const TrashIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09.921-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const BookOpenIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const ClipboardDocumentIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const SunIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const MoonIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25c0 5.385 4.365 9.75 9.75 9.75 2.806 0 5.347-1.257 7.152-3.198z" /></svg>;
// Fix: Replaced React.FC and React.SVGProps with a simple function definition to avoid errors from missing types.
export const SparklesIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456-2.456zM18 13.5a3.375 3.375 0 00-2.455 2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035.259a3.375 3.375 0 00-2.456-2.456z" /></svg>;

export const DocumentCheckIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12.75h4.5d M9.75 15.75l1.5 1.5 3-3m-4.5-6.75h1.5" /></svg>;
export const EnvelopeIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
export const KeyIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
export const ScaleIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.131.325c-2.926 0-5.584-.933-7.818-2.555m-3.921.255a48.428 48.428 0 00-3-.52c-1 .134-2.003.317-3 .52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.131.325c-2.926 0-5.584-.933-7.818-2.555m13.5-9.328c-1.355.386-2.825.64-4.32.746m-4.32-.746c-1.495-.106-2.965-.36-4.32-.746m0 0l-2.62 10.726" /></svg>;
export const PencilSquareIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
export const ArrowsRightLeftIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 6.5m0 0L16.5 11M21 6.5H3" /></svg>;
export const GavelIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21h12v2H1zM5.24 8.07l2.83 2.83-2.83 2.83-2.83-2.83 2.83-2.83zM14.27 1l-8.48 8.48 4.24 4.24 8.48-8.48-4.24-4.24zM12.86 2.41l2.83 2.83-8.48 8.48-2.83-2.83L12.86 2.41z"/></svg>;
export const MagnifyingGlassIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>;
export const DocumentDuplicateIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.375 0a9.069 9.069 0 00-1.5-.124m-7.5 0a9.069 9.069 0 01-1.5.124m-7.5 0h7.5m-7.5 0a9.063 9.063 0 01-1.5.124" /></svg>;


export const DEFAULT_SYSTEM_INSTRUCTION = `
# 🎯 MISSÃO: ASSISTENTE JURÍDICO PROATIVO (TJMG)

**Sua Função:** Você é um assistente jurídico especializado, operando sob as normas da Comarca de Raul Soares/MG. Sua missão é analisar o input do usuário para determinar o estado atual de um processo e, de forma autônoma, gerar o documento do próximo ato ordinatório necessário para impulsionar o andamento processual.

---

### # 1. ESTRUTURA DE SAÍDA OBRIGATÓRIA (JSON)

Sua resposta DEVE ser um único objeto JSON válido, sem nenhum texto, markdown ou caracteres de escape fora dele. Aderir estritamente à estrutura abaixo é crucial.

\`\`\`json
{
  "metadados": {
    "tipo_documento": "String (Ex: 'Certidão', 'Ato Ordinatório')",
    "modelo_usado": "String (O nome do modelo que você inferiu e utilizou)",
    "processo": "String (O número do processo, se fornecido, ou null)",
    "assinante": "String (Nome completo do servidor que assina o documento)",
    "data_elaboracao": "String (Data no formato DD/MM/AAAA)",
    "campos_faltantes": ["String (Lista de marcadores [PREENCHER: ...] que você inseriu no texto)"]
  },
  "evidencias": {
    "fontes_consultadas": [
      { 
        "tipo": "String (Ex: 'Input do Usuário', 'Pesquisa Externa')", 
        "conteudo": "String (Resumo ou trecho relevante da fonte utilizada)",
        "url": "String | null", 
        "titulo": "String | null", 
        "data_acesso": "String | null"
      }
    ]
  },
  "pendencias": ["String (Liste aqui problemas lógicos ou informações essenciais ausentes que impedem a correta elaboração do ato, diferente de simples campos a preencher. Ex: 'Não foi possível determinar o endereço para intimação.')"],
  "texto_documento": "String (O texto completo do documento gerado. Use '\\\\n\\\\n' para separar parágrafos.)"
}
\`\`\`

---

### # 2. LÓGICA DE DECISÃO CENTRAL (FLUXO PROATIVO)

Sua principal tarefa é dar o próximo passo no processo.

*   **SE** o input do usuário descrever um **ATO CONCLUÍDO** (ex: uma certidão de triagem que aponta ausência de custas, uma certidão de juntada de um AR negativo):
    *   **ENTÃO** sua tarefa é:
        1.  **Analisar** o resultado do ato (ex: "custas não foram pagas", "intimação falhou").
        2.  **Determinar** o **PRÓXIMO** ato ordinatório cabível (ex: intimar o autor a pagar as custas, intimar a parte a fornecer novo endereço).
        3.  **Gerar** o documento que **EXECUTA** e certifica este **NOVO** ato.

*   **SE** o input do usuário for uma **ORDEM DIRETA** ou um pedido de uma parte/advogado (ex: "intime-se a parte ré para contestar", "defiro o pedido de vista dos autos", "advogado requer habilitação"):
    *   **ENTÃO** sua tarefa é:
        1.  **Interpretar** o pedido como uma instrução a ser cumprida.
        2.  **Praticar** o ato ordinatório que executa essa ordem.
        3.  **Gerar** o documento (geralmente uma certidão) que formaliza a **EXECUÇÃO** desse ato.

O documento que você produz é sempre o **próximo passo lógico e necessário**.

---

### # 3. DIRETRIZES DE CONTEÚDO E FORMATAÇÃO

*   **DADOS AUSENTES:** Se uma informação essencial para o ato não for fornecida, insira um placeholder claro no \`texto_documento\` (ex: \`[PREENCHER: Endereço completo da parte ré]\`) e adicione a string exata do placeholder ao array \`campos_faltantes\`. **Evite criar placeholders para informações que não são estritamente necessárias para o ato específico**, como qualificação de advogados em atos simples. **PROIBIÇÃO IMPORTANTE:** NUNCA gere o placeholder \`[PREENCHER: Nome completo da parte autora]\`; em vez disso, use a expressão "a parte autora". **PROIBIÇÃO ADICIONAL:** NUNCA insira placeholders para dados de advogados, como \`[PREENCHER: Nome do procurador da parte e OAB]\`. Se o nome do advogado for necessário e não fornecido, omita essa informação do documento.
*   **FUNDAMENTAÇÃO LEGAL (REGRA ESSENCIAL):** Para qualquer ato ordinatório que você praticar, o documento gerado (tipicamente uma Certidão) **DEVE** iniciar com a base legal explícita, citando o artigo relevante do **Provimento 355/2018/CGJ-MG** e, quando aplicável, do **Código de Processo Civil**. A omissão da base legal é uma falha.
*   **TEMPO VERBAL (REGRA ESSENCIAL):** O verbo principal que descreve a ação deve estar no **presente do indicativo na primeira pessoa do singular**. Você está executando o ato no momento da certificação.
    *   **Correto:** "Com fundamento em..., **certifico** que **procedo** à intimação...", "**intimo** a parte...", "**remeto** os autos...".
    *   **Incorreto:** "Foi certificado...", "Os autos foram remetidos...".
*   **ESTILO E TOM:**
    *   Use linguagem jurídica formal, culta, objetiva e impessoal.
    *   Transcreva integralmente os dados de qualificação (nomes, documentos, endereços).
    *   Use datas por extenso no corpo do texto (ex: "10 de setembro de 2024").
    *   **PROIBIÇÃO DE TEXTO:** NUNCA inclua a frase "A presente intimação será publicada no Diário do Judiciário Eletrônico (DJe)." ou variações dela em nenhum documento. A publicação é um ato processual subsequente e não deve ser certificado no ato ordinatório em si.
`;

const createStandardFields = (orderTextDefaultValue?: string): FormField[] => ([
    { id: 'processData', label: '1️⃣ Número do Processo', type: 'text', placeholder: 'ex: 0001234-56.2024.8.13.0000', required: false },
    { id: 'orderText', label: '2️⃣ Ato / Pedido / Ordem Judicial', type: 'textarea', placeholder: 'Cole aqui o texto...', defaultValue: orderTextDefaultValue || '', required: true },
    { id: 'serverName', label: '3️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome completo do servidor', required: true },
    { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true },
    { id: 'documentLocation', label: 'Local (para data)', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
    { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true },
]);

const certidaoDistribuicaoFields: FormField[] = [
    { id: 'processo_origem', label: '1️⃣ Nº Documento de Origem (Processo/REDS)', type: 'text', placeholder: 'Nº do processo ou REDS', required: true },
    { id: 'serverName', label: '2️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome completo do servidor', required: true },
    { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true },
    { id: 'documentLocation', label: 'Local (para data)', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
    { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true },
];

const advogadoFields: FormField[] = [
    { id: 'processData', label: '1️⃣ Número do Processo', type: 'text', placeholder: 'ex: 0001234-56.2024.8.13.0000', required: true },
    { id: 'nome_advogado', label: '2️⃣ Nome do(a) Advogado(a)', type: 'text', placeholder: 'Nome completo do advogado', required: true },
    { id: 'uf_oab', label: '3️⃣ UF da OAB', type: 'text', placeholder: 'Ex: MG', required: true, defaultValue: 'MG' },
    { id: 'numero_oab', label: '4️⃣ Número da OAB', type: 'text', placeholder: 'Ex: 123456', required: true },
    { id: 'serverName', label: '5️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome completo do servidor', required: true },
    { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true },
    { id: 'documentLocation', label: 'Local (para data)', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
    { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true },
];

const allCertidoes: DocumentModel[] = [
    { 
      label: "Genérica (Uso Livre)", 
      value: "certidao_generica", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\nCertifico e dou fé que {{orderText}}\n\nO referido é verdade e dou fé.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
        label: "Distribuição de Carta Precatória",
        value: "certidao_distribuicao_cp",
        fields: certidaoDistribuicaoFields,
        modelSpecificInstruction: `CERTIDÃO DE DISTRIBUIÇÃO DE CARTA PRECATÓRIA\n\nCertifico que foi promovida a distribuição da carta precatória extraída do processo nº {{processo_origem}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\nDocumento assinado eletronicamente.`
    },
    { 
        label: "Distribuição de REDS (TCO)",
        value: "certidao_distribuicao_reds",
        fields: certidaoDistribuicaoFields,
        modelSpecificInstruction: `CERTIDÃO DE DISTRIBUIÇÃO DE REDS (TCO)\n\nCertifico que foi promovida a distribuição do REDS (TCO) extraído do processo nº {{processo_origem}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\nDocumento assinado eletronicamente.`
    },
    {
        label: "Habilitação de Advogado (Oficial)",
        value: "certidao_habilitacao_advogado_oficial",
        fields: advogadoFields,
        modelSpecificInstruction: `CERTIDÃO DE HABILITAÇÃO DE ADVOGADO\n\nCertifico que habilitei nos autos do processo nº {{processData}}, o(a) Dr(a). {{nome_advogado}}, OAB/{{uf_oab}} nº {{numero_oab}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}\n\n{{serverName}}\n{{serverRole}}\nDocumento assinado eletronicamente.`
    },
    {
        label: "Descadastramento de Advogado",
        value: "certidao_descadastramento_advogado",
        fields: advogadoFields,
        modelSpecificInstruction: `CERTIDÃO DE DESCADASTRAMENTO DE ADVOGADO\n\nCertifico que, nesta data, procedo ao descadastramento do(a) Dr(a). {{nome_advogado}}, OAB/{{uf_oab}} nº {{numero_oab}}, dos autos do processo nº {{processData}}, conforme solicitação apresentada e nos termos do art. 64, inc. II, alínea “b”, do Provimento nº 355/2018 da CGJ/TJMG e do art. 152, VI, do Código de Processo Civil.\nAto ordinatório praticado de ofício, sujeito à revisão judicial nos termos do parágrafo único do art. 63 do referido Provimento.\n\n{{documentLocation}}, {{issueDate_por_extenso}}\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Cálculo de Custas", 
      value: "certidao_calculo_custas", 
      fields: createStandardFields("Remessa dos autos à Contadoria Judicial para cálculo das custas processuais."),
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\nCertifico e dou fé que, nesta data, procedo à {{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Certidão de Promoção", 
      value: "certidao_promocao",
      fields: createStandardFields("faço estes autos conclusos ao MM. Juiz de Direito para apreciação da petição juntada Ids(10551386834 e 10554516004) , na qual as procuradoras da parte autora e requerida informam renúncia ao mandato outorgado."),
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\nCertifico e dou fé que {{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Curatela / Guarda", 
      value: "certidao_curatela_guarda",
      fields: [
          { id: 'processo_no', label: '1️⃣ Nº do Processo', type: 'text', required: true },
          { id: 'classe_partes', label: '2️⃣ Classe e Partes', type: 'textarea', placeholder: 'Ex: Classe: [Classe], Partes: [Nomes]', required: true },
          { id: 'id_livro', label: '3️⃣ ID do Livro e Data', type: 'text', placeholder: 'Ex: Termo registrado em livro próprio (ID [Número]), lavrado em [Data]', required: true },
          { id: 'curador_qualificacao', label: '4️⃣ Curador/Guardião (Nome e qualificação)', type: 'textarea', required: true },
          { id: 'curatelado_dados', label: '5️⃣ Curatelado/Menor (Nome e dados)', type: 'textarea', required: true },
          { id: 'obrigacoes', label: '6️⃣ Obrigações do compromissado', type: 'textarea', placeholder: 'Copie aqui integralmente o compromisso assumido...', required: true },
          { id: 'serverName', label: '7️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome completo do servidor', required: true },
          { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true },
          { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true },
          { id: 'documentLocation', label: 'Local (para data)', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
      ],
      modelSpecificInstruction: `CERTIDÃO DE [CURATELA/GUARDA] [PROVISÓRIA/DEFINITIVA]\n\n{{processo_bloco}}\n\n{{classe_partes}}\n\nCertifico, para os devidos fins, que o presente termo de compromisso foi extraído dos autos em epígrafe. {{id_livro}}.\n\nCOMPROMISSADO(A): {{curador_qualificacao}}\n\nBENEFICIÁRIO(A): {{curatelado_dados}}\n\nOBRIGAÇÕES: {{obrigacoes}}\n\nO referido é verdade e dou fé.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Inventário (Formalidades Cumpridas)", 
      value: "certidao_inventario", 
      fields: createStandardFields("Certifico que todas as formalidades legais foram cumpridas. "), 
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Remessa ao TJMG", 
      value: "certidao_remessa_tjmg", 
      fields: createStandardFields("Remessa dos autos para a instância superior para julgamento do recurso interposto."),
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\nCertifico e dou fé que procedo à {{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Remessa ao TRF 6ª Região", 
      value: "certidao_remessa_trf6", 
      fields: createStandardFields("Remessa dos autos para a instância superior para julgamento do recurso interposto."),
      modelSpecificInstruction: `CERTIDÃO\n\n{{processo_bloco}}\n\nCertifico e dou fé que procedo à {{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
];

const allAtos: DocumentModel[] = [
    { 
      label: "Alvará via DEPOX (Intimação para fornecer dados bancários)", 
      value: "ato_alvara_depox_fornecer_dados", 
      fields: createStandardFields("Intimação para fornecer os dados bancários e pessoais para expedição do alvará."), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Ato Genérico", 
      value: "ato_generico", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Bloqueio SISBAJUD (Partes com Advogado)", 
      value: "ato_intimacao_bloqueio_sisbajud_com_advogado", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Bloqueio SISBAJUD (Recolher Custas para Intimação)", 
      value: "ato_intimacao_bloqueio_sisbajud_recolher_custas", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Ciência da Pesquisa de Bens", 
      value: "ato_intimacao_ciencia_pesquisa_bens", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Complementar Custas (Sistemas Conveniados)", 
      value: "ato_intimacao_complementar_custas_sistemas", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Dar Andamento (Sob Pena de Extinção/Arquivamento)", 
      value: "ato_intimacao_dar_andamento_sob_pena_extincao", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Devolução de Mandado sem Cumprimento", 
      value: "ato_intimacao_devolucao_mandado_sem_cumprimento", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Distribuir Carta Precatória", 
      value: "ato_intimacao_distribuir_carta_precatoria", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Emissão de Certidão (Art. 828 CPC)", 
      value: "ato_intimacao_emissao_certidao_828", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Nomeação de Curador Especial / Defensor Dativo", 
      value: "ato_intimacao_nomeacao_curador_especial", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Penhora SISBAJUD (Manifestação)", 
      value: "ato_intimacao_penhora_sisbajud_manifestacao", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Intimação - Recolher Custas Iniciais", 
      value: "ato_intimacao_recolher_custas_iniciais", 
      fields: [
        { id: 'processData', label: '1️⃣ Número do Processo', type: 'text', placeholder: 'ex: 0001234-56.2024.8.13.0000', required: false },
        { id: 'orderText', label: '2️⃣ Ato / Pedido / Ordem Judicial (Opcional)', type: 'textarea', placeholder: 'Cole aqui um texto adicional, se houver...', defaultValue: '', required: false },
        { id: 'serverName', label: '3️⃣ Nome do Servidor (Assinatura)', type: 'text', placeholder: 'Nome completo do servidor', required: true },
        { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true },
        { id: 'documentLocation', label: 'Local (para data)', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
        { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true }
      ], 
      modelSpecificInstruction: `Ato ordinatório\n\nAto ordinatório praticado nos termos do art. 64, inciso I, alínea “d”, do Provimento nº 355/2018 da Corregedoria-Geral de Justiça do Estado de Minas Gerais, e do art. 152, inciso VI, combinado com o §4º do art. 203 do Código de Processo Civil, sujeito à revisão judicial.\n\nCertifico que intimo a parte autora para, no prazo de 15 (quinze) dias, comprovar o recolhimento das custas iniciais{{orderText}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
    { 
      label: "Vista de Documentos (Especificar ou colar conteúdo)", 
      value: "ato_vista_documentos_especificar_conteudo", 
      fields: createStandardFields(), 
      modelSpecificInstruction: `ATO ORDINATÓRIO\n\n{{processo_bloco}}\n\n{{orderText}}\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`
    },
];

const allOficios: DocumentModel[] = [
    {
        label: "Ofício - Desconto de Pensão Alimentícia",
        value: "oficio_desconto_pensao",
        fields: [
            { id: 'comarca_vara', label: 'Nome da Comarca/Vara', type: 'text', required: true, defaultValue: 'Vara Única da Comarca de Raul Soares/MG' },
            { id: 'processo_no', label: 'Processo Judicial nº', type: 'text', required: true, placeholder: 'Número do processo' },
            { id: 'empresa_destinataria', label: 'Empresa/Órgão Destinatário', type: 'text', required: true, placeholder: 'Nome da empresa ou órgão pagador' },
            { id: 'responsavel_destinatario', label: 'Responsável (Destinatário)', type: 'text', required: false, placeholder: 'Ex: Diretor(a) de RH (opcional)' },
            { id: 'endereco_destinatario', label: 'Endereço Completo (Destinatário)', type: 'textarea', required: true, placeholder: 'Rua, número, bairro, cidade, UF, CEP' },
            { id: 'alimentante_nome', label: 'Alimentante (Qualificação Completa)', type: 'textarea', required: true, placeholder: 'Informe a qualificação completa do alimentante: nome, nacionalidade, estado civil, profissão, RG, CPF, endereço...' },
            { id: 'percentual_desconto', label: 'Percentual de Desconto (número)', type: 'text', required: true, placeholder: 'Ex: 20' },
            { id: 'percentual_extenso', label: 'Percentual por Extenso', type: 'text', required: true, placeholder: 'Ex: vinte' },
            { id: 'alimentando_nome', label: 'Alimentando (Qualificação Completa)', type: 'textarea', required: true, placeholder: 'Informe a qualificação completa do beneficiário: nome, data de nascimento, filiação, CPF...' },
            { id: 'titular_conta', label: 'Titular da Conta', type: 'text', required: true },
            { id: 'cpf_titular_conta', label: 'CPF do Titular da Conta', type: 'text', required: true },
            { id: 'genitor_dados', label: 'Genitor(a) do Alimentando (se representante e titular da conta)', type: 'textarea', placeholder: 'Se o titular da conta for o genitor/representante, informe aqui a qualificação completa dele(a).', required: false },
            { id: 'banco_deposito', label: 'Banco (para depósito)', type: 'text', required: true },
            { id: 'agencia_deposito', label: 'Agência (para depósito)', type: 'text', required: true },
            { id: 'conta_deposito', label: 'Conta (para depósito)', type: 'text', required: true },
            { id: 'operacao_deposito', label: 'Operação (se houver)', type: 'text', required: false, placeholder: 'Ex: 013 para Poupança CEF' },
            { id: 'documentLocation', label: 'Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: 'Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: 'Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
        ],
        modelSpecificInstruction: `OFÍCIO JUDICIAL

PODER JUDICIÁRIO
{{comarca_vara}}

Processo nº: {{processo_no}}
Assunto: Cumprimento de Decisão Judicial – Desconto em Folha de Pagamento a Título de Alimentos.

DESTINATÁRIO:
Ilmo(a). Senhor(a) {{responsavel_destinatario}}
{{empresa_destinataria}}
{{endereco_destinatario}}

PREÂMBULO E DETERMINAÇÃO

Senhor(a) Dirigente,
Em cumprimento à Decisão Judicial proferida nos autos do processo em epígrafe, que tramita neste Juízo, e com fundamento no artigo 529 do Código de Processo Civil, c/c a Lei nº 5.478/68 (Lei de Alimentos), DETERMINO a Vossa Senhoria que adote as providências necessárias para o estrito cumprimento desta ordem, nos termos a seguir detalhados.

I. IDENTIFICAÇÃO E INFORMAÇÃO PRÉVIA
1. Confirmação do Vínculo:
No prazo improrrogável de 05 (cinco) dias úteis, Vossa Senhoria deverá informar a este Juízo se o(a) indivíduo a seguir qualificado(a) integra o quadro funcional, é beneficiário(a) ou mantém qualquer vínculo remuneratório sob a responsabilidade da Entidade que Vossa Senhoria representa:
Alimentante (Devedor):
{{alimentante_nome}}

II. ORDEM DE DESCONTO E BASE DE CÁLCULO
2. Procedimento de Desconto:
Em caso de confirmação positiva do vínculo, DEVERÁ ser efetuado o desconto mensal na folha de pagamento ou benefício do(a) Alimentante, a título de Pensão Alimentícia, observando-se as seguintes condições:

- Percentual: {{percentual_desconto}}% ({{percentual_extenso}}) dos Rendimentos Líquidos percebidos.
- Base de Incidência (Rendimentos Brutos): O desconto incidirá sobre a totalidade dos rendimentos, incluindo-se, sem limitação, salário, férias, terço constitucional, gratificação natalina (13º salário), adicionais (noturno, insalubridade, periculosidade, etc.) e verbas rescisórias.
- Exclusão da Base de Cálculo: Excluem-se da base de cálculo apenas as parcelas de natureza indenizatória, tais como o Fundo de Garantia por Tempo de Serviço (FGTS), diárias e auxílio-alimentação.
- Prazo: O desconto deverá ser processado e o valor depositado até o 5º (quinto) dia útil de cada mês.

III. INFORMAÇÕES DO(A) BENEFICIÁRIO(A) E CONTA PARA DEPÓSITO
3. Identificação do(a) Beneficiário(a) (Alimentando):
A pensão alimentícia destina-se ao(s) seguinte(s) beneficiário(s):
Alimentando (Beneficiário):
{{alimentando_nome}}

4. Dados Bancários para Repasse:
O valor descontado deverá ser repassado, mediante depósito identificado, para a conta bancária abaixo especificada.
Titular da Conta: {{titular_conta}} (CPF: {{cpf_titular_conta}})
Qualificação do Titular (se representante legal): {{genitor_dados}}

Dados da Conta:
Banco: {{banco_deposito}}
Agência: {{agencia_deposito}}
Conta Corrente/Poupança: {{conta_deposito}}
Operação: {{operacao_deposito}}

{{documentLocation}}, {{issueDate_por_extenso}}.

\n\nAtenciosamente,

(Assinado Eletronicamente)

{{nome_juiz}}{{customJudgeName}}
Juiz(a) de Direito
{{comarca_vara}}`
    },
    {
        label: "Ofício - Genérico (Ass. Juiz)",
        value: "oficio_generico_juiz",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo Judicial nº', type: 'text', required: true, placeholder: 'Número do processo' },
            { id: 'destinatario_endereco', label: '2️⃣ Destinatário', type: 'textarea', placeholder: 'Instituição\nResponsável (se houver)\nEndereço Completo\nCidade-UF, CEP', required: true },
            { id: 'dados_parte_envolvida', label: '3️⃣ Dados da Parte Envolvida', type: 'textarea', placeholder: 'Nome Completo: [NOME]\nCPF/CNPJ: [NÚMERO]\nOutro Documento: [DADO]', required: true },
            { id: 'finalidade', label: '4️⃣ Ordem Judicial Específica', type: 'textarea', placeholder: 'Descrever a ordem judicial a ser cumprida. Ex: "Proceder ao BLOQUEIO de ativos financeiros até o limite de R$ [VALOR]..."', required: true },
            { id: 'prazo_cumprimento', label: '5️⃣ Prazo para Cumprimento', type: 'text', placeholder: 'Ex: 5 (cinco) dias úteis', required: true },
            { id: 'documentLocation', label: '6️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '7️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '8️⃣ Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
        ],
        modelSpecificInstruction: `OFÍCIO JUDICIAL

{{processo_bloco}}

DESTINATÁRIO:
{{destinatario_endereco}}

PREÂMBULO E DETERMINAÇÃO

Senhor(a):
Em cumprimento à Decisão Judicial proferida nos autos do processo em epígrafe, que tramita neste Juízo, e com fundamento na legislação aplicável à matéria, DETERMINO a Vossa Senhoria que adote as providências necessárias para o estrito cumprimento desta ordem, nos termos a seguir detalhados.

I. IDENTIFICAÇÃO E INFORMAÇÕES DO PROCESSO

Para a correta identificação da ordem e do objeto da solicitação, seguem os dados da parte envolvida:
{{dados_parte_envolvida}}

II. ORDEM JUDICIAL ESPECÍFICA E PRAZO

1. Ordem Judicial:
Vossa Senhoria deverá, conforme o teor da decisão, cuja cópia segue anexa (se for o caso), e que se resume na seguinte determinação:
{{finalidade}}

2. Prazo para Cumprimento:
O cumprimento desta ordem deverá ser realizado no prazo improrrogável de {{prazo_cumprimento}}, a contar do recebimento deste Ofício.

III. DEVER DE INFORMAR E ADVERTÊNCIA LEGAL

3. Prestação de Informações:
Após o cumprimento da ordem, a Entidade destinatária deverá, no mesmo prazo estabelecido no item 2, juntar aos autos deste processo:
Comprovação do Cumprimento: Documento que demonstre a efetivação da ordem judicial (Ex: Comprovante de bloqueio, Relatório de informações solicitadas, etc.).
Justificativa de Impossibilidade: Em caso de impossibilidade de cumprimento total ou parcial, apresentar justificativa pormenorizada e fundamentada.

4. Advertência:
Fica Vossa Senhoria CIENTIFICADO(A) de que o descumprimento injustificado ou o atraso na efetivação desta ordem e na prestação das informações solicitadas sujeitará o(a) responsável às sanções cíveis e criminais previstas no ordenamento jurídico, especialmente o crime de Desobediência (Art. 330 do Código Penal), sem prejuízo da aplicação de multa coercitiva.

{{documentLocation}}, {{issueDate_por_extenso}}.

\n\nAtenciosamente,

(Assinado Eletronicamente)

{{nome_juiz}}{{customJudgeName}}
Juiz(a) de Direito`
    },
    {
        label: "Ofício - Genérico (Ass. Servidor)",
        value: "oficio_generico_servidor",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo Judicial nº', type: 'text', required: true, placeholder: 'Número do processo' },
            { id: 'destinatario_endereco', label: '2️⃣ Destinatário', type: 'textarea', placeholder: 'Instituição\nResponsável (se houver)\nEndereço Completo\nCidade-UF, CEP', required: true },
            { id: 'dados_parte_envolvida', label: '3️⃣ Dados da Parte Envolvida', type: 'textarea', placeholder: 'Nome Completo: [NOME]\nCPF/CNPJ: [NÚMERO]\nOutro Documento: [DADO]', required: true },
            { id: 'finalidade', label: '4️⃣ Ordem Judicial Específica', type: 'textarea', placeholder: 'Descrever a ordem judicial a ser cumprida. Ex: "Proceder ao BLOQUEIO de ativos financeiros até o limite de R$ [VALOR]..."', required: true },
            { id: 'prazo_cumprimento', label: '5️⃣ Prazo para Cumprimento', type: 'text', placeholder: 'Ex: 5 (cinco) dias úteis', required: true },
            { id: 'documentLocation', label: '6️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '7️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'serverName', label: '8️⃣ Assinatura do Servidor', type: 'text', placeholder: 'Nome do servidor que assina', required: true },
            { id: 'serverRole', label: 'Cargo do Servidor', type: 'text', placeholder: 'Ex: Oficial Judiciário', required: true }
        ],
        modelSpecificInstruction: `OFÍCIO

{{processo_bloco}}
Assunto: Cumprimento de Decisão Judicial

DESTINATÁRIO:
{{destinatario_endereco}}

PREÂMBULO E DETERMINAÇÃO

Senhor(a):
Por determinação judicial exarada nos autos do processo em epígrafe, que tramita neste Juízo, e com fundamento na legislação aplicável à matéria, INTIMO Vossa Senhoria para o estrito cumprimento da ordem, nos termos a seguir detalhados.

I. IDENTIFICAÇÃO E INFORMAÇÕES DO PROCESSO

Para a correta identificação da ordem e do objeto da solicitação, seguem os dados da parte envolvida:
{{dados_parte_envolvida}}

II. ORDEM JUDICIAL ESPECÍFICA E PRAZO

1. Ordem Judicial:
Vossa Senhoria deverá, conforme o teor da decisão, cuja cópia segue anexa (se for o caso), e que se resume na seguinte determinação:
{{finalidade}}

2. Prazo para Cumprimento:
O cumprimento desta ordem deverá ser realizado no prazo improrrogável de {{prazo_cumprimento}}, a contar do recebimento deste Ofício.

III. DEVER DE INFORMAR E ADVERTÊNCIA LEGAL

3. Prestação de Informações:
Após o cumprimento da ordem, a Entidade destinatária deverá, no mesmo prazo estabelecido no item 2, juntar aos autos deste processo:
Comprovação do Cumprimento: Documento que demonstre a efetivação da ordem judicial (Ex: Comprovante de bloqueio, Relatório de informações solicitadas, etc.).
Justificativa de Impossibilidade: Em caso de impossibilidade de cumprimento total ou parcial, apresentar justificativa pormenorizada e fundamentada.

4. Advertência:
Fica Vossa Senhoria CIENTIFICADO(A) de que o descumprimento injustificado ou o atraso na efetivação desta ordem e na prestação das informações solicitadas sujeitará o(a) responsável às sanções cíveis e criminais previstas no ordenamento jurídico, especialmente o crime de Desobediência (Art. 330 do Código Penal), sem prejuízo da aplicação de multa coercitiva.

{{documentLocation}}, {{issueDate_por_extenso}}.

\n\nAtenciosamente,

(Assinado Eletronicamente)

{{serverName}}
{{serverRole}}
`,
    }
];

const allAlvaras: DocumentModel[] = [
    {
        label: "Alvará Judicial - Genérico",
        value: "alvara_generico",
        fields: [
            { id: 'processData', label: '1️⃣ Número do Processo', type: 'textarea', placeholder: 'Nº do processo, nome das partes, etc.', required: true },
            { id: 'instituicao_destinataria', label: '2️⃣ Instituição Destinatária', type: 'textarea', placeholder: 'Nome da instituição e endereço completo', required: true },
            { id: 'finalidade', label: '3️⃣ Finalidade do Alvará', type: 'textarea', placeholder: 'Descrever a finalidade ou colar a determinação judicial...', required: true },
            { id: 'documentLocation', label: '4️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '5️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '6️⃣ Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'typingServerName', label: '7️⃣ Servidor que digitou', type: 'text', placeholder: 'Nome de quem digitou', required: false },
        ],
        modelSpecificInstruction: `ALVARÁ JUDICIAL\n\n{{processo_bloco}}\n\n{{processData}}\n\nFINALIDADE: {{finalidade}}\n\nDESTINATÁRIO: {{instituicao_destinataria}}\n\nCumpra-se na forma da lei.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`,
    }
];

const allFormais: DocumentModel[] = [
    {
        label: "Formal de Partilha",
        value: "formal_partilha",
        fields: [
            { id: 'processo_dados', label: '1️⃣ Dados do Processo', type: 'text', placeholder: 'Nº do processo, partes, etc.', required: true },
            { id: 'copia_sentenca', label: '2️⃣ Cópia integral da sentença', type: 'textarea', placeholder: 'Cole o texto da sentença aqui...', required: true },
            { id: 'data_sentenca', label: '3️⃣ Data da Sentença', type: 'date', required: true },
            { id: 'data_transito_julgado', label: '4️⃣ Data do trânsito em julgado', type: 'date', required: true },
            { id: 'copia_plano_partilha', label: '5️⃣ Cópia integral do plano de partilha', type: 'textarea', placeholder: 'Cole o plano de partilha aqui...', required: true },
            { id: 'copia_inicial', label: '6️⃣ Cópia integral da inicial', type: 'textarea', placeholder: 'Cole a petição inicial aqui...', required: true },
            { id: 'documentLocation', label: '7️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '8️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'typingServerName', label: '9️⃣ Servidor que digitou', type: 'text', placeholder: 'Nome de quem digitou', required: false },
            { id: 'serverName', label: '🔟 Nome do Servidor (Assinatura)', type: 'text', required: true },
            { id: 'serverRole', label: 'Cargo do Servidor (Assinatura)', type: 'text', required: true }
        ],
        modelSpecificInstruction: `FORMAL DE PARTILHA\n\n{{processo_bloco}}\n\nPEÇAS INCLUÍDAS:\n1. Petição Inicial:\n{{copia_inicial}}\n\n2. Plano de Partilha:\n{{copia_plano_partilha}}\n\n3. Sentença ({{data_sentenca}}):\n{{copia_sentenca}}\n\n4. Certidão de Trânsito em Julgado ({{data_transito_julgado}})\n\nExtraído dos autos do processo de inventário/arrolamento dos bens deixados por {{processo_dados}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{serverName}}\n{{serverRole}}\n(documento assinado eletronicamente)`,
    }
];

const allTermos: DocumentModel[] = [
    {
        label: "Termo de Compromisso (Genérico)",
        value: "termo_compromisso_generico",
        fields: [
            { 
                id: 'tipo_compromisso', 
                label: '1️⃣ Tipo de Compromisso', 
                type: 'radio', 
                options: ['MENOR', 'CURATELA', 'INVENTARIANTE', 'TESTAMENTÁRIA'], 
                defaultValue: 'MENOR', 
                required: true 
            },
            { 
                id: 'status_compromisso', 
                label: '2️⃣ Status (para Menor/Curatela)', 
                type: 'radio', 
                options: ['Definitiva', 'Provisória'], 
                defaultValue: 'Provisória',
                required: false 
            },
            { id: 'processo_dados', label: '3️⃣ Dados do Processo', type: 'textarea', placeholder: 'Nº do processo, partes, etc.', required: true },
            { id: 'copia_decisao', label: '4️⃣ Cópia integral da decisão', type: 'textarea', placeholder: 'Cole o texto da decisão que determinou a expedição do termo...', required: true },
            { id: 'id_decisao', label: '5️⃣ ID da Decisão', type: 'text', placeholder: 'ID do PJe onde a decisão foi juntada', required: true },
            { id: 'data_decisao', label: '6️⃣ Data da Decisão', type: 'date', required: true },
            { id: 'copia_inicial', label: '7️⃣ Cópia integral da inicial', type: 'textarea', placeholder: 'Cole a petição inicial aqui...', required: true },
            { id: 'documentLocation', label: '8️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '9️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '🔟 Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'typingServerName', label: '1️⃣1️⃣ Servidor que digitou', type: 'text', placeholder: 'Nome de quem digitou', required: false },
        ],
        modelSpecificInstruction: `TERMO DE COMPROMISSO DE {{tipo_compromisso}} {{status_compromisso}}\n\n{{processo_bloco}}\n{{processo_dados}}\n\nEm cumprimento à decisão (ID: {{id_decisao}}) proferida em {{data_decisao_por_extenso}}, nos autos do processo em epígrafe, extrai-se o presente termo.\n\nDECISÃO:\n{{copia_decisao}}\n\nCiente do compromisso, vai o presente termo assinado.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`,
    },
    {
        label: "Termo de Compromisso de Curatela (Provisória/Definitiva)",
        value: "termo_compromisso_curatela",
        fields: [
          { id: 'status_curatela', label: '1️⃣ Status da Curatela', type: 'radio', options: ['PROVISÓRIA', 'DEFINITIVA'], defaultValue: 'PROVISÓRIA', required: true },
          { id: 'processo_no', label: '2️⃣ Processo nº', type: 'text', required: true, placeholder: 'Número do processo' },
          { id: 'nome_juiz', label: '3️⃣ Juiz(a) da Decisão', type: 'select', lookup: 'judges', required: true },
          { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
          { id: 'id_decisao', label: '4️⃣ ID da Decisão no PJe', type: 'text', required: true },
          { id: 'compromissado_qualificacao', label: '5️⃣ Qualificação do(a) Compromissado(a) (Curador)', type: 'textarea', placeholder: '[NOME COMPLETO], nacionalidade, estado civil, profissão, RG nº [RG], CPF nº [CPF], residente em [endereço].', required: true },
          { id: 'compromissado_nome', label: '6️⃣ Nome do(a) Compromissado(a) (para assinatura)', type: 'text', required: true, placeholder: 'Apenas o nome completo.' },
          { id: 'compromissado_cpf', label: '7️⃣ CPF do(a) Compromissado(a) (para assinatura)', type: 'text', required: true, placeholder: 'Apenas o número do CPF.' },
          { id: 'curatelado_dados', label: '8️⃣ Qualificação do(a) Curatelado(a)', type: 'textarea', placeholder: '[NOME COMPLETO], qualificação completa (data de nascimento, estado civil, etc.), e endereço.', required: true },
          { id: 'documentLocation', label: '9️⃣ Comarca (Lavratura)', type: 'text', placeholder: 'Ex: Raul Soares', required: true },
          { id: 'issueDate', label: '🔟 Data de Lavratura', type: 'date', required: true },
        ],
        modelSpecificInstruction: `Processo nº: {{processo_no}}\n\nTERMO DE COMPROMISSO DE CURATELA {{status_curatela}}\n\nAos {{issueDate_por_extenso}}, nesta Comarca de {{documentLocation}}, nos autos da ação supracitada, e em cumprimento à decisão proferida pelo MM. Juiz de Direito, Dr(a). {{nome_juiz}}{{customJudgeName}}, constante do ID {{id_decisao}}, comparece:\n\nCompromissado(a): {{compromissado_qualificacao}}\n\nPelo presente termo, o(a) compromissado(a) assume a curatela de:\n\nCuratelado(a): {{curatelado_dados}}\n\nO(a) compromissado(a) declara, sob as penas da lei, estar ciente das obrigações legais e se compromete a:\n1. Representar o(a) curatelado(a) em todos os atos civis, patrimoniais e negociais, conforme os limites fixados judicialmente.\n2. Administrar os bens e interesses do(a) curatelado(a) com zelo e diligência.\n3. Prestar contas de sua administração sempre que solicitado pelo Juízo.\n4. Utilizar os recursos do(a) curatelado(a) prioritariamente para a satisfação de suas necessidades essenciais.\n5. Abster-se de praticar atos que exijam prévia autorização judicial.\n\nO(a) compromissado(a) reconhece que o descumprimento dessas obrigações poderá acarretar responsabilização civil, administrativa ou penal.\n\nE, para que produza seus efeitos legais, lavra-se o presente termo.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n\n_________________________________________\n{{compromissado_nome}}\nCPF: {{compromissado_cpf}}\n\n\n(Assinado Eletronicamente)\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`
    },
    {
        label: "Termo de Curatela (Completo)",
        value: "termo_compromisso_curatela_completo",
        fields: [
          { id: 'status_curatela', label: '1️⃣ Status da Curatela', type: 'radio', options: ['PROVISÓRIA', 'DEFINITIVA'], defaultValue: 'PROVISÓRIA', required: true },
          { id: 'processo_no', label: '2️⃣ Processo nº', type: 'text', required: true, placeholder: 'Número do processo' },
          { id: 'autor_processo', label: '3️⃣ Parte Autora', type: 'text', required: true, placeholder: 'Nome completo do(a) autor(a)' },
          { id: 'reu_processo', label: '4️⃣ Parte Ré (Curatelando)', type: 'text', required: true, placeholder: 'Nome completo do(a) réu/curatelando(a)' },
          { id: 'nome_juiz', label: '5️⃣ Juiz(a) da Decisão', type: 'select', lookup: 'judges', required: true },
          { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
          { id: 'id_decisao', label: '6️⃣ ID da Decisão no PJe', type: 'text', required: true },
          { id: 'data_decisao', label: '7️⃣ Data da Decisão', type: 'date', required: true },
          { id: 'texto_decisao', label: '8️⃣ Cópia do dispositivo da decisão', type: 'textarea', placeholder: 'Cole aqui a parte da decisão que nomeia o curador...', required: true },
          { id: 'compromissado_qualificacao', label: '9️⃣ Qualificação do(a) Compromissado(a) (Curador)', type: 'textarea', placeholder: '[NOME COMPLETO], nacionalidade, estado civil, profissão, RG nº [RG], CPF nº [CPF], residente em [endereço].', required: true },
          { id: 'curatelado_qualificacao', label: '🔟 Qualificação do(a) Curatelado(a)', type: 'textarea', placeholder: '[NOME COMPLETO], qualificação completa (data de nascimento, estado civil, etc.), e endereço.', required: true },
          { id: 'compromissado_nome', label: '1️⃣1️⃣ Nome do(a) Compromissado(a) (para assinatura)', type: 'text', required: true, placeholder: 'Apenas o nome completo.' },
          { id: 'compromissado_cpf', label: '1️⃣2️⃣ CPF do(a) Compromissado(a) (para assinatura)', type: 'text', required: true, placeholder: 'Apenas o número do CPF.' },
          { id: 'documentLocation', label: '1️⃣3️⃣ Comarca (Lavratura)', type: 'text', placeholder: 'Ex: Raul Soares', required: true },
          { id: 'issueDate', label: '1️⃣4️⃣ Data de Lavratura', type: 'date', required: true },
        ],
        modelSpecificInstruction: `Processo nº: {{processo_no}}\nAutor(a): {{autor_processo}}\nRé(u): {{reu_processo}}\n\nTERMO DE COMPROMISSO DE CURATELA {{status_curatela}}\n\nAos {{issueDate_por_extenso}}, nesta Comarca de {{documentLocation}}, nos autos da ação supracitada, e em cumprimento à decisão (ID {{id_decisao}}) proferida em {{data_decisao_por_extenso}} pelo MM. Juiz de Direito, Dr(a). {{nome_juiz}}{{customJudgeName}}, cujo dispositivo transcreve-se:\n"{{texto_decisao}}"\n\nComparece para firmar o presente compromisso:\n\nCOMPROMISSADO(A): {{compromissado_qualificacao}}\n\nPelo presente termo, o(a) compromissado(a) assume a curatela de:\n\nCURATELADO(A): {{curatelado_qualificacao}}\n\nO(A) compromissado(a) declara, sob as penas da lei, estar ciente das obrigações legais (art. 1.740 e seguintes do Código Civil), comprometendo-se a:\n1. Representar o(a) curatelado(a) em todos os atos civis, patrimoniais e negociais, conforme os limites fixados judicialmente.\n2. Administrar os bens e interesses do(a) curatelado(a) com zelo e diligência.\n3. Prestar contas de sua administração sempre que solicitado pelo Juízo.\n4. Utilizar os recursos do(a) curatelado(a) prioritariamente para a satisfação de suas necessidades essenciais, como saúde, alimentação e bem-estar.\n5. Abster-se de praticar, sem prévia autorização judicial, atos que exorbitem a simples administração, como alienar bens, contrair empréstimos ou transigir.\n\nO(A) compromissado(a) reconhece que o descumprimento dessas obrigações poderá acarretar sua remoção do encargo e responsabilização civil, administrativa ou penal.\n\nE, para que produza seus efeitos legais, lavra-se o presente termo, que vai assinado eletronicamente pelo Juiz e fisicamente pelo compromissado.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n\n_________________________________________\n{{compromissado_nome}}\nCPF: {{compromissado_cpf}}\n\n\n(Assinado Eletronicamente)\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`
    },
    {
        label: "Termo de Compromisso de Guarda (Provisória/Definitiva)",
        value: "termo_compromisso_guarda",
        fields: [
            { id: 'status_guarda', label: '1️⃣ Status da Guarda', type: 'radio', options: ['PROVISÓRIA', 'DEFINITIVA'], defaultValue: 'PROVISÓRIA', required: true },
            { id: 'processo_no', label: '2️⃣ Processo nº', type: 'text', required: true },
            { id: 'autor_processo', label: '3️⃣ Parte Autora', type: 'text', defaultValue: 'MINISTÉRIO PÚBLICO DO ESTADO DE MINAS GERAIS', required: true },
            { id: 'reu_processo', label: '4️⃣ Parte Ré', type: 'textarea', placeholder: 'Nome completo e CPF, se houver.', required: true },
            { id: 'nome_juiz', label: '5️⃣ Juiz(a) da Decisão', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'id_decisao', label: '6️⃣ ID da Decisão no PJe', type: 'text', required: true },
            { id: 'data_decisao', label: '7️⃣ Data da Decisão', type: 'date', required: true },
            { id: 'guardiao_qualificacao', label: '8️⃣ Qualificação do(a) Guardião(ã)', type: 'textarea', placeholder: 'NOME COMPLETO, CPF nº [CPF], nascido(a) em [data], filho(a) de [pais], residente em [endereço].', required: true },
            { id: 'menores_qualificacao', label: '9️⃣ Qualificação do(s) Menor(es)', type: 'textarea', placeholder: 'Liste cada menor em uma linha:\n[Nome completo], nascido(a) em [data], filho(a) de [pais];', required: true },
            { id: 'serverName', label: '🔟 Servidor Responsável (Lavratura)', type: 'text', required: true },
            { id: 'serverRole', label: 'Cargo do Servidor', type: 'text', required: true },
            { id: 'documentLocation', label: '1️⃣1️⃣ Comarca (Lavratura)', type: 'text', placeholder: 'Ex: Raul Soares', required: true },
            { id: 'issueDate', label: '1️⃣2️⃣ Data de Lavratura', type: 'date', required: true },
        ],
        modelSpecificInstruction: `TERMO DE COMPROMISSO DE GUARDA {{status_guarda}}\n\nProcesso nº: {{processo_no}}\nAutor: {{autor_processo}}\nRé(u)(s): {{reu_processo}}\n\nTERMO DE COMPROMISSO DE GUARDA {{status_guarda}}\n\nNos termos da decisão proferida pelo MM. Juiz(a) de Direito Dr(a). {{nome_juiz}}{{customJudgeName}}, constante do ID {{id_decisao}}, datada de {{data_decisao_por_extenso}}, e com fundamento no artigo 33, § 1º, do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), o(a) Sr.(a) {{guardiao_qualificacao}}, compromete-se a exercer a guarda {{status_guarda}} do(s) seguinte(s) menor(es):\n\n{{menores_qualificacao}}\n\nCLÁUSULAS E OBRIGAÇÕES\n\nO(A) compromissário(a) declara estar ciente das obrigações legais previstas no artigo 22 do Estatuto da Criança e do Adolescente, especialmente quanto:\n\nAo dever de sustento, saúde, educação, proteção e bem-estar integral do(s) menor(es) sob sua guarda;\n\nÀ responsabilidade de garantir a matrícula e frequência escolar regular do(s) menor(es);\n\nÀ obrigação de zelar para que o(s) menor(es) não seja(m) submetido(s) a negligência, violência, exploração, crueldade ou opressão, comunicando imediatamente ao Juízo qualquer situação de risco;\n\nÀ promoção da convivência familiar e comunitária saudável, respeitadas eventuais restrições judiciais;\n\nAo dever de informar ao Juízo qualquer alteração de endereço, composição familiar ou circunstância relevante que possa interferir na guarda;\n\nAo reconhecimento de que o descumprimento dessas obrigações poderá ensejar responsabilização civil, administrativa ou penal, conforme a legislação vigente.\n\nO(A) compromissário(a) declara compreender que o presente encargo visa o melhor interesse e o pleno desenvolvimento físico, mental, moral e social do(s) menor(es), comprometendo-se a cumprir fielmente todas as determinações judiciais.\n\nLavrado o presente Termo de Compromisso de Guarda {{status_guarda}}, por determinação do MM. Juiz(a) de Direito Dr(a). {{nome_juiz}}{{customJudgeName}}, sendo a lavratura realizada pelo(a) {{serverRole}}, {{serverName}}.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n(Assinado Eletronicamente)\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`,
    },
    {
        label: "Termo de Compromisso de Inventariante",
        value: "termo_compromisso_inventariante",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo nº', type: 'text', required: true },
            { id: 'inventariante_qualificacao', label: '2️⃣ Qualificação do(a) Inventariante', type: 'textarea', placeholder: 'Ex: MARIA DO CARMO DA SILVA, brasileira, portadora do CPF: 056.443.696-84', required: true },
            { id: 'id_decisao', label: '3️⃣ ID da Decisão Judicial', type: 'text', required: true },
            { id: 'data_decisao', label: '4️⃣ Data da Decisão', type: 'date', required: true },
            { id: 'de_cujus_qualificacao', label: '5️⃣ Falecido(a) (de cujus)', type: 'textarea', placeholder: 'Ex: ARCEDINO GUILHERME PINTO (CPF: 329.093.577-91)', required: true },
            { id: 'nome_juiz', label: '6️⃣ Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'documentLocation', label: '7️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares', required: true },
            { id: 'issueDate', label: '8️⃣ Data de Emissão', type: 'date', required: true },
        ],
        modelSpecificInstruction: `Processo Nº: {{processo_no}}

TERMO DE COMPROMISSO DE INVENTARIANTE

Eu, {{inventariante_qualificacao}}, nomeado(a) inventariante conforme decisão judicial ID: {{id_decisao}} de {{data_decisao_por_extenso}}, venho por meio deste termo, declarar minha aceitação e compromisso em assumir o cargo de inventariante do inventário dos bens deixados por {{de_cujus_qualificacao}}, no processo acima mencionado.

Comprometo-me a desempenhar as funções inerentes ao cargo de inventariante em conformidade com as disposições legais vigentes, notadamente os artigos 617 a 673 do Código de Processo Civil.

Entre as responsabilidades assumidas, comprometo-me a:
1. Realizar o levantamento de todos os bens deixados pelo(a) falecido(a);
2. Apresentar as primeiras e últimas declarações;
3. Zelar pela integridade e conservação dos bens inventariados;
4. Prestar contas de minhas ações sempre que determinado pelo Juízo;
5. Atuar com imparcialidade e ética, buscando uma partilha justa e célere.

Declaro estar ciente de que o descumprimento das minhas obrigações pode acarretar as sanções legais cabíveis, inclusive a remoção do encargo.

{{documentLocation}}, {{issueDate_por_extenso}}.

_____________________________
{{inventariante_qualificacao}}

(Assinado Eletronicamente)
{{nome_juiz}}{{customJudgeName}}
Juiz de Direito`
    }
];

const allCartas: DocumentModel[] = [
    {
        label: "Carta Precatória",
        value: "carta_precatoria",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo nº', type: 'text', required: true, placeholder: 'Ex: 5001853-82.2022.8.13.0540' },
            { id: 'partes', label: '2️⃣ Partes do Processo', type: 'textarea', required: true, placeholder: 'Autor: [Nome]\nRéu: [Nome]' },
            { id: 'comarca_destinataria', label: '3️⃣ Comarca de Destino (Deprecado)', type: 'text', required: true, placeholder: 'Ex: BELO HORIZONTE - MG' },
            { id: 'finalidade_geral', label: '4️⃣ Finalidade Geral da Carta', type: 'text', required: true, placeholder: 'Ex: INTIMAÇÃO de parte para Audiência' },
            { id: 'justica_gratuita', label: '5️⃣ JUSTIÇA GRATUITA?', type: 'radio', options: ['SIM', 'NÃO'], defaultValue: 'SIM', required: true },
            { id: 'pessoa_diligenciada', label: '6️⃣ Pessoa a ser Diligenciada', type: 'text', required: true, placeholder: 'Nome completo' },
            { id: 'endereco_diligencia', label: '7️⃣ Endereço para Cumprimento', type: 'textarea', required: true, placeholder: 'Rua, nº, complemento, bairro, cidade/UF' },
            { id: 'telefone_diligencia', label: '8️⃣ Telefone para Contato (Opcional)', type: 'text', required: false },
            { id: 'prazo_estimado', label: '9️⃣ Prazo para Cumprimento', type: 'text', required: true, defaultValue: '60 (sessenta) dias' },
            { id: 'pecas_anexas', label: '🔟 Peças Processuais Anexas', type: 'textarea', required: true, defaultValue: '1. Despacho/Decisão que determinou a expedição da Carta Precatória.\n2. Cópia da Petição Inicial.\n3. Procuração das partes (se houver).' },
            { id: 'documentLocation', label: '1️⃣1️⃣ Local', type: 'text', required: false, placeholder: 'Ex: Raul Soares' },
            { id: 'issueDate', label: '1️⃣2️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '1️⃣3️⃣ Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
        ],
        modelSpecificInstruction: `CARTA PRECATÓRIA

1. JUÍZO DEPRECANTE (ORIGEM)
Juízo: VARA ÚNICA DA COMARCA DE RAUL SOARES
Endereço: Avenida Governador Valadares, 100, Raul Soares - MG
CEP: 35350-000
Processo nº: {{processo_no}}
Partes: {{partes}}
JUSTIÇA GRATUITA: {{justica_gratuita}}

2. JUÍZO DEPRECADO (DESTINO)
Juízo: JUÍZO DE DIREITO DA COMARCA DE {{comarca_destinataria}}, ou seu substituto legal.
Comarca: {{comarca_destinataria}}

3. PREÂMBULO E SOLICITAÇÃO
O Excelentíssimo Juiz de Direito da Comarca de Raul Soares-MG, Dr(a). {{nome_juiz}}{{customJudgeName}}, nos autos do processo cível nº {{processo_no}}, DEPRECA a Vossa Excelência que, exarando o seu respeitável "cumpra-se", digne-se determinar as diligências necessárias ao fiel cumprimento do ato processual abaixo descrito.

A presente diligência é essencial para o regular andamento do feito, tendo em vista que o ato deve ser cumprido nos limites territoriais da competência desse Juízo.

4. OBJETO DA CARTA
Diligência: {{finalidade_geral}}, a ser cumprida na pessoa do(a) Sr(a). {{pessoa_diligenciada}}.

5. DADOS PARA A DILIGÊNCIA
Pessoa a ser diligenciada: {{pessoa_diligenciada}}
Endereço para cumprimento: {{endereco_diligencia}}
Telefone para contato: {{telefone_diligencia}}

6. ENCERRAMENTO E PRAZO
Prazo para cumprimento: {{prazo_estimado}}.
Cumprida a diligência, requer-se a devolução desta à origem, com as anotações e formalidades de praxe.

7. PEÇAS ANEXAS
Para a instrução e o cumprimento desta, seguem anexas as seguintes peças processuais:
{{pecas_anexas}}

{{documentLocation}}, {{issueDate_por_extenso}}.

(Assinado Eletronicamente)
{{nome_juiz}}{{customJudgeName}}
Juiz(a) de Direito
Vara Única da Comarca de Raul Soares`,
    }
];

const mandadoFields: FormField[] = [
    { id: 'processo_dados', label: '1️⃣ Dados do Processo', type: 'text', placeholder: 'Nº do processo, partes, etc.', required: true },
    { id: 'cartorio_endereco', label: '2️⃣ Cartório de Destino', type: 'textarea', placeholder: 'Nome do cartório e endereço completo', required: true },
    { id: 'data_decisao', label: '3️⃣ Data da Sentença/Decisão', type: 'date', required: true },
    { id: 'data_transito_julgado', label: '4️⃣ Data do Trânsito em Julgado (se houver)', type: 'date', required: false },
    { id: 'finalidade_mandado', label: '5️⃣ Finalidade do Mandado / Cópia da Decisão', type: 'textarea', placeholder: 'Descreva a finalidade ou cole a determinação judicial integralmente...', required: true },
    { id: 'id_decisao', label: '6️⃣ ID da Sentença/Decisão no PJe', type: 'text', placeholder: 'ID do documento no PJe', required: false },
    { id: 'copia_inicial', label: '7️⃣ Cópia da Petição Inicial (Opcional)', type: 'textarea', placeholder: 'Cole o texto da petição inicial aqui...', required: false },
    { id: 'documentLocation', label: '8️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
    { id: 'issueDate', label: '9️⃣ Data de Emissão', type: 'date', required: true },
    { id: 'nome_juiz', label: '🔟 Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
    { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
    { id: 'typingServerName', label: '1️⃣1️⃣ Servidor que digitou', type: 'text', placeholder: 'Nome de quem digitou', required: false },
];

const mandadoTemplate = `MANDADO DE {{tipo_mandado}}\n\n{{processo_bloco}}\n{{processo_dados}}\n\nDESTINATÁRIO: {{cartorio_endereco}}\n\nEm cumprimento à decisão (ID: {{id_decisao}}) proferida em {{data_decisao_por_extenso}}, transitada em julgado em {{data_transito_julgado_por_extenso}}, determino que se proceda à seguinte averbação/registro:\n\n{{finalidade_mandado}}\n\nCumpra-se.\n\n{{documentLocation}}, {{issueDate_por_extenso}}.\n\n{{nome_juiz}}{{customJudgeName}}\nJuiz(a) de Direito`;

const allMandados: DocumentModel[] = [
    {
        label: "Mandado de Averbação (Registro Civil - Detalhado)",
        value: "mandado_averbacao_registro_civil_detalhado",
        fields: [
            { id: 'justica_gratuita_info', label: '1️⃣ Informação sobre Justiça Gratuita', type: 'textarea', defaultValue: 'Partes estão amparadas pela assistência judiciária gratuita, Lei N° 1.060, de 5 de Fevereiro de 1950.', placeholder: 'Deixe em branco se não aplicável.', required: false },
            { id: 'processo_no', label: '2️⃣ Processo Nº', type: 'text', required: true },
            { id: 'dados_partes', label: '3️⃣ Dados do Processo (Partes, Classe, etc.)', type: 'textarea', placeholder: 'Classe: [...]\nAssunto: [...]\nAutor: [...]\nRéu/Ré: [...]', required: true },
            { id: 'cartorio_destinatario', label: '4️⃣ Cartório de Destino', type: 'textarea', placeholder: 'Ex: Oficial do Cartório de Registro Civil de...', required: true },
            { id: 'texto_averbacao', label: '5️⃣ Texto da Averbação/Retificação', type: 'textarea', placeholder: 'Descreva a ordem completa. Ex: à retificação no registro civil n. XXX de YYY para constar ZZZ...', required: true },
            { id: 'data_sentenca', label: '6️⃣ Data da Sentença', type: 'date', required: true },
            { id: 'data_transito_julgado', label: '7️⃣ Data do Trânsito em Julgado', type: 'date', required: true },
            { id: 'documentLocation', label: '8️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares', required: false },
            { id: 'issueDate', label: '9️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '🔟 Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
        ],
        modelSpecificInstruction: `JUSTIÇA DE 1ª INSTÂNCIA
COMARCA DE RAUL SOARES/ MG - SECRETARIA DA ÚNICA VARA.

MANDADO DE AVERBAÇÃO

{{justica_gratuita_info}}

Processo Nº: {{processo_no}}
{{dados_partes}}

O Exmo. Sr. Dr. {{nome_juiz}}{{customJudgeName}}, MM. Juiz de Direito desta Comarca de Raul Soares/MG, na forma da Lei, etc.

MANDA ao {{cartorio_destinatario}}, ao qual este for apresentado, que, em seu cumprimento, proceda, observadas as formalidades legais, {{texto_averbacao}}, tudo em conformidade com a sentença proferida em {{data_sentenca_por_extenso}}, transitada em julgado em {{data_transito_julgado_por_extenso}}, cuja cópia fica fazendo parte integrante deste mandado.

CUMPRA-SE NA FORMA DA LEI.

{{documentLocation}}, {{issueDate_por_extenso}}.

(Assinado Eletronicamente)
{{nome_juiz}}{{customJudgeName}}
Juiz de Direito`
    },
    {
        label: "Averbação de Divórcio",
        value: "mandado_averbacao_divorcio",
        fields: mandadoFields,
        modelSpecificInstruction: mandadoTemplate.replace('{{tipo_mandado}}', 'AVERBAÇÃO DE DIVÓRCIO'),
    },
    {
        label: "Averbação de Penhora de Imóveis",
        value: "mandado_averbacao_penhora",
        fields: mandadoFields,
        modelSpecificInstruction: mandadoTemplate.replace('{{tipo_mandado}}', 'AVERBAÇÃO DE PENHORA'),
    },
    {
        label: "Averbação - Outros (Especificar)",
        value: "mandado_averbacao_outros",
        fields: [
            { id: 'processo_dados', label: '1️⃣ Dados do Processo', type: 'text', placeholder: 'Nº do processo, partes, etc.', required: true },
            { id: 'tipo_averbacao_outro', label: '2️⃣ Tipo de Averbação', type: 'text', placeholder: 'Ex: Averbação de indisponibilidade de bens', required: true },
            { id: 'cartorio_endereco', label: '3️⃣ Cartório de Destino', type: 'textarea', placeholder: 'Nome do cartório e endereço completo', required: true },
            { id: 'data_decisao', label: '4️⃣ Data da Sentença/Decisão', type: 'date', required: true },
            { id: 'data_transito_julgado', label: '5️⃣ Data do Trânsito em Julgado (se houver)', type: 'date', required: false },
            { id: 'finalidade_mandado', label: '6️⃣ Finalidade do Mandado / Cópia da Decisão', type: 'textarea', placeholder: 'Descreva a finalidade ou cole a determinação judicial integralmente...', required: true },
            { id: 'id_decisao', label: '7️⃣ ID da Sentença/Decisão no PJe', type: 'text', placeholder: 'ID do documento no PJe', required: false },
            { id: 'copia_inicial', label: '8️⃣ Cópia da Petição Inicial (Opcional)', type: 'textarea', placeholder: 'Cole a petição inicial aqui...', required: false },
            { id: 'documentLocation', label: '9️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '🔟 Data de Emissão', type: 'date', required: true },
            { id: 'nome_juiz', label: '1️⃣1️⃣ Juiz(a) Assinante', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'typingServerName', label: '1️⃣2️⃣ Servidor que digitou', type: 'text', placeholder: 'Nome de quem digitou', required: false },
        ],
        modelSpecificInstruction: mandadoTemplate.replace('{{tipo_mandado}}', '{{tipo_averbacao_outro}}'),
    },
    {
        label: "Registro de Ação de Usucapião",
        value: "mandado_registro_usucapiao",
        fields: mandadoFields,
        modelSpecificInstruction: mandadoTemplate.replace('{{tipo_mandado}}', 'REGISTRO DE USUCAPIÃO'),
    },
    {
        label: "Retificação de Registro Civil",
        value: "mandado_retificacao_registro_civil",
        fields: mandadoFields,
        modelSpecificInstruction: mandadoTemplate.replace('{{tipo_mandado}}', 'RETIFICAÇÃO DE REGISTRO CIVIL'),
    }
];

const allEmails: DocumentModel[] = [
    {
        label: "E-mail (Criação)",
        value: "email_criacao",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo nº (se houver)', type: 'text', placeholder: 'Nº do processo relacionado', required: false },
            { id: 'destinatario', label: '2️⃣ Destinatário(s)', type: 'textarea', placeholder: 'Nome e/ou e-mail do(s) destinatário(s)', required: true },
            { id: 'corpo_email_instrucoes', label: '3️⃣ Instruções para o Corpo do E-mail', type: 'textarea', placeholder: 'Descreva o que o e-mail deve conter. Ex: "Solicitar o comprovante de depósito referente ao alvará..."', required: true },
            { id: 'documentLocation', label: '4️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '5️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'serverName', label: '6️⃣ Remetente (Nome)', type: 'text', placeholder: 'Nome de quem assina', required: true },
            { id: 'serverRole', label: 'Cargo do Remetente', type: 'text', placeholder: 'Cargo/Função', required: true }
        ],
        modelSpecificInstruction: `PARA: {{destinatario}}\n\nASSUNTO: Referente ao Processo {{processo_bloco}}\n\nPrezados,\n{{corpo_email_instrucoes}}\n\nAtenciosamente,\n\n{{serverName}}\n{{serverRole}}`,
    },
    {
        label: "E-mail (Resposta)",
        value: "email_resposta",
        fields: [
            { id: 'processo_no', label: '1️⃣ Processo nº (se houver)', type: 'text', placeholder: 'Nº do processo relacionado', required: false },
            { id: 'email_recebido', label: '2️⃣ E-mail Original', type: 'textarea', placeholder: 'Cole aqui o corpo do e-mail que você está respondendo', required: true },
            { id: 'instrucoes_resposta', label: '3️⃣ Instruções para a Resposta', type: 'textarea', placeholder: 'Descreva como a IA deve responder. Ex: "Agradecer e informar que o documento foi recebido e juntado aos autos."', required: true },
            { id: 'documentLocation', label: '4️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '5️⃣ Data de Emissão', type: 'date', required: true },
            { id: 'serverName', label: '6️⃣ Remetente (Nome)', type: 'text', placeholder: 'Nome de quem assina', required: true },
            { id: 'serverRole', label: 'Cargo do Remetente', type: 'text', placeholder: 'Cargo/Função', required: true }
        ],
        modelSpecificInstruction: `ASSUNTO: Re: Referente ao Processo {{processo_bloco}}\n\nPrezados,\n{{instrucoes_resposta}}\n\nAtenciosamente,\n\n{{serverName}}\n{{serverRole}}\n\n---\nEm {{issueDate_por_extenso}}, o e-mail original dizia:\n{{email_recebido}}`,
    }
];

const portariaReasons = [
    'Abono - Cursos: A falta decorrente de participação do servidor em evento de aperfeiçoamento profissional. (Legislação: Portaria Conjunta 076/2006, artigo 39).',
    'Abono - Doação de Sangue: Nos termos da Lei Estadual nº 11.105, de 4 de junho de 1993 e Portaria 076/2006, artigo 38.',
    'Prerrogativas do Artigo 70, § 1º da RESOLUÇÃO Nº 12/1962 do TJMG,: O abono de que trata este artigo deverá ser requerido no mínimo dez dias antes da pretendida falta e será concedido, a critério do juiz, desde que a falta não venha a prejudicar o bom andamento do serviço.',
    'Prerrogativas do Artigo 70, § 2º da RESOLUÇÃO Nº 12/1962 do TJMG: Em caso de falta ao serviço decorrente de motivo excepcional, devidamente comprovado, o abono de que trata este artigo deverá ser requerido no primeiro dia útil que se seguir à falta.',
    'Abono por Compensação de Horas.',
    'Férias Regulamentares.',
    'Licença Saúde.',
    'Outros (especificar)'
];

const allPortarias: DocumentModel[] = [
    {
        label: "Portaria de Substituição",
        value: "portaria_substituicao",
        modelSpecificInstruction: `// INSTRUÇÕES PARA IA: 
// 1. O output deve seguir estritamente o template abaixo.
// 2. Sempre use a expressão "dias úteis".
// 3. Não use intervalos de datas como "de X a Y". Especifique o início e a quantidade de dias.
// 4. Mantenha a linguagem padronizada.

PORTARIA Nº {{numero_portaria}}

O(A) Excelentíssimo(a) Senhor(a) Doutor(a) {{nome_juiz}}{{customJudgeName}}, Juiz(a) de Direito da Comarca de Raul Soares, Estado de Minas Gerais, no uso de suas atribuições legais,

Considerando os seguintes afastamentos da(o) servidora(or) {{servidor_afastado_detalhes}}:

{{lista_considerando}}

CONSIDERANDO o disposto na Resolução nº 865/2018, que regulamenta a designação de substitutos na Primeira Instância do TJMG;

RESOLVE:

Art. 1º Designar o(a) servidor(a) {{servidor_substituto_detalhes}}, para substituir o(a) servidor(a) {{servidor_afastado_detalhes}}, pelo período de:

{{lista_resolve}}

Art. 2º Publique-se, registre-se e cumpra-se.

{{documentLocation}}, {{issueDate_por_extenso}}.

{{nome_juiz}}{{customJudgeName}}
Juiz(a) de Direito

Documento assinado eletronicamente.`,
        fields: [
            { id: 'numero_portaria', label: '1️⃣ Número da Portaria', type: 'text', placeholder: 'Ex: 01/2024', required: true },
            { id: 'nome_juiz', label: '2️⃣ Juiz(a) que assina a Portaria', type: 'select', lookup: 'judges', required: true },
            { id: 'customJudgeName', label: 'Outro Juiz (Nome)', type: 'text', placeholder: 'Se não estiver na lista acima', required: false },
            { id: 'servidor_substituido_id', label: '3️⃣ Servidor(a) a ser Substituído(a)', type: 'select', lookup: 'managers', required: true },
            { id: 'servidor_substituto_id', label: '4️⃣ Servidor(a) Substituto(a)', type: 'select', lookup: 'oficiais', required: true },
            { 
                id: 'periodos_substituicao', 
                label: '5️⃣ Períodos de Substituição', 
                type: 'dynamic-periods', 
                required: true,
                options: portariaReasons,
                defaultValue: JSON.stringify([{
                    inicio: new Date().toISOString().slice(0, 10),
                    dias: '1',
                    motivo: 'Férias Regulamentares',
                    outroMotivo: ''
                }])
            },
            { id: 'documentLocation', label: '6️⃣ Local', type: 'text', placeholder: 'Ex: Raul Soares, MG', required: false },
            { id: 'issueDate', label: '7️⃣ Data de Emissão', type: 'date', required: true },
        ]
    }
];

const allBuscas: DocumentModel[] = [
    {
        label: "Busca de Mandado (CEMPE) e Logradouro (Comarca)",
        value: "busca_cempe_logradouro",
        fields: [
            {
                id: 'texto_base',
                label: '1️⃣ Texto Base para Extração',
                type: 'textarea',
                placeholder: 'Cole aqui o despacho, a decisão judicial ou o texto do pedido...',
                required: true,
            }
        ],
        modelSpecificInstruction: JSON.stringify([
            {
                name: 'AI Studio',
                url: 'https://aistudio.google.com/prompts/1Pay1yFCSUGxSwg4YzALdOjAtbA-KAWoL',
                icon: '✨'
            },
            {
                name: 'Perplexity',
                url: 'https://www.perplexity.ai/spaces/cempe-e-logradouros-UMFwRn0qR0.oyXI3WQbhLw',
                icon: '🅿️'
            },
            {
                name: 'ChatGPT',
                url: 'https://chatgpt.com/g/g-p-68dfae34dc408191ae8232351ec021fd-cempe-e-logradouro/project',
                icon: '🧠'
            }
        ])
    },
    {
        label: "Analista Processual",
        value: "analista_processual",
        fields: [], // No input fields
        modelSpecificInstruction: JSON.stringify({
          instructionText: "Para analisar um processo (especialmente de Usucapião ou Inventário), clique em uma das IAs abaixo. O prompt de análise será copiado para sua área de transferência. Cole o prompt na IA, anexe os documentos do processo e aguarde o resultado.",
          staticPrompt: `PAPEL
Aja como um Analista Judicial e Magistrado Experiente, com profunda expertise em Direito Processual Civil, Inventário e Usucapião.
Seu papel é analisar exclusivamente os documentos do processo judicial e elaborar certidões, constatações e relatórios técnicos, sempre fundamentando com base no conteúdo efetivamente constante nos autos, indicando o número do documento (ID) e a página exata do arquivo PDF anexado no sistema (FL. DO ANEXO / PJe) de onde extraiu cada informação.
TAREFAS
Analisar o processo fornecido (inventário, usucapião ou outro tipo de ação cível) sem qualquer desvio de foco.
Jamais realizar pesquisas externas ou inferências não baseadas em documentos processuais.
É terminantemente proibido acessar a internet, consultar bases externas ou criar conteúdo especulativo.
Só é permitido o uso da internet se o usuário expressamente solicitar.
Verificar a existência e cumprimento de despachos, decisões ou determinações judiciais, indicando, para cada uma:
conteúdo do ato;
se foi cumprido, parcialmente cumprido ou não cumprido;
qual documento comprova o ato (ID e página);
e eventuais pendências.
Identificar e descrever documentos relevantes (ex.: certidões, procurações, petições, manifestações, comprovantes).
Diretriz de Citação - PRIORIDADE ABSOLUTA (Rigor Processual):
O formato de citação deve ser: 👉 ID XXXXXXXXXX, pág. Y.
A página (pág. Y) a ser citada é SEMPRE a sequencial do arquivo PDF anexado ao processo judicial eletrônico (PJe/Sistema de Autos).
É terminantemente proibido citar a numeração de página interna do documento original digitalizado (ex.: "Página 1 de 27" do CadÚnico).
Se houver mais de um despacho, decisão ou diligência, elabore certidões separadas para cada uma, numerando-as.
DIRETRIZES DE POSTURA
Postura: analítica, técnica, paciente e concentrada.
Tom: formal, impessoal e preciso.
Proibição absoluta de invenção, inferência ou interpretação livre.
Não faça consultas externas, não gere informações de fora dos autos.
Respeite o sigilo processual.
Análise exclusivamente documental e processual.
Jamais utilize exemplos genéricos; baseie tudo em IDs e páginas reais.
Não faça consultas externas, não gere informações de fora dos autos.
Respeite o sigilo processual.
Análise exclusivamente documental e processual.
Jamais utilize exemplos genéricos; baseie tudo em IDs e páginas reais.
Jamais interromper o fluxo com perguntas desnecessárias.
Só poderá fazer 1 pergunta objetiva se ocorrer anomalia crítica, definida como:
ausência total de documentos necessários para a verificação, ou
contradição material grave entre documentos essenciais.
FLUXO DE ANÁLISE
Identificação do Processo: número, partes e vara judicial, com os respectivos IDs.
Despacho ou decisão a ser analisado: transcreva ou resuma com clareza o conteúdo (mencione o ID e a página).
Cumprimento ou não da determinação:
Ato cumprido? (☐ Sim / ☐ Parcial / ☐ Não)
Documento comprobatório: ID XXXXXXXX, pág. X
Data de protocolo / juntada: [dd/mm/aaaa].
Verificação de documentos correlatos:
Procurações, certidões, manifestações, documentos de propriedade, certidões fiscais, etc.
Sempre citar o ID e a página.
Conclusão e constatação: resumo técnico indicando o cumprimento e eventuais pendências.
CERTIDÃO FORMAL: elaborar texto padronizado e datado, indicando IDs, páginas e observações pertinentes.
MODELO DE SAÍDA
CERTIDÃO FORMAL (Padronizada)
CERTIDÃO — Processo nº [NÚMERO] — Vara [NOME] — Data da verificação: [DD/MM/AAAA]
Eu, [NOME DO ANALISTA OU MAGISTRADO], CERTIFICO que procedi à análise do despacho/decisão de ID [XXXXXXX], pág. [X], datado de [DATA], que determinava [OBJETO].
Constatou-se:
Documento comprobatório do cumprimento: ID [YYYYYYYY], pág. [Z].
Data da juntada/protocolo: [DD/MM/AAAA].
Situação: [CUMPRIDO / PARCIAL / NÃO CUMPRIDO].
Observações: [detalhes técnicos e consequências processuais].
Observação adicional: Não houve consulta externa; análise exclusivamente com base nos autos.
Local e Data: [Cidade], [DD/MM/AAAA].
Assinatura: ________________________
[Nome e Cargo]
ESTILO
Texto corrido, técnico, formal e preciso.
Organize por parágrafos lógicos, com coesão e densidade semântica.
Sempre mencionar IDs e páginas.
Não use listas visuais na resposta final, apenas estrutura narrativa.
Evite redundâncias e mantenha rigor jurídico.
ESCREVA COM PROFUNDIDADE E DENSIDADE SEMÂNTICA INCORPORANDO NUANCES E ATENTO AOS DETALHES para garantir MÁXIMA PRECISÃO, TÉCNICA JURÍDICA, CLAREZA, COESÃO e CONSISTÊNCIA E Indique todos os documentos o número de identificação do documento ("ID") e a página do processo.
ADICIONAIS
Vedação absoluta à invenção e consulta externa.
Base de análise: apenas documentos do processo.
Atenção redobrada a IDs e páginas.
Permaneça centrado na tarefa — nenhum desvio temático será tolerado.
Jamais emita perguntas desnecessárias.
Somente pergunte em caso de anomalia crítica (ausência total de documentos essenciais).`,
          ais: [
            {
              name: "AI Studio",
              url: "https://aistudio.google.com/prompts/new_chat",
              icon: "✨"
            },
            {
              name: "Perplexity",
              url: "https://www.perplexity.ai/spaces/auditor-pje-analise-e-certidao-OmP1JHlURuyf5eNOwzpI.g",
              icon: "🅿️"
            },
            {
                name: "Manus",
                url: "https://manus.im/app",
                icon: "🤖"
            }
          ]
        })
    },
    {
        label: "Análise de Processo de Inventário",
        value: "analise_inventario",
        fields: [],
        modelSpecificInstruction: JSON.stringify({
          instructionText: "Para analisar um processo de inventário, clique em uma das IAs abaixo. O prompt de análise será copiado para sua área de transferência. Cole o prompt na IA, anexe os documentos do processo e aguarde o relatório.",
          staticPrompt: `#Role
Haja como um experiente juiz de direito especializado em direito sucessório. Seu foco será a análise do processo de inventário, identificando se todos os documentos essenciais a sua homologação foram acostados.

ORDEM DE EXECUÇÃO OTIMIZADA 
#TASK: CALMA, RESPIRE FUNDO, PENSE DEVAGAR E SIGA AS INSTRUÇÕES. O prompt está suficientemente claro para você fazer o que se pede. Não interrompa o fluxo do serviço fazendo perguntas tolas e desnecessárias.
DIRETRIZES DE POSTURA E PROCESSO
1. Postura e Mindset
Atuação: Aja como um especialista proativo, perspicaz e analítico. Abandone qualquer traço de resposta robótica, superficial ou genérica.
Abordagem: Adote uma postura calma e deliberada. Priorize a análise lenta e rigorosa das instruções antes de iniciar a geração.
2. Análise e Fluxo de Trabalho
Interpretação: Interprete o comando com profundidade e atenção meticulosa a cada detalhe.
Fluxo: Mantenha o fluxo de trabalho ininterrupto.
3. Conteúdo e Objetivo
Fidelidade aos Dados: É estritamente proibido fazer suposições, invenções ou ilações. A resposta deve se restringir estritamente às informações fornecidas no prompt ou ao conhecimento factual solicitado.
Qualidade: O texto final deve ser coeso, informativo e manter um equilíbrio estrito entre detalhamento e objetividade.
Completude: Maximize o aproveitamento de todas as informações recebidas para assegurar que a entrega seja completa e de alta qualidade.
Precisão de Dados: Jamais forneça informações incompletas quando os dados estiverem disponíveis. Isso é especialmente crítico para a qualificação e identificação de pessoas, objetos, entidades e quaisquer outros elementos do gênero.
#Addons: Formato de Saída
Atenção: Execute a tarefa com máxima calma e atenção.Diretriz de Citação - PRIORIDADE ABSOLUTA (Rigor Processual):
O formato de citação deve ser: 👉 ID XXXXXXXXXX, pág. Y.
A página (pág. Y) a ser citada é SEMPRE a sequencial do arquivo PDF anexado ao processo judicial eletrônico (PJe/Sistema de Autos).
É terminantemente proibido citar a numeração de página interna do documento original digitalizado (ex.: "Página 1 de 27" do CadÚnico).
Exemplo de Vício Corrigido e Padrão a Ser Seguido:
INCORRETO: (ID 10563404593, pág. 17 - referindo-se ao CadÚnico "Página 17 de 27").
CORRETO: (ID 10563404593, pág. 34 - referindo-se à página 34 do PDF anexado no PJe).
(...)

Output: O resultado deve ser apresentado sempre em texto corrido, estruturado e organizado por parágrafos.
1 indique o nome do falecido, o ID da certidão de óbito e se há indicação de cônjuge ou herdeiros na certidão de óbito.
2 indique, COM O RESPECTIVO INDICADOR (ID), os seguintes documentos: 
2.1 rol de herdeiros, com indicação do parentesco com o falecido, estado civil. ATENÇÃO: Traga o ID da certidão de nascimento ou casamento e da procuração. 
Informe se há viúvo/meeiro (indique a procuração e certidão de casamento ou informe se é união estável)
2.2 rol de bens, com indicação do documento comprobatório da propriedade;
2.3 requerimento de citação, se houver. ATENÇÃO: caso não haja, SUPRIMA ESSE TÓPICO;
2.4 instrumento de partilha amigável, se for o caso;
2.5 certidões negativas de débitos fiscais em nome do(a) falecido(a):
    - municipal
    - estadual
    - federal;
2.6. certidão negativa de testamento (www.censec.org.br);
2.7. Houve renúncia ou cessão de herança? Se sim, indique os ID's e os nomes dos herdeiros. ATENÇÃO: caso não haja, SUPRIMA ESSE TÓPICO;
2.8 certidão de desoneração do ITCMD.

---

#EXEMPLO
[
No nome do falecido: {Ayrton Senna da Silva
Certidão de óbito: ID {10321607226}
Estado civil/certidão de nascimento/casamento: ID...
Data do falecimento: {01/05/1995}

1. Rol de Herdeiros e Documentação Anexa

{NOME DO HERDEIRO}
    Parentesco: {Filho}
    Estado Civil: {Solteiro}
    Certidão de Casamento: ID {10321607226}
    Procuração: ID {10321607226}

2. Rol de Bens

Imóvel: matrícula {11306} 
Município/localização: {Pedra Azul/MG}
Certidão imobiliária: ID {10321607226}

Veículo {Ford Corcel}
Placa: {RTV-0F06}
CRLV - documento: ID {10321607226}

Saldo bancário: R$ {101,46}
ID: {10321607226}

3. Requerimento de Citação

se não houver, suprima esse tópico

4. Instrumento de Partilha Amigável

5. Certidões Negativas de Débitos Fiscais em Nome dos Falecidos
    Federal: ID {10321607226}
    Estadual: ID {10321607226}
    Municipal: ID {10321607226}

6. CENSEC - Certidão Negativa de Testamento: ID {10321607226}

7. Certidão de Pagamento Desoneração do ITCMD: ID {10321607226}

#Addons:
- Faça com CALMA E ATENÇÃO.
- #*SE HOUVER MAIS DE UM FALECIDO, TRAGA O RELATÓRIO DE CADA UM, DE FORMA ORGANIZADA E SEPARADA*
- Certifique-se de que os identificadores indicados estão corretos. Sendo o caso, indique o ID e a página do documento, caso haja vários documentos no mesmo ID.
- Analise sem pressa, cuidadosamente. Seu auxílio é muito importante. Não compartilhe dados sensíveis!
- EXEMPLO de como alguns documentos irão aparecer no processo:
[
Certidões Negativas de Débitos Fiscais em Nome dos Falecidos
    Federal: página 5 ID 10229630770
    Estadual: pg 4 ID 10183419300
    Municipal: pg 6 ID 10233748019
CENSEC - Certidão Negativa de Testamento: pgs 1-3 ID 10183419246
]
OUTPUT SEMPRE EM TEXTO CORRIDO SEPARADO POR PARÁGRAFOS`,
          ais: [
            { name: "AI Studio", url: "https://aistudio.google.com/prompts/new_chat", icon: "✨" },
            { name: "Perplexity", url: "https://www.perplexity.ai/", icon: "🅿️" },
            { name: "Manus", url: "https://manus.im/app", icon: "🤖" }
          ]
        })
    },
    {
        label: "Extração de dados para Alvará do INSS",
        value: "busca_alvara_inss",
        fields: [
            {
                id: 'texto_base',
                label: '1️⃣ Conteúdo das Páginas',
                type: 'textarea',
                placeholder: 'Cole aqui o texto completo das duas páginas que contêm os dados do alvará...',
                required: true,
            }
        ],
        modelSpecificInstruction: JSON.stringify({
            instructionText: "Esta ferramenta utiliza uma IA externa para extrair dados de alvarás do INSS. Cole o conteúdo de ambas as páginas do documento no campo abaixo. O prompt de extração será combinado com seu texto e copiado para a área de transferência. Clique em uma das IAs para abrir e colar o prompt completo.",
            staticPrompt: `INÍCIO DO PROMPT
Assunto: Extração, Formatação Condicional e Apresentação de Dados
Sua Função: Você é um assistente de IA especializado em extração e formatação precisa de dados. Sua tarefa é analisar o conteúdo de duas páginas, fornecidas em uma única mensagem, e apresentar os resultados em um formato que facilite a cópia individual de cada informação.
Entrada: O usuário fornecerá o texto completo das duas páginas. Você deve processar o conteúdo como duas entidades separadas (Página 1 e Página 2).

Passo 1: Extração Inicial de Dados (Para cada página)
Para cada página, extraia as três informações a seguir:
Conta de Depósito: O número da conta de depósito.
Valor: Localize a expressão :(A+Resultado de B). O valor é o número que a sucede. Formate como R$ [valor numérico] ([valor por extenso]) mais os acréscimos legais.
Beneficiário e CPF: Identifique um nome que precede um número de CPF (XXX.XXX.XXX-XX).
Regra de Ambiguidade: Se houver múltiplos pares de nome/CPF, priorize o nome associado a termos como 'beneficiário', 'autor', ou 'exequente'.
Formato do nome: Converta o nome para ter a primeira letra de cada palavra em maiúscula (Title Case), mas preserve siglas (ex: G.E.) e termos societários (ex: S.A., LTDA) em maiúsculas.
Formato de saída: Nome do Beneficiário - CPF: NÚMERO DO CPF.

Passo 2: Lógica Condicional para o Campo "Beneficiário"
Após extrair os dados de AMBAS as páginas, aplique as seguintes regras:
Comparação: Compare os valores numéricos extraídos.
Regra de Desempate: Se os valores forem idênticos, trate a Página 1 como a de "maior valor".
Formatação para a Página de MAIOR Valor:
O campo Beneficiário deve usar o formato: [Beneficiário da pág. de MAIOR valor - CPF] e ou [Beneficiário da pág. de MENOR valor - CPF].
Formatação para a Página de MENOR Valor:
O campo Beneficiário deve conter apenas os dados da própria página: [Beneficiário da pág. de MENOR valor - CPF].

Passo 3: Apresentação Final com Funcionalidade de Cópia
Organize os resultados estritamente conforme o modelo abaixo. Cada informação individual extraída deve ser apresentada dentro de seu próprio bloco de código (usando \`\`\`) para que a interface de chat adicione um botão "Copiar" a cada campo. O rótulo do campo (ex: "Conta de Depósito:") deve ficar fora do bloco de código.
**Resultado da Página 1:**

**Conta de Depósito:**
\`\`\`
[dado]
\`\`\`
**Valor:**
\`\`\`
[dado]
\`\`\`
**Beneficiário:**
\`\`\`
[dado]
\`\`\`

**Resultado da Página 2:**

**Conta de Depósito:**
\`\`\`
[dado]
\`\`\`
**Valor:**
\`\`\`
[dado]
\`\`\`
**Beneficiário:**
\`\`\`
[dado]
\`\`\`

*DIRETRIZ DE PRECISÃO OBRIGATÓRIA (REGRA FINAL):**

Sua principal diretriz é a precisão absoluta. Se qualquer informação não puder ser extraída com **100% de certeza**, **NÃO INVENTE NADA**. Em vez disso, informe a impossibilidade de extração dentro do bloco de código correspondente e, se possível, **explique brevemente o motivo da incerteza**.

*   **Exemplo de resposta útil:**
    **Beneficiário:**
    \`\`\`
    [Não foi possível extrair com certeza. Motivo: Foram encontrados dois CPFs na página. Por favor, verifique o documento.]
    \`\`\``,
            ais: [
                {
                  name: "AI Studio",
                  url: "https://aistudio.google.com/prompts/new_chat",
                  icon: "✨"
                },
                {
                  name: "Perplexity",
                  url: "https://www.perplexity.ai/",
                  icon: "🅿️"
                },
                {
                    name: "Manus",
                    url: "https://manus.im/app",
                    icon: "🤖"
                }
            ]
        })
    },
    {
        label: "Extração de Informações de Acordo do INSS",
        value: "busca_acordo_inss",
        fields: [
            { id: 'nome_autora', label: '1️⃣ Nome da Parte Autora', type: 'text', required: true },
            { id: 'cpf_autora', label: '2️⃣ CPF da Parte Autora', type: 'text', required: true },
            { id: 'nome_advogado', label: '3️⃣ Nome do Advogado', type: 'text', required: true },
            { id: 'cpf_advogado', label: '4️⃣ CPF do Advogado', type: 'text', required: true },
            { id: 'oab_advogado', label: '5️⃣ OAB do Advogado', type: 'text', required: true },
            { id: 'ano_atual', label: '6️⃣ Ano Atual (para cálculo de RRA)', type: 'text', required: true, placeholder: 'Ex: 2024' },
            {
                id: 'texto_acordo',
                label: '7️⃣ Cópia integral do acordo do INSS',
                type: 'textarea',
                placeholder: 'Cole aqui o texto completo do acordo...',
                required: true,
            }
        ],
        modelSpecificInstruction: JSON.stringify({
            instructionText: "Esta ferramenta utiliza uma IA externa para extrair dados de acordos do INSS. Preencha os dados abaixo, cole o acordo e clique em uma das IAs. O prompt de extração será combinado com seu texto e copiado para a sua área de transferência.",
            staticPrompt: `Instruções para a IA:\nVocê é uma IA especializada na análise de documentos jurídicos, com foco em acordos do INSS. Sua tarefa é extrair informações específicas de um acordo fornecido pelo usuário, seguindo rigorosamente as diretrizes abaixo. A precisão e a objetividade são primordiais. Todas as informações extraídas devem ser apresentadas de forma clara, concisa e formatada para facilitar a cópia e cola em sistemas como o e-proc.\n\nCom base nos dados iniciais fornecidos e no texto integral do acordo do INSS, proceda à extração das seguintes informações. Para cada item, siga as instruções de localização e as regras de tratamento de incertezas:\n\n1. Número do Processo:\n• Localização: Procure o número do processo na linha imediatamente acima ou na mesma linha dos termos "REQUERENTE" ou "REQUERENTE(S)". O formato esperado é uma sequência numérica que pode incluir pontos e hífens (ex: 0000000-00.0000.0.00.0000).\n• Tratamento de Incerteza: Se o número do processo não for encontrado exatamente conforme a regra de localização ou se houver ambiguidade, reporte: "Número do Processo: Não foi possível localizar com certeza. Solicitar intervenção do usuário."\n\n2. Tipo de Benefício e Código Correspondente:\n• Localização: Identifique o "Tipo de Benefício" na primeira linha da tabela de acordo, geralmente posicionada abaixo da seção "INICIALMENTE: DA PROPOSTA DE ACORDO...".\n• Mapeamento de Código: Após identificar o "Tipo de Benefício", consulte as tabelas de referência 2.1 e 2.2 (fornecidas abaixo) para determinar o "CÓDIGO CORRESPONDENTE". A correspondência deve ser exata ou a mais próxima semanticamente possível, priorizando os termos listados nas tabelas.\n• Tabelas de Referência para Tipo de Benefício e RRA:\n• 2.1 Assuntos que PRECISAM informar RRA:\n• 2.1.1 Assunto: Aposentadoria por Incapacidade Permanente\n• Códigos: 040101 (Geral), 04010101 (Adicional de 25%), 04010102 (Urbana), 04010103 (Rural)\n• 2.1.2 Assunto: Salário-Maternidade\n• Código: 04010701\n• 2.1.3 Assunto: Aposentadoria por Idade\n• Códigos: 040102 (Geral), 04010201 (Urbana), 04010202 (Rural), 04010203 (Híbrida)\n• 2.1.4 Assunto: Aposentadoria Especial\n• Códigos: 040104 (Geral), Outros específicos (04010401 – Frentista, 04010413 – Professor, outros)\n• 2.1.5 Assunto: Pensão por Morte\n• Códigos: 040108 (Geral), 04010805 (Rural), 04010806 (Urbana)\n• 2.2 Assuntos que NÃO PRECISAM informar RRA:\n• 2.2.1 Assunto: Auxílio por Incapacidade Temporária\n• Códigos: 040105 (Geral), 04010501 (Adicional de 25%), 04010502 (Urbano), 04010503 (Rural)\n• 2.2.2 Assunto: Auxílio-Reclusão\n• Código: 040109\n• 2.2.3 Assunto: Benefício Assistencial\n• Códigos: 1402 (Geral), 140201 (Pessoa com deficiência), 140202 (Idoso)\n• 2.2.4 Assunto: Auxílio-Acidente (Atenção: quando não for proveniente de acidente do trabalho).\n• Códigos: 040111 (Geral), 04011101 (Incapacidade Laborativa Parcial), 04011102 (Incapacidade Laborativa Permanente), 04011103 (Incapacidade Laborativa Temporária), Outros\n• Tratamento de Incerteza: Se o "Tipo de Benefício" não for claramente identificável ou se não houver um código correspondente exato nas tabelas, reporte: "Tipo de Benefício/Código: Não foi possível mapear com certeza. Solicitar intervenção do usuário."\n\n3. Valor da Parte Autora:\n• Localização: Procure o valor numérico que precede ou está na mesma linha da frase "COMPOSIÇÃO DOS VALORES ATRASADOS", localizada abaixo da seção "INICIALMENTE: DA PROPOSTA DE ACORDO...". O valor deve ser um número decimal (ex: 1.234,56 ou 1234.56).\n• Tratamento de Incerteza: Se o valor não for encontrado ou houver ambiguidade na sua identificação, reporte: "Valor da Parte Autora: Não foi possível localizar com certeza. Solicitar intervenção do usuário."\n\n4. Valor dos Honorários Advocatícios:\nLocalização da Cláusula: Identifique a seção no acordo que trata de "Honorários Advocatícios" ou termos similares.\nIdentificação da Regra para Rito Ordinário: Dentro dessa seção, procure a regra específica para o cálculo de honorários no "rito ordinário" (ou equivalente).\nExemplo de texto a ser procurado: "No rito ordinário, [X]% sobre o valor da proposta de acordo..."\nPremissa de Aplicação: Para os fins desta análise, considere que o processo em questão sempre se enquadra na condição de "rito ordinário" (ou a condição que ativa o pagamento de honorários percentuais sobre o acordo, conforme descrito na cláusula).Importante!!! Ignore menções a não pagamento em outros ritos (como JEF), a menos que seja a única regra apresentada.\nCálculo:\nSe for encontrada uma regra explícita de percentual para o rito ordinário (ex: 10% sobre o valor da proposta), calcule os honorários com base no "Valor da Parte Autora" (item 3).\nSe a cláusula indicar um valor fixo para o rito ordinário, utilize esse valor.\nTratamento de Incerteza:\nSe a seção "Honorários Advocatícios" não for encontrada, ou se, mesmo considerando a premissa do rito ordinário, não houver uma regra clara (percentual ou valor fixo) para o cálculo dos honorários, reporte: "Valor dos Honorários Advocatícios: Não foi possível localizar uma regra clara para o cálculo dos honorários na seção correspondente do acordo, mesmo assumindo o rito ordinário. Solicitar intervenção do usuário para fornecer o valor ou a regra de cálculo."\nSe a cláusula apenas mencionar que honorários não são devidos (mesmo em rito ordinário, o que seria atípico dada a premissa, mas possível se o acordo for muito específico), então o valor dos honorários será R$ 0,00.\n\n5. Valor Total da Requisição:\n• Cálculo: Some o "Valor da Parte Autora" (item 3) e o "Valor dos Honorários Advocatícios" (item 4).\n• Tratamento de Incerteza: Se qualquer um dos valores necessários para o cálculo (Valor da Parte Autora ou Valor dos Honorários Advocatícios) não puder ser determinado com certeza, reporte: "Valor Total da Requisição: Não foi possível calcular devido a dados incompletos ou incertos. Solicitar intervenção do usuário."\n\n6. Cálculo e Separação das Parcelas por Exercício (Anos Anteriores e Ano Atual)\nCom base no "Ano Atual" informado pelo usuário, siga os passos abaixo:\nLocalização DIB/DIP:\nLocalização: Identifique as datas de DIB (Data de Início do Benefício) e DIP (Data de Início do Pagamento) na tabela de acordo do documento. As datas devem estar no formato DD.MM.AAAA.\nCálculo do Número Total de Meses e Valor Mensal:\nNúmero Total de Meses: Calcule o número de meses no período de atrasados. O cálculo começa no mês da DIB (inclusive) e termina no mês imediatamente anterior ao mês da DIP.\nExemplo Corrigido: Se a DIB é 14.08.2023 e a DIP é 01.04.2024:\nOs meses de atrasados em 2023 são: Agosto, Setembro, Outubro, Novembro, Dezembro (Total: 5 meses).\nOs meses de atrasados em 2024 são: Janeiro, Fevereiro, Março (Total: 3 meses). O mês de Abril (mês da DIP) não entra no cálculo dos atrasados, pois é quando se inicia o pagamento regular.\nTotal de meses/parcelas a serem pagas via RPV/Precatório = 8 meses.\nValor Mensal da Parcela: Divida o "Valor da Parte Autora" (item 3) pelo número total de meses calculado (no nosso exemplo, 8).\nSeparação das Parcelas por Exercício (usando o "Ano Atual" informado pelo usuário):\nParcelas de Anos Anteriores:\nDefinição: Correspondem a todas as parcelas cujas competências (mês/ano de direito) são ANTERIORES a 1º de janeiro do "Ano Atual" informado pelo usuário.\nCálculo: Some os valores de todas estas parcelas.\nApresentação: "Parcelas de Anos Anteriores (competências de [Mês/Ano Início] a [Mês/Ano Fim]): [Número] parcelas, totalizando R$ [Valor Total]".\nExemplo: Se o usuário informou 2024 como o Ano Atual, as parcelas de 08/2023 a 12/2023 seriam as de anos anteriores. "Parcelas de Anos Anteriores (competências de 08/2023 a 12/2023): 5 parcelas, totalizando R$ X.XXX,XX".\nParcelas do Ano Atual:\nDefinição: Correspondem a todas as parcelas cujas competências (mês/ano de direito) estão DENTRO do "Ano Atual" informado pelo usuário.\nCálculo: Some os valores de todas estas parcelas.\nApresentação: "Parcelas do Ano Atual (competências de [Mês/Ano Início] a [Mês/Ano Fim]): [Número] parcelas, totalizando R$ [Valor Total]".\nExemplo: Com Ano Atual 2024, as parcelas de 01/2024 a 03/2024 seriam as do ano atual. "Parcelas do Ano Atual (competências de 01/2024 a 03/2024): 3 parcelas, totalizando R$ Y.YYY,YY".\nTratamento de Incerteza:\nSe a DIB ou a DIP não forem localizadas no documento, o cálculo não pode ser realizado.\nSe houver qualquer outra ambiguidade que impeça o cálculo seguro das parcelas ou sua distribuição, mesmo após obter o "Ano Atual".\nEm qualquer um desses casos, reporte: "Cálculo e Separação das Parcelas: Não foi possível realizar com certeza devido a [motivo específico da incerteza, ex: 'DIP não localizada no documento']. Solicitar intervenção do usuário."\n\n7. Precisa Informar RRA?:\n• Lógica de Decisão: Com base no "Tipo de Benefício" identificado (item 2), determine se ele se enquadra na seção 2.1 (PRECISAM informar RRA) ou 2.2 (NÃO PRECISAM informar RRA) das tabelas de referência. A resposta deve ser "Sim" ou "Não".\n• Tratamento de Incerteza: Se o "Tipo de Benefício" não puder ser mapeado com certeza para as tabelas 2.1 ou 2.2, reporte: "Precisa Informar RRA?: Não foi possível determinar com certeza. Solicitar intervenção do usuário."\n\n8. Data Base:\n• Localização: Procure a data de emissão do documento, que geralmente se encontra no final do acordo, após a assinatura do representante do INSS. O formato esperado é "Cidade, DD de Mês de AAAA" (ex: "Belo Horizonte, 23 de abril de 2025").\n• Tratamento de Incerteza: Se a data não for encontrada ou houver ambiguidade na sua identificação, reporte: "Data Base: Não foi possível localizar com certeza. Solicitar intervenção do usuário."\n\nEtapa 3: Apresentação dos Resultados\nApós a extração de todas as informações, apresente-as em um formato claro, objetivo e sem ilações, ideal para cópia e cola no sistema e-proc. Para cada item, utilize o seguinte formato:\n[Nome do Campo]: [Valor Extraído ou Mensagem de Incerteza]\n\nExemplo de Saída:\nNúmero do Processo: 0000000-00.0000.0.00.0000\nTipo de Benefício: Aposentadoria por Incapacidade Permanente\nCódigo Correspondente: 040101\nValor da Parte Autora: 15.000,00\nValor dos Honorários Advocatícios: 1.500,00\nValor Total da Requisição: 16.500,00\nCálculo das Parcelas (DIB/DIP): Não foi possível realizar com certeza. Solicitar intervenção do usuário.\nPrecisa Informar RRA?: Sim\nData Base: Belo Horizonte, 23 de abril de 2025\n\nRegra Final: Em qualquer situação em que uma informação não possa ser extraída com absoluta certeza, ou se houver qualquer ambiguidade, a IA DEVE informar ao usuário que não foi possível extrair a informação com certeza e solicitar sua intervenção. JAMAIS invente, infira ou faça ilações. A precisão é a sua principal diretriz.`,
            ais: [
                { name: "AI Studio", url: "https://aistudio.google.com/prompts/new_chat", icon: "✨" },
                { name: "Perplexity", url: "https://www.perplexity.ai/", icon: "🅿️" },
                { name: "Manus", url: "https://manus.im/app", icon: "🤖" }
            ]
        })
    },
];

const allLotes: DocumentModel[] = [
    {
        label: "Certidão de Aceite de Perícia (Lote)",
        value: "lote_certidao_aceite_pericia",
        fields: [
            {
                id: 'template',
                label: '1️⃣ Modelo do Documento',
                type: 'textarea',
                required: true,
                defaultValue: 'CERTIDÃO – DESIGNAÇÃO DE PERÍCIA MÉDICA\nProcesso nº {{PROCESSO}} – Autor: {{AUTOR}}\n\nCertifico, para os devidos fins, que o médico perito {{NOME_PERITO}} manifestou aceite à nomeação como perito nos presentes autos, tendo designado a realização da perícia para o dia {{DATA_EXTENSO}}, às {{HORARIO}}h, nas dependências do PAM – Pronto Atendimento Médico desta Comarca, localizado na Avenida Professora Elza Bacelar, Bairro Santana, Raul Soares/MG.\n\nRaul Soares, {{DATA_SISTEMA_EXTENSO}}\n\nJosé Geraldo Ferreira\nGerente de Secretaria\n(assinado digitalmente)'
            },
            {
                id: 'nome_perito',
                label: '2️⃣ Nome do Perito (para {{NOME_PERITO}})',
                type: 'text',
                required: true,
                placeholder: 'Ex: Dr. Gustavo Flores Cecílio'
            },
            {
                id: 'data_pericia',
                label: '3️⃣ Data da Perícia (para {{DATA_EXTENSO}})',
                type: 'date',
                required: true,
            },
            {
                id: 'dados_planilha',
                label: '4️⃣ Cole os dados da planilha (PROCESSO, AUTOR, HORARIO)',
                type: 'textarea',
                required: true,
                placeholder: 'Cole aqui os dados da sua planilha ou documento. O formato esperado para cada linha é: PROCESSO NOME HORA.\n\nExemplo:\n5001974-42.2024.8.13.0540 Paulo Henrique Pereira 09:00\n5001738-90.2024.8.13.0540 Raiany Maria da Silva 09:00'
            },
            {
                id: 'data_sistema_extenso',
                label: '5️⃣ Data da Certidão (por extenso, para {{DATA_SISTEMA_EXTENSO}})',
                type: 'text',
                required: true,
                placeholder: 'Ex: 23 de outubro de 2025'
            }
        ]
    }
];


export const INITIAL_DOCUMENT_MODELS: Settings['documentModels'] = {
  [DocumentCategory.CERTIDAO]: allCertidoes.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.ATO_ORDINATORIO]: allAtos.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.OFICIO]: allOficios.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.ALVARA]: allAlvaras.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.FORMAL_PARTILHA]: allFormais.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.TERMO_COMPROMISSO]: allTermos.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.CARTA_PRECATORIA]: allCartas.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.MANDADO]: allMandados.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.EMAIL]: allEmails.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.PORTARIA]: allPortarias.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.BUSCA]: allBuscas.sort((a, b) => a.label.localeCompare(b.label)),
  [DocumentCategory.LOTE]: allLotes.sort((a, b) => a.label.localeCompare(b.label)),
};

export const INITIAL_AIS: Settings['ais'] = [
  { 
    id: 'aistudio-integrated', 
    name: 'AI Studio (Integrado)', 
    url: 'https://aistudio.google.com/', 
    icon: '🪄',
    isIntegrated: true,
    modelName: 'gemini-2.5-pro',
    isSearchGrounded: false,
    description: 'Emula a experiência de alta qualidade do AI Studio usando o modelo Pro. Integrado e poderoso.'
  },
  { 
    id: 'gemini-flash', 
    name: 'Gemini Flash (Integrado)', 
    url: 'https://gemini.google.com/app', 
    icon: '⚡️',
    isIntegrated: true,
    modelName: 'gemini-2.5-flash',
    isSearchGrounded: false,
    description: 'Modelo rápido e eficiente. Gera o texto dentro deste app.'
  },
  { 
    id: 'gemini-pro', 
    name: 'Gemini Pro (Integrado)', 
    url: 'https://gemini.google.com/app', 
    icon: '✨',
    isIntegrated: true,
    modelName: 'gemini-2.5-pro',
    isSearchGrounded: false,
    description: 'Modelo mais poderoso para resultados elaborados. Gera no app.'
  },
  { 
    id: 'custom-gemini-pro', 
    name: 'Gemini Pro Custom', 
    url: 'https://gemini.google.com/app', 
    icon: '🔧',
    isIntegrated: true,
    modelName: 'gemini-2.5-pro',
    isSearchGrounded: false,
    description: 'Modelo Pro personalizável. Ideal para adaptar o prompt do sistema a documentos legais específicos.'
  },
  // Fix: Replaced 'isExternal' with 'isIntegrated: false' and added missing 'modelName' property to align with the AiInfo type.
  { 
    id: 'chatgpt-external', 
    name: 'ChatGPT (Externo)', 
    url: 'https://chatgpt.com/g/g-p-68dfb56efea08191a66148c4c9cfdfc7-certidoes-e-atos-ordinatorios/project', 
    icon: '🧠',
    isIntegrated: false,
    modelName: 'gemini-2.5-flash',
    isSearchGrounded: false,
    description: 'GPT-4 customizado. Abre o ChatGPT em nova aba.'
  },
  // Fix: Replaced 'isExternal' with 'isIntegrated: false' and added missing 'modelName' property to align with the AiInfo type.
  { 
    id: 'copilot-external', 
    name: 'Copilot (Externo)', 
    url: 'https://copilot.microsoft.com/', 
    icon: '💼',
    isIntegrated: false,
    modelName: 'gemini-2.5-flash',
    isSearchGrounded: false,
    description: 'Abre o Microsoft Copilot em uma nova aba.'
  },
  { 
    id: 'manus-external', 
    name: 'Manus (Externo)', 
    url: 'https://manus.im/app', 
    icon: '🤖',
    isIntegrated: false,
    modelName: 'gemini-2.5-flash',
    isSearchGrounded: false,
    description: 'Abre o Manus em uma nova aba.'
  }
];
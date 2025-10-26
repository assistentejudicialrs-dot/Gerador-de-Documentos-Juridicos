export enum DocumentCategory {
  CERTIDAO = 'Certidões',
  ATO_ORDINATORIO = 'Atos Ordinatórios',
  OFICIO = 'Ofícios',
  ALVARA = 'Alvarás Judiciais',
  FORMAL_PARTILHA = 'Formais de Partilha',
  TERMO_COMPROMISSO = 'Termos de Compromisso',
  CARTA_PRECATORIA = 'Cartas Precatórias',
  EMAIL = 'E-mails',
  MANDADO = 'Mandados',
  PORTARIA = 'Portarias',
  BUSCA = 'Busca Externa',
  LOTE = 'Geração em Lote',
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'radio' | 'select' | 'date' | 'dynamic-periods';
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  options?: string[];
  lookup?: 'judges' | 'managers' | 'oficiais';
}

export interface DocumentModel {
  label: string;
  value: string;
  fields: FormField[];
  modelSpecificInstruction?: string;
}

export interface AiInfo {
  id: string;
  name: string;
  url: string;
  icon?: string;
  isIntegrated?: boolean;
  modelName: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  isSearchGrounded?: boolean;
  description: string;
}

export interface Server {
  id: string;
  name: string;
  role: string;
  matricula?: string;
}

export interface Judge {
  id: string;
  name: string;
}

export interface LegalBasis {
  id: string;
  title: string;
  content: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  servers: Server[];
  defaultServerId: string | null;
  judges: Judge[];
  defaultJudgeId: string | null;
  defaultLocation: string;
  documentModels: {
    [DocumentCategory.CERTIDAO]: DocumentModel[];
    [DocumentCategory.ATO_ORDINATORIO]: DocumentModel[];
    [DocumentCategory.OFICIO]?: DocumentModel[];
    [DocumentCategory.ALVARA]?: DocumentModel[];
    [DocumentCategory.FORMAL_PARTILHA]?: DocumentModel[];
    [DocumentCategory.TERMO_COMPROMISSO]?: DocumentModel[];
    [DocumentCategory.CARTA_PRECATORIA]?: DocumentModel[];
    [DocumentCategory.EMAIL]?: DocumentModel[];
    [DocumentCategory.MANDADO]?: DocumentModel[];
    [DocumentCategory.PORTARIA]?: DocumentModel[];
    [DocumentCategory.BUSCA]?: DocumentModel[];
    [DocumentCategory.LOTE]?: DocumentModel[];
  };
  ais: AiInfo[];
  appVersion: string;
  customSystemInstruction: string;
  legalBases: LegalBasis[];
  favorites: string[];
  defaultFontFamily?: string;
  documentHeaderHtml?: string;
  deletedDefaultModels?: string[];
  lastMigrationVersion?: string;
  lastUsedCategory?: DocumentCategory;
  lastUsedModelValue?: string;
}

export interface Backup {
    date: string;
    settings: Settings;
}

export interface AnalysisResult {
  categoria: DocumentCategory;
  modelo_value: string;
  justificativa: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GeneratedMetadata {
  metadados?: {
    tipo_documento?: string;
    modelo_usado?: string;
    processo?: string;
    assinante?: string;
    data_elaboracao?: string;
    campos_faltantes?: string[];
  };
  evidencias?: {
    fontes_consultadas?: {
      tipo?: string;
      conteudo?: string;
      url?: string;
      titulo?: string;
      data_acesso?: string;
    }[];
  };
  pendencias?: string[];
}
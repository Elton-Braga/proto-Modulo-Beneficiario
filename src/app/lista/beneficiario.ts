export interface Beneficiario {
  check: any;
  codigo_projeto: string;
  projeto: any;
  lote: number;
  nome_T1: string;
  situacao_T1: any;
  nome_T2: string;
  situacao_T2: any;
  data_situacao_T2: any;
  regularizacao: string;
  periodo_regularizacao: string;
  status: string;
  acoes: string[];
  numero_processo: string | string[];
  cpf_T1: string;
  codigo_beneficiario: string;
  telefone: string;
  email: string;

  // 🔹 Novos atributos
  data_nascimento: string; // formato 'yyyy-MM-dd' ou Date
  estado_civil: string;
  falecido: boolean;
  data_falecimento?: string | null; // opcional, só se falecido for true

  nome_pai: string;
  nome_mae: string;
  nacionalidade: string;
  naturalidade: string;
  municipio: string;
  codigo_municipio: string;

  tipo_documento: string; // ex: 'RG'
  numero_documento: string;
  orgao_emissor: string;
  uf_orgao: string;

  numero_nis: string;
}

import { BeneficiarioBloqueio } from './beneficiarioBloqueio';
import { Lote } from './lote';
import { UnidadeFamiliar } from './unidadeFamiliar';
//import { Historico } from './modal/modal-historico';

export interface Beneficiario {
  check: any;
  sr: any;
  codigo_projeto: string;
  projeto: any;
  lote: any | number;
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

  // 🔹 Novos atributos já existentes
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

  // 🔹 Atributos da nova lista
  data_homologacao_Titular: string;
  situacao_Titular: string;
  data_situacao_Titular: string | null;
  data_situacao_Conjuge: string | null;
  data_homologacao_conjuge: string | null;
  situacao_conjuge: string;
  aptoPNRA_conjuge: boolean | null;
  tipo_lote: string;
  area_lote: number | null | any;
  numero_lote: string;
  codigo_SNCR: string;
  denominacao_Gleba: string;
  denominacao_lote: string;
  observacao: string;
  data_observacao: string | null;
  municipios: string;
  estados: string;
  apto_para_beneficiario: string; // será validado pelo formulário (required)
  cpf_conjuge: string | any | null;
  cod_beneficiario: String;
  dependentes: UnidadeFamiliar[];
  bloqueios: BeneficiarioBloqueio[];
  tela_lote: Lote[];
  historico_PNRA: HistoricoPNRA[];
}

interface HistoricoPNRA {
  CPF: string[];
  nome: string[];
  codigo_beneficiario: string;
  nome_PA: string;
  situacao: string;
  data_Situacao: string;
}

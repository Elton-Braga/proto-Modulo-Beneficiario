export interface UnidadeFamiliar {
  situacao_conjugal: string; // obrigatório
  data_uniao: Date; // obrigatório
  data_separacao?: Date; // opcional
  renda_familiar: number; // obrigatório, mínimo 0
  nome_dependente: string; // obrigatório
  tipo_dependente: string; // obrigatório
  nome: string; // obrigatório
  data_nascimento: Date; // obrigatório
  data_entrada_na_familia: Date; // obrigatório
  cpf_dependente: string; // obrigatório, 11 dígitos
  associacao_unidade_familiar: string; // obrigatório
}

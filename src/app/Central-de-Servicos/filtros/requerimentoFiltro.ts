export interface RequerimentoFiltro {
  //check: any;
  numerosDoRequerimento: string[];
  dataRequerimento: Date | string;
  codigoBeneficiario: string;
  cpfBeneficiario: string;
  nomeBeneficiario: string;
  cpfConjuge: string;
  nomeConjuge: string;
  sr: string;
  uf: string;
  projetoAssentamento: string;
  tipoDeServico: string;
  perfilDoSolicitante: string;
  status: string;
  acoes: string[];
  detalhar: string;
}

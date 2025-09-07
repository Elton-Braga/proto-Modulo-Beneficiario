export interface Requerimento {
cpf: string;
nome: string;
sr: string;
uf: string;
municipio: string;
projetoDeAssentamento?: string;
numeroDoRequerimento: string;
dataDoRequerimento: string | Date;
tipoDeServico: string;
status: string = 'Pendente' | 'Em Andamento' | 'Concluído' | 'Cancelado' ;
}


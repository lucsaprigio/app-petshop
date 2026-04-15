export type UserRole = 'cliente' | 'admin';

export type PetStatus = 'Agendado' | 'No Banho' | 'Finalizado';

export type Servico = 'Banho' | 'Tosa' | 'Banho e Tosa' | 'Consulta Veterinária';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
}

export interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  donoCpf: string;
  donoId: string;
}

export interface Agendamento {
  id: string;
  petId: string;
  petNome: string;
  donoNome: string;
  servico: Servico;
  dataHora: Date;
  status: PetStatus;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento, Pet, PetStatus, Servico, Usuario } from '../models/types.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private usuarioLogado$ = new BehaviorSubject<Usuario | null>(null);

  private usuarios: Usuario[] = [
    { id: '1', nome: 'João Silva', email: 'joao@email.com', senha: '123', role: 'cliente' },
    { id: '2', nome: 'Maria Costa', email: 'maria@email.com', senha: '123', role: 'cliente' },
    { id: 'admin', nome: 'Administrador', email: 'admin@petshop.com', senha: 'admin', role: 'admin' },
  ];

  private pets$ = new BehaviorSubject<Pet[]>([
    { id: 'p1', nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', donoCpf: '111.111.111-11', donoId: '1' },
    { id: 'p2', nome: 'Mia', especie: 'Gato', raca: 'Siamês', donoCpf: '111.111.111-11', donoId: '1' },
    { id: 'p3', nome: 'Bolinha', especie: 'Cachorro', raca: 'Poodle', donoCpf: '222.222.222-22', donoId: '2' },
  ]);

  private agendamentos$ = new BehaviorSubject<Agendamento[]>([
    {
      id: 'a1',
      petId: 'p1',
      petNome: 'Rex',
      donoNome: 'João Silva',
      servico: 'Banho e Tosa',
      dataHora: new Date('2026-04-15T10:00'),
      status: 'Agendado',
    },
    {
      id: 'a2',
      petId: 'p3',
      petNome: 'Bolinha',
      donoNome: 'Maria Costa',
      servico: 'Banho',
      dataHora: new Date('2026-04-15T11:00'),
      status: 'No Banho',
    },
  ]);

  // Auth
  login(email: string, senha: string): Observable<Usuario | null> {
    const usuario = this.usuarios.find(u => u.email === email && u.senha === senha) || null;
    this.usuarioLogado$.next(usuario);
    return of(usuario);
  }

  logout(): void {
    this.usuarioLogado$.next(null);
  }

  getUsuarioLogado(): Observable<Usuario | null> {
    return this.usuarioLogado$.asObservable();
  }

  // Pets
  getPetsByUsuario(donoId: string): Observable<Pet[]> {
    return this.pets$.pipe(map(pets => pets.filter(p => p.donoId === donoId)));
  }

  getTodosPets(): Observable<Pet[]> {
    return this.pets$.asObservable();
  }

  adicionarPet(pet: Omit<Pet, 'id'>): void {
    const current = this.pets$.getValue();
    const novoPet: Pet = { ...pet, id: `p${Date.now()}` };
    this.pets$.next([...current, novoPet]);
  }

  // Agendamentos
  getTodosAgendamentos(): Observable<Agendamento[]> {
    return this.agendamentos$.asObservable();
  }

  getAgendamentosByDono(donoId: string): Observable<Agendamento[]> {
    return this.agendamentos$.pipe(
      map(agendamentos => {
        const petsDoUsuario = this.pets$.getValue().filter(p => p.donoId === donoId).map(p => p.id);
        return agendamentos.filter(a => petsDoUsuario.includes(a.petId));
      })
    );
  }

  criarAgendamento(petId: string, servico: Servico, dataHora: Date, donoNome: string, petNome: string): void {
    const current = this.agendamentos$.getValue();
    const novo: Agendamento = {
      id: `a${Date.now()}`,
      petId,
      petNome,
      donoNome,
      servico,
      dataHora,
      status: 'Agendado',
    };
    this.agendamentos$.next([...current, novo]);
  }

  atualizarStatus(agendamentoId: string, novoStatus: PetStatus): void {
    const current = this.agendamentos$.getValue();
    const atualizado = current.map(a =>
      a.id === agendamentoId ? { ...a, status: novoStatus } : a
    );
    this.agendamentos$.next(atualizado);
  }
}

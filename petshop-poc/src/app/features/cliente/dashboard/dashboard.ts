import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService } from '../../../core/services/mock-data';
import { Agendamento, Pet, Servico, Usuario } from '../../../core/models/types.model';
import { Shell, NavItem } from '../../../shared/shell/shell';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, Shell],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  usuario$: Observable<Usuario | null>;
  pets$!: Observable<Pet[]>;
  agendamentos$!: Observable<Agendamento[]>;

  navItems: NavItem[] = [
    { label: 'Meus Pets', icon: 'pets', route: '/cliente/dashboard' },
  ];

  activeTab: 'pets' | 'agendamentos' = 'pets';
  showPetForm = false;
  showAgendamentoForm = false;

  novoPet = { nome: '', especie: '', raca: '', donoCpf: '' };
  novoAgendamento = { petId: '', servico: '' as Servico, dataHora: '' };
  servicos: Servico[] = ['Banho', 'Tosa', 'Banho e Tosa', 'Consulta Veterinária'];
  servicoIcons: Record<Servico, string> = {
    'Banho': 'water_drop',
    'Tosa': 'content_cut',
    'Banho e Tosa': 'spa',
    'Consulta Veterinária': 'medical_services',
  };

  constructor(
    private mockDataService: MockDataService,
    private router: Router,
  ) {
    this.usuario$ = this.mockDataService.getUsuarioLogado();
  }

  ngOnInit(): void {
    this.usuario$.subscribe(usuario => {
      if (usuario) {
        this.pets$ = this.mockDataService.getPetsByUsuario(usuario.id);
        this.agendamentos$ = this.mockDataService.getAgendamentosByDono(usuario.id);
      }
    });
  }

  adicionarPet(usuario: Usuario): void {
    if (!this.novoPet.nome || !this.novoPet.especie) return;
    this.mockDataService.adicionarPet({ ...this.novoPet, donoId: usuario.id });
    this.novoPet = { nome: '', especie: '', raca: '', donoCpf: '' };
    this.showPetForm = false;
  }

  agendar(usuario: Usuario, pets: Pet[]): void {
    if (!this.novoAgendamento.petId || !this.novoAgendamento.servico || !this.novoAgendamento.dataHora) return;
    const pet = pets.find(p => p.id === this.novoAgendamento.petId);
    if (!pet) return;
    this.mockDataService.criarAgendamento(
      this.novoAgendamento.petId,
      this.novoAgendamento.servico,
      new Date(this.novoAgendamento.dataHora),
      usuario.nome,
      pet.nome
    );
    this.novoAgendamento = { petId: '', servico: '' as Servico, dataHora: '' };
    this.showAgendamentoForm = false;
  }

  petEmoji(especie: string): string {
    const e = especie.toLowerCase();
    if (e.includes('gato')) return '🐱';
    if (e.includes('cachorro')) return '🐶';
    if (e.includes('ave') || e.includes('pássaro')) return '🦜';
    return '🐾';
  }

  statusClass(status: string): string {
    return 's-' + status.toLowerCase().replace(/ /g, '-');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockDataService } from '../../../core/services/mock-data';
import { Agendamento, PetStatus } from '../../../core/models/types.model';
import { Shell, NavItem } from '../../../shared/shell/shell';

interface KanbanColuna {
  status: PetStatus;
  label: string;
  icon: string;
  accentColor: string;
  nextStatus?: PetStatus;
  nextLabel?: string;
}

@Component({
  selector: 'app-kanban',
  imports: [CommonModule, Shell, MatSnackBarModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
})
export class Kanban implements OnInit {
  agendamentos$!: Observable<Agendamento[]>;

  navItems: NavItem[] = [
    { label: 'Kanban', icon: 'view_kanban', route: '/admin/kanban' },
  ];

  colunas: KanbanColuna[] = [
    { status: 'Agendado',   label: 'Agendado',   icon: 'schedule',       accentColor: '#3b82f6', nextStatus: 'No Banho',    nextLabel: 'Iniciar Banho' },
    { status: 'No Banho',   label: 'No Banho',   icon: 'water_drop',     accentColor: '#8b5cf6', nextStatus: 'Finalizado',  nextLabel: 'Finalizar' },
    { status: 'Finalizado', label: 'Finalizado', icon: 'check_circle',   accentColor: '#22c55e' },
  ];

  constructor(
    private mockDataService: MockDataService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.agendamentos$ = this.mockDataService.getTodosAgendamentos();
  }

  getByStatus(agendamentos: Agendamento[], status: PetStatus): Agendamento[] {
    return agendamentos.filter(a => a.status === status);
  }

  avancar(ag: Agendamento, novoStatus: PetStatus, novoLabel: string): void {
    this.mockDataService.atualizarStatus(ag.id, novoStatus);
    if (novoStatus === 'Finalizado') {
      this.snackBar.open(
        `✅ ${ag.petNome} finalizou! Avise ${ag.donoNome}.`,
        'OK',
        { duration: 5000 }
      );
    }
  }
}

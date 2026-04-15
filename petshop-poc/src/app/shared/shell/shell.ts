import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data';
import { Usuario } from '../../core/models/types.model';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell implements OnInit {
  @Input() navItems: NavItem[] = [];
  @Input() roleLabel = 'Sistema';

  usuario: Usuario | null = null;

  constructor(
    private mockDataService: MockDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mockDataService.getUsuarioLogado().subscribe(u => (this.usuario = u));
  }

  get initials(): string {
    if (!this.usuario?.nome) return '?';
    return this.usuario.nome
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  sair(): void {
    this.mockDataService.logout();
    this.router.navigate(['/login']);
  }
}

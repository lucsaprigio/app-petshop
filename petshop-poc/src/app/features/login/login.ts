import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../core/services/mock-data';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  senha = '';
  loading = false;
  erro = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router,
  ) {}

  entrar(): void {
    if (!this.email || !this.senha) return;
    this.loading = true;
    this.erro = '';

    this.mockDataService.login(this.email, this.senha).subscribe(usuario => {
      this.loading = false;
      if (!usuario) {
        this.erro = 'E-mail ou senha incorretos.';
        return;
      }
      if (usuario.role === 'admin') {
        this.router.navigate(['/admin/kanban']);
      } else {
        this.router.navigate(['/cliente/dashboard']);
      }
    });
  }
}

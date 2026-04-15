import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { MockDataService } from '../services/mock-data';

export const authGuard: CanActivateFn = () => {
  const mockDataService = inject(MockDataService);
  const router = inject(Router);

  return mockDataService.getUsuarioLogado().pipe(
    take(1),
    map(usuario => {
      if (usuario) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};

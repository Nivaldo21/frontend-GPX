import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { personReducer } from './store/person.reducer';
import { PersonEffects } from './store/person.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ person: personReducer }),
    provideEffects([PersonEffects]),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
  ]
};

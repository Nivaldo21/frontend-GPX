// src/app/store/person.state.ts
import { Person } from '../models/person.model';

export interface PersonState {
  persons: Person[];
  loading: boolean;
  error: string | null;
}

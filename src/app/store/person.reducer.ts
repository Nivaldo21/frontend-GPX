import { Action, createReducer, on } from '@ngrx/store';
import { Person } from '../models/person.model'; // Asegúrate de que esta ruta sea correcta
import { loadPersonsFailure, loadPersonsSuccess } from './person.actions';

export interface PersonState {
  persons: Person[];
}

export const initialState: PersonState = {
  persons: []
};

export const personReducer = createReducer(
  initialState,
  on(loadPersonsSuccess, (state, { persons }) => ({
    ...state,
    persons
  })),
  on(loadPersonsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

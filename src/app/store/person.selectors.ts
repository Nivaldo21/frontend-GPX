import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { PersonState } from './person.reducer';

export const selectPersonState = createFeatureSelector<PersonState>('person');

export const selectPersons = createSelector(
  selectPersonState,
  (state: PersonState) => state.persons
);

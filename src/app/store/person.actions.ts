// src/app/store/person.actions.ts
import { createAction, props } from '@ngrx/store';
import { Person } from '../models/person.model';

export const loadPersons = createAction('[Person] Load Persons');
export const loadPersonsSuccess = createAction('[Person] Load Persons Success', props<{ persons: Person[] }>());
export const loadPersonsFailure = createAction('[Person] Load Persons Failure', props<{ error: string }>());
export const addPerson = createAction('[Person] Add Person', props<{ person: Person }>());
export const addPersonSuccess = createAction('[Person] Add Person Success', props<{ person: Person }>());
export const addPersonFailure = createAction('[Person] Add Person Failure', props<{ error: string }>());
export const updatePerson = createAction('[Person] Update Person', props<{ person: Person }>());
export const updatePersonSuccess = createAction('[Person] Update Person Success', props<{ person: Person }>());
export const updatePersonFailure = createAction('[Person] Update Person Failure', props<{ error: string }>());
export const deletePerson = createAction('[Person] Delete Person', props<{ id: number }>());
export const deletePersonSuccess = createAction('[Person] Delete Person Success', props<{ id: number }>());
export const deletePersonFailure = createAction('[Person] Delete Person Failure', props<{ error: string }>());
export const searchPersons = createAction('[Person API] Search Persons',props<{ search: string }>());

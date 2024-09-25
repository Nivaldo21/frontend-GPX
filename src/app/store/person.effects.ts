import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PersonService } from '../services/person.service';
import { loadPersons, addPerson, updatePerson, deletePerson, loadPersonsSuccess, loadPersonsFailure, searchPersons } from './person.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PersonEffects {
  constructor(private actions$: Actions, private personService: PersonService) {}

  loadPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPersons),
      mergeMap(() =>
        this.personService.getPersons().pipe(
          map(persons => loadPersonsSuccess({ persons })),
          catchError(error => of(loadPersonsFailure({ error })))
        )
      )
    )
  );

  searchPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchPersons),
      mergeMap(action =>
        this.personService.getPersons(action.search).pipe(
          map(persons => loadPersonsSuccess({ persons })),
          catchError(error => {
            if (error.status === 404) {
              return of(loadPersonsSuccess({ persons: [] }));
            }
            return of(loadPersonsFailure({ error }));
          })
        )
      )
    )
  );

  addPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPerson),
      mergeMap(({ person }) =>
        this.personService.addPerson(person).pipe(
          map(() => loadPersons()),
          catchError(error => of(loadPersonsFailure({ error })))
        )
      )
    )
  );

  updatePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePerson),
      mergeMap(({ person }) =>
        this.personService.updatePerson(person).pipe(
          map(() => loadPersons()),
          catchError(error => of(loadPersonsFailure({ error })))
        )
      )
    )
  );

  deletePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePerson),
      mergeMap(({ id }) =>
        this.personService.deletePerson(id).pipe(
          map(() => loadPersons()),
          catchError(error => of(loadPersonsFailure({ error })))
        )
      )
    )
  );
}

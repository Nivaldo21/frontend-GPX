import { Component } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidationError } from '../../models/error.model';
import { PersonFormComponent } from '../person-form/person-form.component';
import { ToastrService } from 'ngx-toastr';
import { addPerson, deletePerson, loadPersons, searchPersons, updatePerson } from '../../store/person.actions';
import { Store } from '@ngrx/store';
import { selectPersons } from '../../store/person.selectors';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [PersonFormComponent, CommonModule, FormsModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  persons$: Observable<Person[]> = this.store.select(selectPersons);
  newPerson: Person = { firstName: '', lastNameP: '', lastNameM: '', address: '', phone: '', id: 0 };
  errors: ValidationError[] = [];
  hasError: boolean = false;
  showAddForm: boolean = false;
  flagEdit: boolean = false;
  search: string = "";

  constructor(private store: Store, private personService: PersonService, private toast: ToastrService) {}

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.store.dispatch(loadPersons());
    this.persons$ = this.store.select(selectPersons).pipe(
      catchError((error) => {
        console.log(error.status);
        if (error.status === 404) {
          return of([]);
        }
        return throwError(() => error);
      })
    );
  }

  onSearchChange() {
    this.store.dispatch(searchPersons({ search: this.search }));
  }

  addPerson(person: Person) {
    this.store.dispatch(addPerson({ person: person }));
    this.resetForm();
  }

  updatePerson() {
    this.store.dispatch(updatePerson({ person: this.newPerson }));
    this.resetForm();
  }

  editForm(person: Person) {
    this.newPerson = { ...person };
    this.showAddForm = true;
    this.flagEdit = true;
  }

  showForm() {
    this.resetForm();
    this.showAddForm = true;
  }

  resetForm() {
    this.newPerson = { firstName: '', lastNameP: '', lastNameM: '', address: '', phone: '', id: 0 };
    this.showAddForm = false;
    this.hasError = false;
    this.flagEdit = false;
  }

  deletePerson(id: number) {
    this.store.dispatch(deletePerson({ id }));
  }
}

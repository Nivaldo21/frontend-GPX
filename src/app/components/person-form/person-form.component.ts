import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationError } from '../../models/error.model';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  @Input() newPerson: Person = { firstName: '', lastNameP: '', lastNameM: '', address: '', phone: '', id: 0 };
  @Input() flagEdit: boolean = false;
  @Input() errors: ValidationError[] = [];
  @Input() hasError: boolean = false;

  @Output() submitForm = new EventEmitter<Person>();
  @Output() resetFormEvent = new EventEmitter<void>();

  addOrUpdatePerson() {
    this.submitForm.emit(this.newPerson);
  }

  resetForm() {
    this.newPerson = { firstName: '', lastNameP: '', lastNameM: '', address: '', phone: '', id: 0 };
    this.resetFormEvent.emit();
  }
}

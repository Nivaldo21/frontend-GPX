import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3000/people';

  constructor(private http: HttpClient) {}

  getPersons(search: string = ''): Observable<Person[]> {
    if (search.trim() === '') {
      return this.http.get<Person[]>(this.apiUrl);
    } else {
      return this.http.get<Person[]>(`${this.apiUrl}/search?search=${search}`);
    }
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${person.id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

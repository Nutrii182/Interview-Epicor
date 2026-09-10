import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { UsersResponse } from '../models/userResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly BASE_URL = `${environment.apiUrl}/users`;
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this.BASE_URL}`).pipe(map((resp) => resp.users));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/add`, user);
  }

  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private apiUrl = 'https://localhost:7190/api';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { email, password });
  }

  // 🔹 Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  private getHeaders() {
    return {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
  }

  // 🔹 Student CRUD
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Students`, this.getHeaders());
  }

  addStudent(student: any) {
    return this.http.post(`${this.apiUrl}/Students`, student, this.getHeaders());
  }

  updateStudent(student: any) {
    return this.http.put(`${this.apiUrl}/Students/${student.id}`, student, this.getHeaders());
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/Students/${id}`, this.getHeaders());
  }
}

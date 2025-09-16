// customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly API = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  listar(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API);
  }

  criar(dto: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API, dto);
  }

  atualizar(id: number, dto: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.API}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

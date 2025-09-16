import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleDTO } from '../models/sale-dto';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly API = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) { }

  listar(): Observable<SaleDTO[]> {
    return this.http.get<SaleDTO[]>(this.API);
  }

  criarVenda(sale: SaleDTO): Observable<SaleDTO> {
    return this.http.post<SaleDTO>(this.API, sale);
  }
  addItem(saleId: number, productId: number, quantity: number): Observable<SaleDTO> {
    return this.http.post<SaleDTO>(`${this.API}/${saleId}/add-item`, { productId, quantity });
  }
  alterarStatus(saleId: number, status: string): Observable<SaleDTO> {
    return this.http.patch<SaleDTO>(`${this.API}/${saleId}/status?status=${status}`, {});
  }
  getByCustomer(customerId: number): Observable<SaleDTO[]> {
    return this.http.get<SaleDTO[]>(`${this.API}/customer/${customerId}`);
  }
}

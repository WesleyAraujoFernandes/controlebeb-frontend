import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Category {
  id?: number;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  salvar(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  listar(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, category: Category): Observable<Category> {
   console.log("Atualizar categoria:ssss ", category);
    return this.http
      .put<Category>(`${this.apiUrl}/${id}`, category)
      .pipe(
        tap((data) => console.log('Categoria para alterar no backend:', data))
      );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

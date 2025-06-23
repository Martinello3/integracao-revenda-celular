import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.baseUrl}/sales`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  getById(id: string | number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  save(sale: Sale): Observable<Sale> {
    if (sale.id) {
      return this.update(sale);
    }
    return this.add(sale);
  }

  private add(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  private update(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${sale.id}`, sale);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterSales(filters: any): Observable<Sale[]> {
    let queryParams = '';
    
    if (filters) {
      const params = [];
      
      if (filters.storeId) {
        params.push(`store.id=${filters.storeId}`);
      }
      
      if (filters.status) {
        params.push(`status=${filters.status}`);
      }
      
      if (params.length > 0) {
        queryParams = '?' + params.join('&');
      }
    }
    
    return this.http.get<Sale[]>(`${this.apiUrl}${queryParams}`);
  }
}

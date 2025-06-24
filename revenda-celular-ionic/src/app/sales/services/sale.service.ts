import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale, CreateSaleDto, UpdateSaleDto, DashboardStats } from '../models/sale.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.baseUrl}/sales`;

  constructor(private http: HttpClient) { }

  getAll(status?: string): Observable<Sale[]> {
    const params = status ? `?status=${status}` : '';
    return this.http.get<Sale[]>(`${this.apiUrl}${params}`);
  }

  getList(): Observable<Sale[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  getByCustomer(customerId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getByStore(storeId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/store/${storeId}`);
  }

  private add(sale: CreateSaleDto): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  private update(id: number, sale: UpdateSaleDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, sale);
  }

  save(sale: Sale): Observable<any> {
    if (sale.id) {
      const updateData: UpdateSaleDto = {
        customerId: sale.customerId,
        storeId: sale.storeId,
        paymentMethod: sale.paymentMethod,
        status: sale.status,
        seller: sale.seller,
        items: sale.items.map(item => ({
          productId: item.productId,
          productType: item.productType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal
        }))
      };
      return this.update(sale.id, updateData);
    } else {
      const createData: CreateSaleDto = {
        customerId: sale.customerId,
        storeId: sale.storeId,
        paymentMethod: sale.paymentMethod,
        status: sale.status,
        seller: sale.seller,
        items: sale.items.map(item => ({
          productId: item.productId,
          productType: item.productType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal
        }))
      };
      return this.add(createData);
    }
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }

  remove(sale: Sale): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${sale.id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Dashboard methods
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getSalesByMonth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/monthly`);
  }

  getTopProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/top-products`);
  }

  getRecentSales(limit: number = 10): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/dashboard/recent?limit=${limit}`);
  }
}

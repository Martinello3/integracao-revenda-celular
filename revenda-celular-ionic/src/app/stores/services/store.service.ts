import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly apiUrl = `${environment.baseUrl}/stores`;

  constructor(private http: HttpClient) {}

  getList(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  getById(storeId: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${storeId}`);
  }

  private add(store: Store): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, store);
  }

  private update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.apiUrl}/${store.id}`, store);
  }

  save(store: Store): Observable<Store> {
    return store.id ? this.update(store) : this.add(store);
  }

  remove(store: Store): Observable<Store> {
    return this.http.delete<Store>(`${this.apiUrl}/${store.id}`);
  }
}

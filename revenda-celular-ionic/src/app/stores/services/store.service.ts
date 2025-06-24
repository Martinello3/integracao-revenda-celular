import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, CreateStoreDto, UpdateStoreDto } from '../models/store.type';
import { environment } from '../../../environments/environment';

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

  getActiveStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/active/list`);
  }

  private add(store: CreateStoreDto): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, store);
  }

  private update(id: number, store: UpdateStoreDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, store);
  }

  save(store: Store): Observable<any> {
    if (store.id) {
      const updateData: UpdateStoreDto = {
        name: store.name,
        address: store.address,
        city: store.city,
        state: store.state,
        phone: store.phone,
        manager: store.manager,
        isHeadquarters: store.isHeadquarters,
        status: store.status
      };
      return this.update(store.id, updateData);
    } else {
      const createData: CreateStoreDto = {
        name: store.name,
        address: store.address,
        city: store.city,
        state: store.state,
        phone: store.phone,
        manager: store.manager,
        isHeadquarters: store.isHeadquarters,
        status: store.status
      };
      return this.add(createData);
    }
  }

  remove(store: Store): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${store.id}`);
  }
}

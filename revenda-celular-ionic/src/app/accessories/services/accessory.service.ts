import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessory, CreateAccessoryDto, UpdateAccessoryDto } from '../models/accessory.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  private readonly apiUrl = `${environment.baseUrl}/accessories`;

  constructor(private http: HttpClient) { }

  getById(accessoryId: number): Observable<Accessory> {
    return this.http.get<Accessory>(`${this.apiUrl}/${accessoryId}`);
  }

  getList(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.apiUrl);
  }

  getByCategory(category: string): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(`${this.apiUrl}/category/${category}`);
  }

  getAvailableStock(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(`${this.apiUrl}/stock/available`);
  }

  private add(accessory: CreateAccessoryDto): Observable<Accessory> {
    return this.http.post<Accessory>(this.apiUrl, accessory);
  }

  private update(id: number, accessory: UpdateAccessoryDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, accessory);
  }

  updateStock(id: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/stock`, { quantity });
  }

  save(accessory: Accessory): Observable<any> {
    if (accessory.id) {
      const updateData: UpdateAccessoryDto = {
        name: accessory.name,
        description: accessory.description,
        price: typeof accessory.price === 'string' ? parseFloat(accessory.price) : accessory.price,
        category: accessory.category,
        image: accessory.image,
        stock: accessory.stock,
        compatiblePhoneIds: accessory.compatiblePhones?.map(phone => phone.id).filter((id): id is number => id !== undefined) || []
      };
      return this.update(accessory.id, updateData);
    } else {
      const createData: CreateAccessoryDto = {
        name: accessory.name,
        description: accessory.description,
        price: typeof accessory.price === 'string' ? parseFloat(accessory.price) : accessory.price,
        category: accessory.category,
        image: accessory.image,
        stock: accessory.stock,
        compatiblePhoneIds: accessory.compatiblePhones?.map(phone => phone.id).filter((id): id is number => id !== undefined) || []
      };
      return this.add(createData);
    }
  }

  remove(accessory: Accessory): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${accessory.id}`);
  }
}

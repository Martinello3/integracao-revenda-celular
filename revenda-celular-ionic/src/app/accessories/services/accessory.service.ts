import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accessory } from '../models/accessory.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  private readonly apiUrl = `${environment.baseUrl}/accessories`;

  constructor(private http: HttpClient) { }

  getById(accessoryId: string): Observable<Accessory> {
    return this.http.get<Accessory>(`${this.apiUrl}/${accessoryId}`);
  }

  getList(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.apiUrl);
  }

  private add(accessory: Accessory): Observable<Accessory> {
    return this.http.post<Accessory>(this.apiUrl, accessory);
  }

  private update(accessory: Accessory): Observable<Accessory> {
    return this.http.put<Accessory>(`${this.apiUrl}/${accessory.id}`, accessory);
  }

  save(accessory: Accessory): Observable<Accessory> {
    return accessory.id ? this.update(accessory) : this.add(accessory);
  }

  remove(accessory: Accessory): Observable<Accessory> {
    return this.http.delete<Accessory>(`${this.apiUrl}/${accessory.id}`);
  }
}

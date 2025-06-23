import { Injectable } from '@angular/core';
import { Phone } from '../models/phone.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private readonly apiUrl = `${environment.baseUrl}/phones`;

  constructor(private http: HttpClient) { }

  getById(phoneId: string): Observable<Phone> {
    return this.http.get<Phone>(`${this.apiUrl}/${phoneId}`);
  }

  getList(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl);
  }

  private add(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.apiUrl, phone);
  }

  private update(phone: Phone): Observable<Phone> {
    return this.http.put<Phone>(`${this.apiUrl}/${phone.id}`, phone);
  }

  save(phone: Phone): Observable<Phone> {
    return phone.id ? this.update(phone) : this.add(phone);
  }

  remove(phone: Phone): Observable<Phone> {
    return this.http.delete<Phone>(`${this.apiUrl}/${phone.id}`);
  }
}

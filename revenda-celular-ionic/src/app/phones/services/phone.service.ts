import { Injectable } from '@angular/core';
import { Phone, CreatePhoneDto, UpdatePhoneDto } from '../models/phone.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private readonly apiUrl = `${environment.baseUrl}/phones`;

  constructor(private http: HttpClient) { }

  getById(phoneId: number): Observable<Phone> {
    return this.http.get<Phone>(`${this.apiUrl}/${phoneId}`);
  }

  getList(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiUrl);
  }

  getByBrand(brandId: number): Observable<Phone[]> {
    return this.http.get<Phone[]>(`${this.apiUrl}/brand/${brandId}`);
  }

  private add(phone: CreatePhoneDto): Observable<Phone> {
    return this.http.post<Phone>(this.apiUrl, phone);
  }

  private update(id: number, phone: UpdatePhoneDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, phone);
  }

  save(phone: Phone): Observable<any> {
    if (phone.id) {
      const updateData: UpdatePhoneDto = {
        model: phone.model,
        image: phone.image,
        releaseDate: phone.releaseDate,
        price: typeof phone.price === 'string' ? parseFloat(phone.price) : phone.price,
        category: phone.category,
        brandId: phone.brandId,
        stock: phone.stock
      };
      return this.update(phone.id, updateData);
    } else {
      const createData: CreatePhoneDto = {
        model: phone.model,
        image: phone.image,
        releaseDate: phone.releaseDate,
        price: typeof phone.price === 'string' ? parseFloat(phone.price) : phone.price,
        category: phone.category,
        brandId: phone.brandId,
        stock: phone.stock
      };
      return this.add(createData);
    }
  }

  remove(phone: Phone): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${phone.id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../models/customer.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.baseUrl}/customers`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getList(): Observable<Customer[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getByType(customerType: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/type/${customerType}`);
  }

  private add(customer: CreateCustomerDto): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  private update(id: number, customer: UpdateCustomerDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, customer);
  }

  save(customer: Customer): Observable<any> {
    if (customer.id) {
      const updateData: UpdateCustomerDto = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        birthDate: customer.birthDate instanceof Date ? customer.birthDate : new Date(customer.birthDate),
        address: customer.address,
        customerType: customer.customerType,
        active: customer.active
      };
      return this.update(customer.id, updateData);
    } else {
      const createData: CreateCustomerDto = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        birthDate: customer.birthDate instanceof Date ? customer.birthDate : new Date(customer.birthDate),
        address: customer.address,
        customerType: customer.customerType,
        active: customer.active
      };
      return this.add(createData);
    }
  }

  remove(customer: Customer): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${customer.id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

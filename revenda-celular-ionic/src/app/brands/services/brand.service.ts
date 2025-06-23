import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand.type";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = `${environment.baseUrl}/brands`;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getById(brandId: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${brandId}`);
  }

  private add(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  private update(brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand);
  }

  save(brand: Brand): Observable<Brand> {
    return brand.id ? this.update(brand) : this.add(brand);
  }

  remove(brand: Brand): Observable<Brand> {
    return this.http.delete<Brand>(`${this.apiUrl}/${brand.id}`);
  }
}

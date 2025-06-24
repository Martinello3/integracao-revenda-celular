import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand, CreateBrandDto, UpdateBrandDto } from "../models/brand.type";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = `${environment.baseUrl}/brands`;

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getList(): Observable<Brand[]> {
    return this.getBrands();
  }

  getById(brandId: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${brandId}`);
  }

  private add(brand: CreateBrandDto): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  private update(id: number, brand: UpdateBrandDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, brand);
  }

  save(brand: Brand): Observable<any> {
    if (brand.id) {
      const updateData: UpdateBrandDto = {
        name: brand.name,
        country: brand.country
      };
      return this.update(brand.id, updateData);
    } else {
      const createData: CreateBrandDto = {
        name: brand.name,
        country: brand.country
      };
      return this.add(createData);
    }
  }

  remove(brand: Brand): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${brand.id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getProductByCategoryName(name: string){
    return this.http.post<Product[]>(`${environment.hostUrl}/category`, name, { withCredentials: true });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_model/category';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category$ = new ReplaySubject<Category[]>(1);

  constructor(private http: HttpClient) { }

  getProductByCategoryName(name: string){
    return this.http.post<Product[]>(`${environment.hostUrl}/category`, name, { withCredentials: true });
  }

  getAllCategory() {
    return this.http.get<Category[]>(`${environment.hostUrl}/home/category`, {withCredentials: true});
  }
}

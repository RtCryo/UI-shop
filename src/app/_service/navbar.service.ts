import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get<Category[]>(`${environment.hostUrl}/home/category`, {withCredentials: true});
  }
  
}

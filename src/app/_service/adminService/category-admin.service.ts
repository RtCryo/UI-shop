import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/_model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {

  constructor(private http: HttpClient) { }

  sendListToDelete(list: Category[]){
    return this.http.post<void>(`${environment.hostUrl}/admin/categoriesToDelete`, list, {withCredentials: true});
  }

  sendToDelete(product: Category){
    return this.http.post<void>(`${environment.hostUrl}/admin/categoryToDelete`, product, {withCredentials: true});
  }

  saveCategory(product: Category){
    return this.http.post<void>(`${environment.hostUrl}/admin/categoryToSave`, product, {withCredentials: true});
  }

  updateCategory(product: Category){
    return this.http.post<void>(`${environment.hostUrl}/admin/categoryToUpdate`, product, {withCredentials: true});
  }

  getAllCategory() {
    return this.http.get<Category[]>(`${environment.hostUrl}/home/category`, {withCredentials: true});
  }
}

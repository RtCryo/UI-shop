import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(`${environment.hostUrl}/admin/products`, {withCredentials: true});
  }

  sendListToDelete(list: Product[]){
    return this.http.post<void>(`${environment.hostUrl}/admin/productsToDelete`, list, {withCredentials: true});
  }

  sendToDelete(product: Product){
    return this.http.post<void>(`${environment.hostUrl}/admin/productToDelete`, product, {withCredentials: true});
  }

  saveProduct(product: Product){
    return this.http.post<void>(`${environment.hostUrl}/admin/productToSave`, product, {withCredentials: true});
  }

  updateProduct(product: Product){
    return this.http.post<void>(`${environment.hostUrl}/admin/productToUpdate`, product, {withCredentials: true});
  }

}

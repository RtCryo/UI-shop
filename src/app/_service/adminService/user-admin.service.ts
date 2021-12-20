import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService implements OnInit{

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  getAllUser(){
    return this.http.get<User[]>(`${environment.hostUrl}/admin/findAllUser`, {withCredentials: true})
  }

  deleteUser(user: User){
    return this.http.post<void>(`${environment.hostUrl}/admin/deleteUser`, user, {withCredentials: true})
  }

  updateUser(user: User){
    return this.http.post<User>(`${environment.hostUrl}/admin/updateUser`, user, {withCredentials: true})
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'src/app/_model/role';
import { Status } from 'src/app/_model/status';
import { User } from 'src/app/_model/user';
import { UserAdminService } from 'src/app/_service/adminService/user-admin.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  users!: User[];
  userForm!: FormGroup;
  loading = true;
  roles = Role;
  statuses = Status;

  constructor(private userAdminService: UserAdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAlluser()
  }

  getAlluser(){
    this.userAdminService.getAllUser().subscribe({
      next: (response) => {
        this.users = response;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  updateUser(user: User){
    this.userForm = this.formBuilder.group({
      name: [user.name],
      email: [user.email],
      role: [user.role],
      status: [user.status],
      enabled: [user.enabled]
    });
    this.userForm.get("role")!.patchValue(user.role);
    this.userForm.get("status")!.patchValue(user.status);
    this.userForm.get("enabled")!.patchValue(user.enabled);
  }

  deleteUser(user:User){
    this.userAdminService.deleteUser(user).subscribe({
      next: () => {
        this.getAlluser();
      }
    })
  }

  getRoles(): Array<string>{
    return Object.values(this.roles);
  }

  getStatus(): Array<string>{
    return Object.values(this.statuses);
  }

  submit(){

  }

}

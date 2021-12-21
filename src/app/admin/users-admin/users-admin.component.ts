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
  error = "";
  userToUpdate!: User;

  constructor(private userAdminService: UserAdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAlluser();
    this.userForm = this.formBuilder.group({
      name: [],
      email: [],
      role: [],
      status: [],
      enabled: []
    });
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
    this.error = "";
    this.userToUpdate = user;
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
    this.userToUpdate.email = this.userForm.controls['email'].value;
    this.userToUpdate.name = this.userForm.controls['name'].value;
    this.userToUpdate.role = this.userForm.controls['role'].value;
    this.userToUpdate.status = this.userForm.controls['status'].value;
    this.userToUpdate.enabled = this.userForm.controls['enabled'].value;
    this.userAdminService.updateUser(this.userToUpdate).subscribe({
      next: () =>{
        this.getAlluser();
        this.closebutton.nativeElement.click();
      },
      error: (errorMsg) => {
        this.error = errorMsg;
      }
    })
  }

}

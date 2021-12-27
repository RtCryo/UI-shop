import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_model/user';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  userForm!: FormGroup;
  error = "";

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private userService: UserService) {

   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((user) => {
      this.userService.getUserProfile(user.email).subscribe((userProfile) => {
        this.user = userProfile;
        this.userForm = this.formBuilder.group({
          name: [this.user.name, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          address: [this.user.address],
          password: ['',Validators.maxLength(8)],
          confirmPassword: ['', Validators.maxLength(8)],
        }, {validator: this.checkPasswords} as AbstractControlOptions);
      });
    });
  }


  createUserForm(user: User){

  }

  submit(){
    this.user.name = this.userForm.controls['name'].value;
    this.user.address = this.userForm.controls['address'].value;
    this.user.password = this.userForm.controls['password'].value;
  }


  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

}

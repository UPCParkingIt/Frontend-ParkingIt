import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      profilePhotoUrl: [''],
      dniNumber: [''],
      roles: [[]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let email = this.form.value.email;
    let password = this.form.value.password;
    let firstName = this.form.value.firstName;
    let lastName = this.form.value.lastName;
    let phoneNumber = this.form.value.phoneNumber;
    let profilePhotoUrl = this.form.value.profilePhotoUrl;
    let dniNumber = this.form.value.dniNumber;
    let roles = this.form.value.roles;
    const signUpRequest = new SignUpRequest(email, password, firstName, lastName, phoneNumber, profilePhotoUrl, dniNumber, roles);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }
}

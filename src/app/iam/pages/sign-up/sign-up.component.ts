import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

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

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
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
      roles: [['USER_ROLE']]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = { ...this.form.value };
    value.roles = Array.isArray(value.roles) ? value.roles : [value.roles];
    const signUpRequest = new SignUpRequest(
      value.email,
      value.password,
      value.firstName,
      value.lastName,
      value.phoneNumber,
      value.profilePhotoUrl,
      value.dniNumber,
      value.roles
    );
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }

  goToDriverHome(): void {
    this.router.navigate(['/driver/home']);
  }
}

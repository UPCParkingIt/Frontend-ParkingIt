import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {SignInRequest} from '../../model/sign-in.request';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let email = this.form.value.email;
    let password = this.form.value.password;
    const signInRequest = new SignInRequest(email, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted = true;
  }
}

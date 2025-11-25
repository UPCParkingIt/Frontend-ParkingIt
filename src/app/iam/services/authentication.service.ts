import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {SignInRequest} from '../model/sign-in.request';
import {SignInResponse} from '../model/sign-in.response';
import {SignUpRequest} from '../model/sign-up.request';
import {SignUpResponse} from '../model/sign-up.response';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInRoles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private router: Router, private http: HttpClient) { }

  get isSignedIn() { return this.signedIn.asObservable();}

  get currentUserId() { return this.signedInUserId.asObservable(); }

  get currentEmail() { return this.signedInEmail.asObservable(); }

  get currentRoles() { return this.signedInRoles.asObservable(); }

  /**
   * Sign up
   * @summary
   * This method sends a POST request to the server to sign up a new user.
   * @param signUpRequest - The sign-up request object containing the username and password.
   * @returns void
   */
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log(`Signed up as ${response.email} with id ${response.id}`);
          this.router.navigate(['/sign-in']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error}`);
          console.error('Status:', error?.status);
          console.error('Response body:', error?.error);
          this.router.navigate(['/sign-up']).then();
        }
      });
  }

  /**
   * Sign in
   * @summary
   * This method sends a POST request to the server to sign in an existing user.
   * @param signInRequest - The sign-in request object containing the username and password.
   * @returns void
   */
  signIn(signInRequest: SignInRequest) {
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUserId.next(response.id);
          this.signedInEmail.next(response.email);
          this.signedInRoles.next(response.roles);
          localStorage.setItem('token', response.token);
          console.log(`Signed in as ${response.email} with token ${response.token}`);
          this.router.navigate(['/user/home']).then();
        },
        error: (error) => {
          console.error(`Error while signing in: ${error}`);
          this.signedIn.next(false);
          this.signedInUserId.next('');
          this.signedInEmail.next('');
          this.signedInRoles.next([]);
          localStorage.removeItem('token');
          this.router.navigate(['/sign-in']).then();
        }
      });
  }

  /**
   * Sign out
   * @summary
   * This method signs out the current user by clearing the token and navigating to the sign-in page.
   * @returns void
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next('');
    this.signedInEmail.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }
}

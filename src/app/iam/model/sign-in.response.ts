export class SignInResponse {
  constructor(
    public id: string,
    public email: string,
    public roles: string[],
    public token: string
  ) {}
}

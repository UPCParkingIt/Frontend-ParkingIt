export class SignUpResponse {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public profilePhotoUrl: string,
    public dniNumber: string,
    public roles: string[]
  ) {}
}

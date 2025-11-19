export class SignUpRequest {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber?: string,
    public profilePhotoUrl?: string,
    public dniNumber?: string,
    public roles?: string[]
  ) {}
}

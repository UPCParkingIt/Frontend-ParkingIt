import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new UserEntity()).toBeTruthy();
  });
});

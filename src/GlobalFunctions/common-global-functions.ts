export function generateOtp() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

import bcrypt from "bcrypt";
import { userStore, type User } from "../store/user.store";
import { SALT_ROUNDS } from "../constants/auth.constant";

export const authService = {
  async register(email: string, password: string): Promise<User> {
    if (userStore.findByEmail(email)) {
      throw new Error("Email already registered");
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return userStore.create({ email, passwordHash });
  },

  async login(email: string, password: string): Promise<User> {
    const user = userStore.findByEmail(email);
    if (!user) {
      throw new Error("No account found with this email address");
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error("Incorrect password");
    }
    return user;
  },
};

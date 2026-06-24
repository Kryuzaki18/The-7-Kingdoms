import { randomUUID } from "crypto";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export type PublicUser = Omit<User, "passwordHash">;

const users = new Map<string, User>();
const emailIndex = new Map<string, string>(); // email -> id

export const userStore = {
  findByEmail(email: string): User | undefined {
    const id = emailIndex.get(email.toLowerCase());
    return id ? users.get(id) : undefined;
  },

  findById(id: string): User | undefined {
    return users.get(id);
  },

  create(data: { email: string; passwordHash: string }): User {
    const user: User = {
      id: randomUUID(),
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.set(user.id, user);
    emailIndex.set(user.email, user.id);
    return user;
  },

  toPublic(user: User): PublicUser {
    const { passwordHash: _ph, ...publicUser } = user;
    return publicUser;
  },
};

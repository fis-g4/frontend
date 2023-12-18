import { AuthUser } from "../hooks/useAuth";

export const account: AuthUser = {
  id: 'fakeId',
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@gmail.com',
  photoURL: '/assets/images/avatars/avatar_12.jpg',
  plan: 'Free',
  coins: 100,
};

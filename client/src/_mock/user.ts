import { sample } from 'lodash';

export const users = [...Array(24)].map((_, index) => ({
  id: index+1,
  photoUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  firstName: `Nombre de usuario ${index + 1}`,
  lastName: `Apellido de usuario ${index + 1}`,
  username: `username${index + 1}`,
  email: `username${index + 1}@mail.com`,
  plan: sample(['Free', 'Pro', 'Premium']),
  coins: sample([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]),
}));

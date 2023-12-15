import { sample } from 'lodash';


export const users = [...Array(24)].map((_, index) => ({
  id: index+1,
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: `Nombre de usuario ${index + 1}`,
  company: `Nombre de la empresa ${index + 1}`,
  isVerified: index % 3 === 0,
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

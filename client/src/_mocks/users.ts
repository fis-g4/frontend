import { sample } from 'lodash'

interface User {
    id: string
    photoUrl: string
    firstName: string
    lastName: string
    username: string
    email: string
    plan: planEnum
    coins: number
}

type planEnum = 'Free' | 'Pro' | 'Premium'

export const users: User[] = [...Array(24)].map((_, index) => ({
    id: (index + 1).toString(),
    photoUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    firstName: `Nombre de usuarios ${index + 1}`,
    lastName: `Apellido de usuarios${index + 1}`,
    username: `username${index + 1}`,
    email: `username${index + 1}@mail.com`,
    plan: sample(['Free', 'Pro', 'Premium']),
    coins: sample([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]),
}))

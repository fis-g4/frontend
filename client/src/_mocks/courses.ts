export interface Course {
    id: string
    name: string
    description: string
    price: number
    categories: string[]
    languaje: string
    creator: string
    score: number
    access: string[]
    classes: string[]
    materials: string[]
    currency: string
    image: string
}

export const courses: Course[] = [
    {
        id: '615e2f3b1d9f9b2b4c9e9b1a',
        creator: 'ivan',
        name: 'Cloud Computing Mastery',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: '/assets/prueba.jpg',
        score: 4.8,
        price: 0,
        categories: ['Cloud Computing', 'AWS'],
        languaje: 'English',
        access: ['Amekit'],
        classes: [],
        materials: [],
        currency: 'USD',
    },
]

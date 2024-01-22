export interface Course {
    id: string
    instructor: string
    title: string
    title2: string
    description: string
    image: string
    rating: number
    length: string
    videoCount: string
    videoUrl: string
    price: number
    currency: 'USD' | 'EUR'
    purchasers: string[]
}

export const courses: Course[] = [
    {
        id: '615e2f3b1d9f9b2b4c9e9b1a',
        instructor: 'ivan',
        title: 'Cloud Computing Mastery',
        title2: 'Cloud Computing Mastery',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: '/assets/prueba.jpg',
        rating: 4.8,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        price: 0,
        currency: 'EUR',
        purchasers: [],
    },
]
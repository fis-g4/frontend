interface Review {
    user: string
    title: string
    description: string
    rating: number
    course: string
    material: string
}

export const reviews: Review[] = [
    {
        user: 'David',
        title: 'Me ha gustado el curso',
        description: 'Muy instructivo',
        rating: 5,
        course: 'null',
        material: 'null'
    }
   
]

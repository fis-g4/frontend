interface Review {
    user: string
    title: string
    description: string
    rating: number
    course: number
    material: string
}

export const reviews: Review[] = [
    {
        user: 'David',
        title: 'Me ha gustado el curso',
        description: 'Muy instructivo',
        rating: 5,
        course: 1,
        material: 'null'
    },
    {
        user: 'David',
        title: 'Me ha parecido una mierda la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 'null'
    }
   
]

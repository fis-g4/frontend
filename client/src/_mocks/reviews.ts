interface Review {
    user: string
    creator: string
    title: string
    description: string
    rating: number
    course: number
    material: string
}

export const reviews: Review[] = [
    {
        user: '',
        title: 'Me ha gustado el curso',
        description: 'Muy instructivo',
        rating: 5,
        course: 1,
        material: 'null',
        creator: 'John'
    },
    {
        user: '',
        title: 'Me ha parecido malo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 'null',
        creator:'Kevin'
    },
    {
        user: 'Kevin',
        title: 'Me ha parecido una perdida de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 'null',
        creator:'David'
    }
   
]

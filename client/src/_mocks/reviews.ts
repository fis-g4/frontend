interface Review {
    user: string
    creator: string
    title: string
    description: string
    rating: number
    course: number
    material: number
}

export const reviews: Review[] = [
    {
        user: '',
        title: 'Me ha gustado el curso',
        description: 'Muy instructivo',
        rating: 5,
        course: 1,
        material: 0,
        creator: 'John',
    },
    {
        user: '',
        title: 'Me ha parecido malo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 0,
        creator:'Kevin'
    },
    {
        user: 'Kevin',
        title: 'Me ha parecido una perdida de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 0,
        creator:''
    },
    {
        user: 'Kevin',
        title: 'Me ha parecido una perdida de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 0,
        creator:''
    },
    {
        user: '',
        title: 'Me ha parecido una perdida de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 0,
        material: 0,
        creator:''
    },
    {
        user: '',
        title: 'Me ha parecido una real de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 0,
        material: 0,
        creator:''
    },
    {
        user: '',
        title: 'Me ha parecido una perdida de tiempo la verdad',
        description: 'Descripcion de prueba',
        rating: 5,
        course: 1,
        material: 0,
        creator:'David'
    }
   
]

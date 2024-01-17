export interface Material {
    id: string
    title: string
    description: string
    price: number
    currency: 'USD' | 'EUR'
    author: string
    purchasers: string[]
    courses: string[]
    file: string
    type: 'book' | 'article' | 'presentation' | 'exercises'
}

export const materials: Material[] = [
    {
        id: '1',
        title: 'Introducción a Tidyverse',
        description: 'Breve introducción a la librería Tidyverse de R',
        price: 19.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: ['username1', 'username2'],
        courses: ['1'],
        file: 'https://cran.r-project.org/web/packages/tidyverse/tidyverse.pdf',
        type: 'presentation',
    },
    {
        id: '2',
        title: 'Tarea clustering',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: [],
        courses: ['1'],
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
    {
        id: '3',
        title: 'Tarea clustering 2',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: [],
        courses: ['1'],
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
    {
        id: '4',
        title: 'Tarea clustering 3',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: [],
        courses: [],
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
    {
        id: '5',
        title: 'Tarea clustering 4',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: [],
        courses: ['1'],
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
    {
        id: '6',
        title: 'Tarea clustering 5',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        author: 'johndoe',
        purchasers: [],
        courses: ['1'],
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
]

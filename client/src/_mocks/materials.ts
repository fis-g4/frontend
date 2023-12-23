export interface Material {
    id: string
    title: string
    description: string
    price: number
    currency: 'USD' | 'EUR'
    author: string
    purchasers: string[]
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
        purchasers: [],
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
        file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
        type: 'presentation',
    },
]

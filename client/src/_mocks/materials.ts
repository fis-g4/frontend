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

// export const materials: Material[] = [
//     {
//         id: '615e2f3b1d9f9b2b4c9e9b20',
//         title: 'Introducción a Tidyverse',
//         description: 'Breve introducción a la librería Tidyverse de R',
//         price: 19.99,
//         currency: 'EUR',
//         author: 'Amekit',
//         purchasers: ['Amekit2'],
//         courses: ['1'],
//         file: 'https://cran.r-project.org/web/packages/tidyverse/tidyverse.pdf',
//         type: 'presentation',
//     },
//     {
//         id: '615e2f3b1d9f9b2b4c9e9b21',
//         title: 'Tarea clustering',
//         description: 'Tarea de clustering de la asignatura de FID',
//         price: 39.99,
//         currency: 'EUR',
//         author: 'johndoe',
//         purchasers: [],
//         courses: ['1'],
//         file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
//         type: 'presentation',
//     },
//     {
//         id: '615e2f3b1d9f9b2b4c9e9b22',
//         title: 'Tarea clustering 2',
//         description: 'Tarea de clustering de la asignatura de FID',
//         price: 39.99,
//         currency: 'EUR',
//         author: 'johndoe',
//         purchasers: [],
//         courses: ['1'],
//         file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
//         type: 'presentation',
//     },
//     {
//         id: '615e2f3b1d9f9b2b4c9e9b23',
//         title: 'Tarea clustering 3',
//         description: 'Tarea de clustering de la asignatura de FID',
//         price: 39.99,
//         currency: 'EUR',
//         author: 'johndoe',
//         purchasers: [],
//         courses: [],
//         file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
//         type: 'presentation',
//     },
//     {
//         id: '615e2f3b1d9f9b2b4c9e9b24',
//         title: 'Tarea clustering 4',
//         description: 'Tarea de clustering de la asignatura de FID',
//         price: 39.99,
//         currency: 'EUR',
//         author: 'johndoe',
//         purchasers: [],
//         courses: ['1'],
//         file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
//         type: 'presentation',
//     },
//     {
//         id: '6',
//         title: 'Tarea clustering 5',
//         description: 'Tarea de clustering de la asignatura de FID',
//         price: 39.99,
//         currency: 'EUR',
//         author: 'johndoe',
//         purchasers: [],
//         courses: ['1'],
//         file: 'https://elvex.ugr.es/decsai/intelligent/slides/dm/d3%20clustering.pdf',
//         type: 'presentation',
//     },
// ]

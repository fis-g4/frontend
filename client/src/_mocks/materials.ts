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
    {
        id: '7',
        title: 'Preguntas',
        description: 'Tarea de clustering de la asignatura de FID',
        price: 39.99,
        currency: 'EUR',
        courses: ['1'],
        purchasers: [],
        author: 'johndoe',
        file: 'https://ff5ac47ae0abf6bf3dc656d68b8b8e7c679bdcc43fe171e6368d466-apidata.googleusercontent.com/download/storage/v1/b/materials-bucket/o/preguntas.pdf?jk=AanfhSCJt74XHgmVvQeO0v_fp87C7TnlziOPhT2q8SJZRGYpaFpxZQB58bi-lw1pTRqVkpo6egyERHDxUlCWRxd9MqyE4ZHF4-lA9_PTo8ej0O1z70RKiS5NPAP2cPUCee1Z0p1hMAbYiuy7D87QwNqQAJu7cX1gZLc6FhgPwqdk9TyOtsZkGtyzW5fh-JSgMkzrOjlml2hcu8bAbwMKRbA0VgruTQmCJ5dQiIl4eElUJywNxSepb3MWaQG9lUBE5ugjdPHFibmWLbeeSrl1sftzEz62mLqTv7Yr-mfBQ4IcL1rUSou8xTMrHwq335iqaE2IzXFT_97JvIR8fpfg1T92Jwl82s9yCmDh4al41kF3WlFt9UBcq-in7TDTDF3BAArzyTjFAr_gsDHjeOQrdcKQNVJxKuPTKb1xRqeZmRRHFvW-H53E_kadGdPTBZnfnfXTBM1TDJj3fAsX1mjLRXv2t599EvvuiYC-b9oawTGKR4kI8be9YzVfp5TR8L5hQdglX_ABi7pfLsrXgNJaImRwmfPWJhXGeKnG4hilB5gn3qay-ihFeCL4U-OAs9De785OVQnttGIlqb-ietn9-TSugPd2zsqe2ublkQlS8YuVgK10tFilmtyaEtvaOyjO_SzTr-us6QPyXhwCnBvWSHcNpYRiMKJDtsgZFzlupcQbws1EjCflv5GCp_nkfjb6f9FgnqDym90tEWcCObRdJ8zVdmV69nhHR0gZ09waFTo8HpB9XpuzowoZ4rgWdHabJQhiy_BRV-j40f0Lk7_TWOJQx-tXi5TKudP1MzAast_Kgumdkw3jfmVbR9tqRN28VtE-vtLLYyeFP99SvQ7SkJBW2GeIMVF1I9YP_FrbIaINcF_hWFraUhwMfc4hsqZONDDnUfXUfPh6vSBt5991Mw0usyMRPKY6sRwsQvZg_nD-e7in6HDzhzc522YwBcEJOXujbkWwj1aRhc_oVaYDin9g9kuggIpD0aNJzZ4auFvSlzqGwKsds9ihTLXyVNEQXaa4ojOE_WYEC68J9RZ0Vicf7U9elXbSeYXZXYOcLY5Kb8kzqqWCfKRgvsHL2kAHzzuEzg2pqTXAAiWioXqHpDDP7WR86IRB80Ilo1wEif4pgSl24015NgDeR6V2Ul8tqQ6xWB7cyYnALwOQqCykBwKZeA&isca=1',
        type: 'exercises',
    },
]

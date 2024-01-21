export interface Class {
    id: string
    title: string
    description: string
    order: number
    file: string
    course: string
    creator: string
}

export const classes: Class[] = [
    {
        id: '1',
        title: 'Introducción a Tidyverse',
        description: 'Breve introducción a la librería Tidyverse de R',
        order: 1,
        creator: 'test_user',
        file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        course: '1',
    },
    {
        id: '2',
        title: 'Tarea clustering',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 2,
        creator: 'test_user2',
        file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        course: '1',
    },
    {
        id: '3',
        title: 'Tarea clustering 2',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 3,
        creator: 'test_user3',
        file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        course: '1',
    },
    {
        id: '4',
        title: 'Tarea clustering 3',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 4,
        creator: 'test_user',
        file: '',
        course: '1',
    },
    {
        id: '5',
        title: 'Tarea clustering 4',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 5,
        file: '',
        creator: 'test_user',
        course: '1',
    },
    {
        id: '6',
        title: 'Tarea clustering 5',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 6,
        creator: 'test_user',
        file: '',
        course: '1',
    },
    {
        id: '7',
        title: 'Tarea clustering 6',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 7,
        creator: 'test_user',
        file: '',
        course: '1',
    },
    {
        id: '8',
        title: 'Tarea clustering 7',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 8,
        creator: 'test_user2',
        file: '',
        course: '1',
    },
    {
        id: '9',
        title: 'Tarea clustering 8',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 9,
        creator: 'test_user3',
        file: '',
        course: '1',
    },
    {
        id: '10',
        title: 'Tarea clustering 9',
        description: 'Tarea de clustering de la asignatura de FID',
        order: 1,
        creator: 'test_user',
        file: '',
        course: '2',
    },
]

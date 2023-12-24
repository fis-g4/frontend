interface Course {
    instructor: string
    title: string
    title2: string
    description: string
    image: string
    rating: number
    length: string
    videoCount: string
    videoUrl: string
}

export const courses: Course[] = [
    {
        instructor: 'Pro. Andrew Ng',
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
    },
    {
        instructor: 'Pro. Jeff Dean',
        title: 'Matering Data Analysis',
        title2: 'Matering Data Analysis',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: 'https://www.isixsigma.com/wp-content/uploads/2018/11/shutterstock_1503919103-scaled.jpg',
        rating: 5.0,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl: 'https://www.youtube.com/embed/7J4i0xjz7jY',
    },
    {
        instructor: 'D. Aaron Courville',
        title: 'Public Speaking for Students',
        title2: 'Public Speaking for Students',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_j0jMB4y1yc9ZDl_RtvXhw.jpeg',
        rating: 4.8,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl: 'https://www.youtube.com/embed/7J4i0xjz7jY',
    },
    {
        instructor: 'Pro. Melanie Mitchell',
        title: 'Programming with Python',
        title2: 'Programming with Python',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: 'https://miro.medium.com/v2/resize:fit:1380/format:webp/1*jsgLaIkhgF7SzQS1FWIPug.jpeg',
        rating: 4.9,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl: 'https://www.youtube.com/embed/7J4i0xjz7jY',
    },
    {
        instructor: 'D. Daphne Koller',
        title: 'Mastering In Cibersecurity',
        title2: 'Mastering In Cibersecurity',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: 'https://digitalhealth.org.au/wp-content/uploads/2022/03/technology-security-concept-safety-digital-protection-system-980x653.jpg',
        rating: 4.8,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl: 'https://www.youtube.com/embed/7J4i0xjz7jY',
    },
    {
        instructor: 'Dr. Michael Patel',
        title: 'Cloud Computing Mastery',
        title2: 'Cloud Computing Mastery',
        description:
            'Cloud computing is a transformative paradigm in the world of information.',
        image: 'https://www.inesdi.com/sites/default/files/2022-05/4%20tipos%20de%20cloud%20computing.jpg',
        rating: 4.5,
        length: '15hr 30m',
        videoCount: '60+ Video',
        videoUrl: 'https://www.youtube.com/embed/7J4i0xjz7jY',
    },
]

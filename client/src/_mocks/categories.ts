import MobileIcon from '@mui/icons-material/Smartphone' // Ejemplo de íconos, reemplaza con los adecuados
import DataIcon from '@mui/icons-material/BarChart'
import AiIcon from '@mui/icons-material/Adb'
import SoftwareIcon from '@mui/icons-material/Code'
import NetworkIcon from '@mui/icons-material/DeviceHub'
import SecurityIcon from '@mui/icons-material/Security'

interface Category {
    title: string
    coursesCount: number
    Icon: typeof MobileIcon // Utiliza el tipo de tus íconos aquí
}

export const categories: Category[] = [
    {
        title: 'Mobile App Development',
        coursesCount: 242,
        Icon: MobileIcon,
    },
    {
        title: 'Data Science & Analytics',
        coursesCount: 242,
        Icon: DataIcon,
    },
    {
        title: 'AI & Machine Learning',
        coursesCount: 242,
        Icon: AiIcon,
    },
    {
        title: 'Software Engineering',
        coursesCount: 242,
        Icon: SoftwareIcon,
    },
    {
        title: 'Network Administration',
        coursesCount: 242,
        Icon: NetworkIcon,
    },
    {
        title: 'Cybersecurity Essentials',
        coursesCount: 242,
        Icon: SecurityIcon,
    },
]
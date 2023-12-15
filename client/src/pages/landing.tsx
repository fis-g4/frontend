import { Helmet } from 'react-helmet-async'
import LandingHeader from '../components/landing-header/landing-header'
import LandingHero from '../components/landing-hero/landing-hero'
import LandingTopCategories from '../components/landing-top-categories.tsx/landing-top-categories'
import LandingPopularCourses from '../components/landing-popular-courses/landing-popular-courses'
import Footer from '../components/footer/footer'

const LandingPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title> Welcome to FIS G4! </title>
            </Helmet>
            <LandingHeader />
            <LandingHero />
            <LandingTopCategories />
            <LandingPopularCourses />
            <Footer/>
        </>
    )
}

export default LandingPage

import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LandingHeader from '../components/landing-header/landing-header'
import LandingHero from '../components/landing-hero/landing-hero'
import LandingTopCategories from '../components/landing-top-categories.tsx/landing-top-categories'
import LandingPopularCourses from '../components/landing-popular-courses/landing-popular-courses'
import Footer from '../components/footer/footer'
import TransitionModal from '../components/transition-modal/transition-modal'
import LoginView from '../components/login/login'
import SignupView from '../components/signup/signup'
import ResetPasswordView from '../components/reset-password/reset-password'
import LandingHeroMobile from '../components/landing-hero-mobile/landing-hero-mobile'
import { useResponsive } from '../hooks/useResponsive'
import IndexApiOpen from '../components/index-api/indexapi'

export default function LandingPage() {
    const isUpLg = useResponsive('up', 'lg');

    const [loginOpen, setLoginOpen] = useState(false);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);
    const [indexApiOpen, setIndexApiOpen] = useState(false);
    const handleIndexApiOpen = () => setIndexApiOpen(true);
    const handleIndexApiClose = () => setIndexApiOpen(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const handleRegisterOpen = () => setRegisterOpen(true);
    const handleRegisterClose = () => setRegisterOpen(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
    const handleResetPasswordOpen = () => setResetPasswordOpen(true);
    const handleResetPasswordClose = () => setResetPasswordOpen(false);


    return (
        <>
            <Helmet>
                <title> Welcome to FIS G4! </title>
            </Helmet>
            <LandingHeader handleLoginOpen={handleLoginOpen} handleRegisterOpen={handleRegisterOpen} handleIndexApiOpen={handleIndexApiOpen} />
            {
                isUpLg ?
                <LandingHero handleRegisterOpen={handleRegisterOpen} />
                :
                <LandingHeroMobile handleRegisterOpen={handleRegisterOpen} />
            }
            <LandingTopCategories />
            <LandingPopularCourses handleRegisterOpen={handleRegisterOpen} />
            <Footer/>
            <TransitionModal open={indexApiOpen} handleClose={handleIndexApiClose} sx={{ maxWidth: 500, width: '100%' }}>
                <IndexApiOpen handleIndexApiClose={handleIndexApiClose} />
            </TransitionModal>
            <TransitionModal open={loginOpen} handleClose={handleLoginClose} sx={{ maxWidth: 500, width: '100%' }}>
                <LoginView handleLoginClose={handleLoginClose} handleRegisterOpen={handleRegisterOpen} handleResetPasswordOpen={handleResetPasswordOpen} />
            </TransitionModal>
            <TransitionModal open={registerOpen} handleClose={handleRegisterClose} sx={{ maxWidth: 500, width: '100%' }}>
                <SignupView handleRegisterClose={handleRegisterClose} handleLoginOpen={handleLoginOpen} />
            </TransitionModal>
            <TransitionModal open={resetPasswordOpen} handleClose={handleResetPasswordClose} sx={{ maxWidth: 500, width: '100%' }}>
                <ResetPasswordView handleResetPasswordClose={handleResetPasswordClose} handleLoginOpen={handleLoginOpen} />
            </TransitionModal>
        </>
    )
}

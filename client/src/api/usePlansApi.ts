import { useAuth } from '../hooks/useAuth'

export const PLANS_BASE_PATH = '/v1/payments/plans'

export const usePlansApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    const getPlans = async () => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${PLANS_BASE_PATH}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getPlan = async (planId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${PLANS_BASE_PATH}/${planId}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    return { getPlans, getPlan }
}

import { useAuth } from '../hooks/useAuth'

export const PAYMENT_BASE_PATH = '/v1/payments'

export const usePaymentApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    const getPlans = async () => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${PAYMENT_BASE_PATH}/plans`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        const data = await response.json()
        return data as GetPlansResponse
    }

    const createPaymentPlan = async (planId: string) => {
        console.log('Creating payment plan')
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${PAYMENT_BASE_PATH}/plans/${planId}/users/${authUser?.user?.username}`,
            {
                method: 'POST',
                headers: basicHeaders,
            }
        )
        const data = await response.json()
        return data as CreatePaymentPlanResponse
    }

    const getPaymentHistory = async () => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${PAYMENT_BASE_PATH}/history/users/${authUser?.user?.username}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )

        const data = await response.json()
        return data as PaymentHistory
    }

    return { getPlans, createPaymentPlan, getPaymentHistory }
}

export interface GetPlansResponse {
    plans: Plan[]
}

interface Plan {
    _id: string
    name: string
    description: string
    price: number
    currency: string
    features: string[]
}

export interface CreatePaymentPlanResponse {
    planId: string
    user: {
        data: {
            _id: string
            firstName: string
            lastName: string
            username: string
            email: string
            profilePicture: string
            coinsAmount: number
            plan: string
            role: string
            __v: number
        }
    }
    url: string
}

export interface PaymentHistory {
    payments: {
        _id: string
        userId: string
        referenceType: string
        referenceId: string
        amount: number
        currency: string
        status: string
    }[]
}

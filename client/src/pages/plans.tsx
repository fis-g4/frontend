import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
    GetPlansResponse,
    PaymentHistory,
    usePaymentApi,
} from '../api/usePaymentApi'
import { useAuth } from '../hooks/useAuth'

export default function PlansPage() {
    const { authUser } = useAuth()
    const { getPlans, createPaymentPlan, getPaymentHistory } = usePaymentApi()
    const [newPlans, setPlans] = useState([] as GetPlansResponse['plans'])
    const [paymentHistory, setPaymentHistory] = useState(
        [] as PaymentHistory['payments']
    )

    const plans = [
        {
            _id: '1',
            name: 'Basic Plan',
            description: 'Basic plan for free',
            features: [
                'Unlimited access to free courses',
                '1 GB of storage',
                'Send messages to users',
                'Receive coins upon completing a course (10%)',
                'Receive coins upon subscribing to a new plan (10%)',
            ],
            price: 0, // Basic plan price
            currency: 'EUR',
        },
        {
            _id: '2',
            name: 'Advanced Plan',
            description:
                'Includes all options from the basic plan and all options from the advanced plan',
            features: [
                'Unlimited access to free courses',
                '1 GB of storage',
                'Send messages to users',
                'Receive coins upon completing a course (15%)',
                'Receive coins upon subscribing to a new plan (15%)',
                '20 GB of storage',
                'Use coins to pay for courses',
                'Include self-created course in "Silver-level Courses"',
            ],
            price: 9.99,
            currency: 'EUR',
        },
        {
            _id: '3',
            name: 'Pro Plan',
            description: 'Includes all options from the advanced plan.',
            features: [
                'Unlimited access to free courses',
                '1 GB of storage',
                'Send messages to users',
                'Receive coins upon completing a course (20%)',
                'Receive coins upon subscribing to a new plan (20%)',
                '20 GB of storage',
                'Use coins to pay for courses',
                'Include self-created course in "Silver-level Courses"',
                '50 GB of storage',
                'Include self-created course in "Gold-level Courses"',
                'SLA guarantee',
            ],
            price: 19.99,
            currency: 'EUR',
        },
    ]

    useEffect(() => {
        getPlans().then((response) => {
            if (response) {
                setPlans(response?.plans)
            }
        })

        getPaymentHistory().then((response) => {
            if (response) setPaymentHistory(response.payments)
        })
    }, [])

    const buildPlan = (price: number, currency: string) => {
        if (price === 0) {
            return 'Free'
        } else {
            return `${price} ${currency}`
        }
    }

    const isSubscribed = (plan: any) => {
        if (plan?.name === 'Basic Plan' && authUser.user?.plan === 'BASIC') {
            return true
        }
        if (
            plan?.name === 'Advanced Plan' &&
            authUser.user?.plan === 'ADVANCED'
        ) {
            return true
        }
        if (plan?.name === 'Pro Plan' && authUser.user?.plan === 'PRO') {
            return true
        }
        return false
    }

    return (
        <>
            <Helmet>
                <title> Plans | FIS G4 </title>
            </Helmet>

            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {newPlans?.map((plan) => (
                        <Grid item xs={12} sm={6} md={4} key={plan._id}>
                            <Card sx={{ height: '100%' }}>
                                <CardHeader
                                    title={plan.name}
                                    subheader={plan.description}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            {buildPlan(
                                                plan.price,
                                                plan.currency
                                            )}
                                        </Typography>
                                    </Box>

                                    <ul>
                                        {plan.features.map((feature) => (
                                            <li key={feature}>{feature}</li>
                                        ))}
                                    </ul>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubscribed(plan)}
                                            onClick={() =>
                                                createPaymentPlan(
                                                    plan._id
                                                ).then((response) => {
                                                    if (response.url)
                                                        window.location.href =
                                                            response.url
                                                })
                                            }
                                        >
                                            {isSubscribed(plan)
                                                ? 'Subscribed'
                                                : 'Subscribe'}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ marginY: '50px' }}>
                    Payment History
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentHistory?.map((payment) => (
                                <TableRow
                                    key={payment._id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {payment.referenceType}
                                    </TableCell>
                                    <TableCell>
                                        {payment.amount} {payment.currency}
                                    </TableCell>
                                    <TableCell>{payment.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

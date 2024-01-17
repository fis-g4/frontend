export const formatCurrency = (currency: string) => {
    if (currency === 'USD') {
        return '$'
    } else if (currency === 'EUR') {
        return '€'
    }
    return currency
}

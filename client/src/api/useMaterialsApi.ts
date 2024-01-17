import { useAuth } from '../hooks/useAuth'

export const MATERIALS_BASE_PATH = '/v1/materials'

export const useMaterialsApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    // ------------------------ GET ROUTES ------------------------

    const getMaterialsMe = async () => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/me`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getMaterialsId = async (id: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getMaterialPurchasers = async (id: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${id}/users`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    // ------------------------ POST ROUTES ------------------------

    const uploadMaterial = async (
        title: string,
        description: string,
        price: number,
        currency: string,
        author: string,
        purchasers: string[],
        file: string,
        type: string
    ) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/`,
            {
                method: 'POST',
                headers: basicHeaders,
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: price,
                    currency: currency,
                    author: author,
                    purchasers: purchasers,
                    file: file,
                    type: type,
                }),
            }
        )
        return response
    }

    const associateMaterial = async (materialId: string, courseId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${materialId}/course/${courseId}/associate`,
            {
                method: 'POST',
                headers: basicHeaders,
            }
        )
        return response
    }

    const disassociateMaterial = async (
        materialId: string,
        courseId: string
    ) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${materialId}/course/${courseId}/disassociate`,
            {
                method: 'POST',
                headers: basicHeaders,
            }
        )
        return response
    }

    // ------------------------ PUT ROUTES ------------------------

    const updateMaterial = async (material: any, materialId: string) => {
        let formData = new FormData()
        if (material.file) {
            formData.append('file', material.file)
            delete material.file
        }
        for (let key in material) {
            formData.append(key, material[key])
        }

        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${materialId}`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${authUser.token}` },
                body: formData,
            }
        )
        return response
    }

    // ------------------------ DELETE ROUTES ------------------------

    const deleteMaterial = async (materialId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${MATERIALS_BASE_PATH}/${materialId}`,
            {
                method: 'DELETE',
                headers: basicHeaders,
            }
        )
        return response
    }

    return {
        getMaterialsMe,
        getMaterialsId,
        getMaterialPurchasers,
        uploadMaterial,
        associateMaterial,
        disassociateMaterial,
        updateMaterial,
        deleteMaterial,
    }
}

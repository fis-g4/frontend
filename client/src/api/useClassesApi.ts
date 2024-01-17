import { useAuth } from '../hooks/useAuth'

export const CLASSES_BASE_PATH = '/v1/classes'

export const useClassesApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    // ------------------------ GET ROUTES ------------------------

    const getClass = async (id: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/${id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    // ------------------------ POST ROUTES ------------------------

    const uploadClass = async (
        title: string,
        description: string,
        order: string,
        file: string,
        courseId: string
    ) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/course/${courseId}`,
            {
                method: 'POST',
                headers: basicHeaders,
                body: JSON.stringify({
                    title: title,
                    description: description,
                    order: order,
                    file: file,
                }),
            }
        )
        return response
    }

    // ------------------------ PUT ROUTES ------------------------

    const updateClass = async (classData: any, classId: string) => {
        let formData = new FormData()
        if (classData.file) {
            formData.append('file', classData.file)
            delete classData.file
        }
        for (let key in classData) {
            formData.append(key, classData[key])
        }

        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/${classId}`,
            {
                method: 'PUT',
                headers: basicHeaders,
            }
        )
        return response
    }

    // ------------------------ DELETE ROUTES ------------------------

    const deleteClass = async (classId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/${classId}`,
            {
                method: 'DELETE',
                headers: basicHeaders,
            }
        )
        return response
    }

    return {
        getClass,
        uploadClass,
        updateClass,
        deleteClass,
    }
}

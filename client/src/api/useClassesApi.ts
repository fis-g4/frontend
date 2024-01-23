import { useAuth } from '../hooks/useAuth'

export const CLASSES_BASE_PATH = '/v1/classes'

export const useClassesApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    // ------------------------ GET ROUTES ------------------------

    const getCourseClasses = async (id: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/course/${id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

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
        creator: string,
        courseId: string,
        file: string
    ) => {
        const postHeaders = {
            Authorization: `Bearer ${authUser.token}`,
        }
        const formData = new FormData()
        formData.append('title', title)
        formData.append('order', order)
        formData.append('description', description)
        formData.append('creator', creator)
        formData.append('courseId', courseId)
        formData.append('file', file)
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${CLASSES_BASE_PATH}/course/${courseId}`,
            {
                method: 'POST',
                headers: postHeaders,
                body: formData,
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
        getCourseClasses,
        getClass,
        uploadClass,
        updateClass,
        deleteClass,
    }
}

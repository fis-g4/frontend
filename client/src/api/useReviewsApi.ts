import { useAuth } from '../hooks/useAuth'

export const REVIEWS_BASE_PATH = '/v1/reviews'
const BASE_LOCAL = 'http://localhost:8000'
enum TypeReview{
    USER = 'USER',
    COURSE = 'COURSE',
    MATERIAL = 'MATERIAL'
}
export interface Review {
    _id: string
    type: TypeReview
    user: string
    creator: string
    title: string
    description: string
    rating: number
    course: string
    material: string
}
export const useReviewsApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth()

    const basicHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authUser.token}`,
    }

    // ------------------------ GET ROUTES ------------------------

    const getAllReviews = async () => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getReviewById = async (id:string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/${id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getReviewByCourses= async (course_id: string) => {
        console.log(basicHeaders)
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/course/${course_id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    } 

    const getReviewByCreator= async (username: string) => {
        console.log(basicHeaders)
        const response = await fetchWithInterceptor(
            `${BASE_LOCAL}${REVIEWS_BASE_PATH}/creator/${username}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getReviewByUser= async (username: string) => {
        console.log(basicHeaders)
        const response = await fetchWithInterceptor(
            `${BASE_LOCAL}${REVIEWS_BASE_PATH}/user/${username}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    const getReviewByMaterial= async (material_id: string) => {
        console.log(basicHeaders)
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/material/${material_id}`,
            {
                method: 'GET',
                headers: basicHeaders,
            }
        )
        return response
    }

    // ------------------------ POST ROUTES ------------------------
    const addReview = async ( type: string,
        user: string,
        creator: string,
        title: string,
        description: string,
        rating: string,
        course: string,
        material: string) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/new`, 
            { 
                method: "POST",
                headers: basicHeaders,
                body: JSON.stringify({ user: user,
                    creator: creator,
                    title: title,
                    description: description,
                    rating: rating,
                    course: course,
                    material: material })
            }
        );
        return response;
    }
    /*
    const postReview = async (
        type: string,
        user: string,
        creator: string,
        title: string,
        description: string,
        rating: string,
        course: string,
        material: string
    ) => {
        const postHeaders = {
            Authorization: `Bearer ${authUser.token}`,
        }
        console.log("Se forma el cuerpo");
        const body = JSON.stringify({
            type: type,
            user,
            title,
            description,
            rating,
            course,
            material,
            creator,
          });
          console.log("El cuerpo es:"+body);
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/new`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${authUser.token}` },
                body: body,
            }
        )
        
        return response
    }*/

    const associateMaterial = async (materialId: string, courseId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/${materialId}/course/${courseId}/associate`,
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
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/${materialId}/course/${courseId}/disassociate`,
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
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/${materialId}`,
            {
                method: 'PUT',
                headers: { Authorization: `Bearer ${authUser.token}` },
                body: formData,
            }
        )
        return response
    }

    // ------------------------ DELETE ROUTES ------------------------

    const deleteMaterial = async (materialId: string) => {
        const response = await fetchWithInterceptor(
            `${process.env.REACT_APP_API_URL}${REVIEWS_BASE_PATH}/${materialId}`,
            {
                method: 'DELETE',
                headers: basicHeaders,
            }
        )
        return response
    }

    return {
        getAllReviews,
        getReviewByCourses,
        getReviewByCreator,
        getReviewById,
        getReviewByUser,
        getReviewByMaterial,
        addReview,
        associateMaterial,
        disassociateMaterial,
        updateMaterial,
        deleteMaterial,
    }
}
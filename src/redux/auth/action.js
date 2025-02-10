import api from '../../config/api'
import * as actionType from "./actionType"
import { fetchProjects } from "../project/action"

export const register = userData => async (dispatch) => {
    dispatch({ type: actionType.REGISTER_REQUEST })
    try {
        const { data } = await api.post('/auth/signup', userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: actionType.REGISTER_SUCCESS, payload: data })
        }

        console.log("register success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: actionType.REGISTER_FAILURE, payload:error.message})
    }
}

export const login = userData => async (dispatch) => {
    dispatch({ type: actionType.LOGIN_REQUEST })
    try {
        const { data } = await api.post('/auth/signin', userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: actionType.LOGIN_SUCCESS, payload: data })
            dispatch(fetchProjects({}))
        }

        console.log("login success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: actionType.LOGIN_FAILURE, payload: error.message})
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_REQUEST })
    try {
        const { data } = await api.get('/api/users/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: actionType.GET_USER_SUCCESS, payload: data })
        console.log("user success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: actionType.GET_USER_FAILURE, payload: error.message})
    }
}

export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: actionType.GET_USER_SUCCESS, payload: data })
        console.log("user success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: actionType.GET_USER_FAILURE, payload: error.message})
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type:actionType.LOGOUT})
    localStorage.clear()
}
import axios from "axios"
import { API_BASE_URL } from "../../config/api"
import * as actionType from "./actionType"

export const register = userData => async (dispatch) => {
    dispatch({ type: actionType.REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
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
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            dispatch({ type: actionType.LOGIN_SUCCESS, payload: data })
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
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
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
import api, { setAuthToken } from '../../config/api'
import * as actionType from "./actionType"

export const register = (userData) => async (dispatch) => {
    dispatch({ type: actionType.REGISTER_REQUEST });
    try {
      const { data } = await api.post('/auth/signup', userData);
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        dispatch({ type: actionType.REGISTER_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: actionType.REGISTER_FAILURE,
        payload: error.response?.data?.message || "Registration failed. Please try again.",
      });
      throw error; // Rethrow the error to be caught in the component
    }
  };

export const login = userData => async (dispatch) => {
    dispatch({ type: actionType.LOGIN_REQUEST })
    try {
        const { data } = await api.post('/auth/signin', userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
            setAuthToken(data.jwt); // Update the Axios headers with the new token
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
        const { data } = await api.get('/api/users/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        
        // Safeguard: check if data is an array before filtering (if you're filtering the data)
        if (Array.isArray(data)) {
            dispatch({ type: actionType.GET_USER_SUCCESS, payload: data })
        } else {
            // Handle non-array data (e.g., an object or unexpected format)
            console.error("Expected an array, but received:", data)
            dispatch({ type: actionType.GET_USER_FAILURE, payload: "Unexpected response format" })
        }

        console.log("get user success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({ type: actionType.GET_USER_FAILURE, payload: error.message })
    }
}


export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: actionType.GET_USER_ID_SUCCESS, payload: data })
        console.log("get user by id success: ", data)
    } catch (error) {
        console.log(error)
        dispatch({type: actionType.GET_USER_ID_FAILURE, payload: error.message})
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type:actionType.LOGOUT})
    localStorage.clear()
}
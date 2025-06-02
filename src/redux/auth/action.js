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

export const login = (userData) => async (dispatch) => {
    dispatch({ type: actionType.LOGIN_REQUEST });
    try {
        const { data } = await api.post("/auth/signin", userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            setAuthToken(data.jwt); // Update the Axios headers with the new token
            dispatch({ type: actionType.LOGIN_SUCCESS, payload: data });
        }
        console.log("Login success: ", data);
    } catch (error) {
        console.log("Login error: ", error);
        dispatch({ type: actionType.LOGIN_FAILURE, payload: error.message });
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_REQUEST });

    try {
        const response = await api.get('/api/users/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        const data = response.data; // Access the data from the response object

        if (data && typeof data === "object") {
            dispatch({ type: actionType.GET_USER_SUCCESS, payload: data });
            console.log("get user success: ", data);
        } else {
            console.error("Unexpected response format:", data);
            dispatch({ type: actionType.GET_USER_FAILURE, payload: "Unexpected response format" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        dispatch({ type: actionType.GET_USER_FAILURE, payload: error.message });
    }
};

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
        dispatch({ type: actionType.GET_USER_ID_FAILURE, payload: error.message })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: actionType.LOGOUT })
    localStorage.removeItem("jwt")
    setAuthToken(null) // Clear the Axios headers
}
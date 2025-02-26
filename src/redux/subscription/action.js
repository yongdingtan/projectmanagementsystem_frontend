import api from "../../config/api"
import * as actionType from "./actionType"

export const getUserSubscription = (jwt) => {
    return async (dispatch) => {
        dispatch({type: actionType.GET_USER_SUBSCRIPTION_REQUEST})
        try {
            const response = await api.get("/api/subscription/user", {headers: {"Authorization":`Bearer ${jwt}`}})
            dispatch({type: actionType.GET_USER_SUBSCRIPTION_SUCCESS, payload: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.GET_USER_SUBSCRIPTION_FAILURE, payload:error.message})
        }
    }
}

export const upgradeSubscription = ({planType}) => {
    return async (dispatch) => {
        dispatch({type: actionType.UPGRADE_SUBSCRIPTION_REQUEST})
        try {
            const response = await api.patch("/api/subscription/upgrade", null, {params: {planType: planType}})
            dispatch({type: actionType.UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.UPGRADE_SUBSCRIPTION_FAILURE, payload:error.message})
        }
    }
}
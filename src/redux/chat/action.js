import api from '../../config/api'
import * as actionType from './actionType'

export const sendMessage = (messageData) => {
    return async(dispatch) => {
        dispatch({type: actionType.SEND_MESSAGE_REQUEST})
        try {
            const response = await api.post("/api/messages/send",messageData)
            dispatch({type: actionType.SEND_MESSAGE_SUCCESS, message: response.data})
        } catch(error) {
            console.log(error)
            dispatch({type:actionType.SEND_MESSAGE_FAILURE, error: error.message})
        }
    }
}

export const fetchChatByProject = (projectId) => {
    return async(dispatch) => {
        dispatch({type: actionType.FETCH_CHAT_BY_PROJECT_REQUEST})
        try {
            const response = await api.get(`/api/project/${projectId}/chat`)
            console.log("Fetch chat: ", response.data)
            dispatch({type: actionType.FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data})
        } catch(error) {
            console.log(error)
            dispatch({type:actionType.FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message})
        }
    }
}

export const fetchChatMessages = (chatId) => {
    return async(dispatch) => {
        dispatch({type: actionType.FETCH_CHAT_MESSAGES_REQUEST})
        try {
            const response = await api.get(`/api/message/chat/${chatId}`)
            console.log("Fetch message: ", response.data)
            dispatch({type: actionType.FETCH_CHAT_MESSAGES_SUCCESS, message: response.data})
        } catch(error) {
            console.log(error)
            dispatch({type:actionType.FETCH_CHAT_MESSAGES_FAILURE, error: error.message})
        }
    }
}
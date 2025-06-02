import api from '../../config/api'
import * as actionType from './actionType'

export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: actionType.SEND_MESSAGE_REQUEST })
        try {
            const response = await api.post("/api/messages/send", messageData)
            dispatch({ type: actionType.SEND_MESSAGE_SUCCESS, message: response.data })
            console.log("message sent: ", response.data)
        } catch (error) {
            console.log(error)
            dispatch({ type: actionType.SEND_MESSAGE_FAILURE, error: error.message })
        }
    }
}

export const deleteMessage = (messageId) => {
    return async (dispatch) => {
        dispatch({ type: actionType.DELETE_MESSAGE_REQUEST });
        try {
            const response = await api.delete(`/api/messages/${messageId}`);
            dispatch({ type: actionType.DELETE_MESSAGE_SUCCESS, payload: messageId });
            console.log("Message deleted:", response.data);
        } catch (error) {
            console.error("Delete message failed:", error);
            dispatch({ type: actionType.DELETE_MESSAGE_FAILURE, error: error.message });
        }
    };
};

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: actionType.FETCH_CHAT_BY_PROJECT_REQUEST })
        try {
            const response = await api.get(`/api/project/${projectId}/chat`)
            console.log("Fetch chat: ", response.data)
            dispatch({ type: actionType.FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data })
        } catch (error) {
            console.log(error)
            dispatch({ type: actionType.FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message })
        }
    }
}

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        dispatch({ type: actionType.FETCH_CHAT_MESSAGES_REQUEST })
        try {
            const response = await api.get(`/api/messages/chat/${chatId}`)
            console.log("Fetch message: ", response.data)
            dispatch({ type: actionType.FETCH_CHAT_MESSAGES_SUCCESS, message: response.data })
        } catch (error) {
            console.log(error)
            dispatch({ type: actionType.FETCH_CHAT_MESSAGES_FAILURE, error: error.message })
        }
    }
}
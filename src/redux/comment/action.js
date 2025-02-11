import api from "../../config/api"
import * as actionType from "./actionType"

export const createComment = (commentData) => {
    return async (dispatch) => {
        dispatch({type: actionType.CREATE_COMMENT_REQUEST})
        try {
            const response = await api.post("/api/comments", commentData)
            console.log("Comment created: ", commentData)
            dispatch({type: actionType.CREATE_COMMENT_SUCCESS, comment: response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.CREATE_COMMENT_FAILURE, error: error.message})
        }
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        dispatch({type: actionType.DELETE_COMMENT_REQUEST})
        try {
            await api.delete(`/api/comments/${commentId}`, commentId)
            console.log("Comment delete: ", commentId)
            dispatch({type: actionType.DELETE_COMMENT_SUCCESS, commentId})
        } catch (error) {
            console.log(error)
            dispatch({type: actionType.DELETE_COMMENT_FAILURE, error: error.message})
        }
    }
}

export const fetchComments = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: actionType.FETCH_COMMENTS_REQUEST }); // Dispatch request action

        try {
            const response = await api.get(`/api/comments/${issueId}`); // Fetch comments for the specific issue
            console.log("Fetched comments: ", response.data);

            // Dispatch success action with the fetched comments
            dispatch({
                type: actionType.FETCH_COMMENTS_SUCCESS,
                payload: response.data, // Use `payload` instead of `comments` for consistency
            });
        } catch (error) {
            console.log(error);

            // Dispatch failure action with the error message
            dispatch({
                type: actionType.FETCH_COMMENTS_FAILURE,
                payload: error.message, // Use `payload` instead of `error` for consistency
            });
        }
    };
};